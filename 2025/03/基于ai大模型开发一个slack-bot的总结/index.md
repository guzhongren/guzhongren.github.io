# 基于AI大模型开发一个Slack Bot的总结


## 起因

最近一个半月都在Beach，虽然离开了项目，但每天的生活比项目期间还要忙碌，同时也学到了很多新知识。

---

在Beach期间，我参与了两个与AI相关的项目。虽然AI功能的开发占比不大，但通过代码学习了AI开发的相关模式，例如Google Cloud Platform、Terraform、Vertex AI、CrewAI以及Agent的编排。Agent编排在正式项目中尤为重要，因为AI无法一次性理解并完成复杂任务，需要将任务（Work）拆分为多个子任务（Task），通过编排的Agent组合完成。这种编排的控制逻辑和编码逻辑基本一致，主要包括顺序、循环和组合等基本形式。

---

第一个项目是关于遗留系统维护质量评估的，涉及了许多新技术，例如 CrewAI、Vertex AI、Streamlit、Hugging Face 和 Agent 编排。在这个项目中，我首次使用 Python Flask 独立构建了一个后端服务，并结合 Streamlit 开发了服务端渲染的前端，为用户提供了优秀的交互体验。简单来说，这个功能类似于一个聊天记录的展示。

---

第二个项目与SRE相关，目标是将可观测链路上的 Alert 转换为 Incident，并通过`ChatOps`形式处理这些 Incident。为此，我们需要一个集成AI功能的 Bot 来提升 Incident 处理效率。例如，当一个 Manager 加入 Incident Channel 时，需要一个简要的总结（当前 Incident 的情况总结）。这也是本文的来源。

## 需求

在`ChatOps`中，当 Manager 加入 Incident 处理的聊天组时，需要及时获取当前 Incident 的处理情况，包括实时状态、关键行为以及可能的建议。

## 基本流程

基于上述需求，我们需要为 Chat 设计一个 Bot。这个 Bot 在接收到简单指令后，可以生成当前 Incident 的关键数据报告，类似于 PIR（Post-Incident Report），但不需要那么详细。

{{< mermaid >}}
sequenceDiagram
  participant User as 用户
  participant Slack as Slack
  participant ServerLessFunction as 无服务器函数
  participant AI as AI模型
  User->>Slack: 输入`/Summary`命令
  Slack->>ServerLessFunction: 请求摘要/报告
  ServerLessFunction->>AI: 请求摘要/报告
  AI-->>ServerLessFunction: 返回响应
  ServerLessFunction-->>Slack: 返回摘要/报告
  Slack-->>User: 返回摘要/报告
{{< /mermaid >}}

## 开发流程

在开发过程中，我们需要完成以下任务：

1. 在 Slack 上创建一个 Bot，作为用户与 Slack 之间的沟通桥梁。
2. 使用无服务器函数处理 Bot 发送的请求，获取 AI 所需数据，并将其传递给 AI 模型，最终将AI返回的内容发送回 Slack。

### 创建Slack Bot

在[Slack官网](https://api.slack.com/apps)上创建 Bot 有两种方式： 1, Manifest， 2，Scratch 方式

{{< mermaid >}}
graph LR;
    A{Slack App开发} --> B[Manifest方式]
    A --> C[Scratch方式]
{{< /mermaid >}}

{{< admonition type=warning title="提示" open=true >}}
  创建Slack Bot需要Slack Workspace的管理员权限。
{{< /admonition >}}

#### Manifest方式

这种方式相对简单，支持 JSON 和 YAML 格式，所有配置都集中在 Manifest文件中。以下是一个 YAML 格式的示例：

```yaml
display_information:
  name: XBot
features:
  bot_user:
    display_name: XBot
    always_online: false
  slash_commands:
    - command: /summary
      url: <ServerLess HTTPS URL>
      description: summary
      usage_hint: it
      should_escape: false
oauth_config:
  scopes:
    bot:
      - app_mentions:read
      - channels:history
      - channels:join
      - channels:read
      - chat:write
      - chat:write.public
      - commands
      - incoming-webhook
      - groups:history
      - im:history
      - mpim:history
      - users:read
settings:
  event_subscriptions:
    request_url: <ServerLess HTTPS URL>
    bot_events:
      - app_mention
  interactivity:
    is_enabled: true
    request_url: <ServerLess HTTPS URL>
  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```

{{< admonition type=tip title="示例" open=true >}}
  ServerLess HTTPS URL: https://serverless.functions.url/x-bot
{{< /admonition >}}

这种方式适合已经创建过一个 Bot，需要重新创建的情况，例如测试完成后需要创建正式的 Bot。

#### Scratch方式

按照提示逐步完成配置，涉及多个模块，例如`Basic Information`、`Socket Mode`、`Incoming Webhooks`、`Slash Command`、`OAuth & Permissions`和`Event Subscriptions`等。具体权限可参考 Manifest 的 YAML 配置。

通过上述两种方式之一创建Bot后，需要获取以下Token，这些Token将在无服务器函数中使用：

| 项目            | 位置                                      | 操作                                                              |
| :-------------- | :---------------------------------------- | :---------------------------------------------------------------- |
| SIGNING_SECRET  | `Basic Information` -> `Signing Secret`   | 复制                                                              |
| SLACK_APP_TOKEN | `Basic Information` -> `App-Level Tokens` | 点击`Generate Token and Scope`，命名并赋予`connections:write`权限 |
| SLACK_BOT_TOKEN | `OAuth & Permissions` -> `OAuth Tokens`   | 复制                                                              |

{{< admonition type=tip title="重要提示" open=true >}}
  * 在本地开发代码并与Slack测试时，启用`Socket Mode`可以避免每次都部署代码，从而节省时间和资源
  * 启用`Socket Mode`时，如果多人开发同一个Bot，可能会收到彼此的请求返回结果。建议每人创建一个独立的Workspace以避免冲突
  * 更改完配置之后，需要将 App 安装到你的 Workspace 中
{{< /admonition >}}

### 创建无服务器函数处理用户请求

这里选择使用 Python 来作为 Serferless 处理工具，并将其部署在云服务器上，比如 AWS Lambda, Azure Function， 或者 Google Cloud Platform 的 Cloud Run Functions中，这里不讲工程构建之类的，直接给出部分参考代码。

```python
...
from slack_bolt import App
from slack_bolt.adapter.flask imp
import vertexai
from vertexai.preview.generative_models import GenerativeModel, GenerationConfig
...
app = App(
    token=getenv("SLACK_BOT_TOKEN"),
    signing_secret=getenv("SIGNING_SECRET"),
    raise_error_for_unhandled_request=True,
)
...
@app.command("/summary")
def handle_summary_command(ack, body, say):
    ack("Thinking...")
    channel_id = body["channel_id"]
    check_channel_membership(app, channel_id, say)

    slack_channel_histories = get_chat_history(app, channel_id)

    input = format_events(incident_id, slack_channel_histories)

    # Use AI to summarize

    system_prompt = '''\
    You are an operations analysis expert. You .....
    ......
    Output format:
    ......
    '''

    vertexai.init(
        project=os.getenv("GCP_PROJECT"),
        location="us-central1",
    )
    model = GenerativeModel(
        model_name="gemini-2.0-flash",
        system_instruction=[system_prompt],
    )
    gen_config = GenerationConfig(temperature=0)
    response = model.generate_content([prompt], generation_config=gen_config)
    return response.text
    say(
        blocks=[
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Here is the summary of the incident:",
                },
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": summary,
                },
            },
        ]
    )

handler = SlackRequestHandler(app)


# Main
def slack_bot(request):
    return handler.handle(request)

```

比如使用如下命令将这个程序部署在 GCP 中：
```sh
gcloud functions deploy x-bot \
    --runtime python310 \
    --trigger-http \
    --allow-unauthenticated \
    --entry-point slack_bot \
    --timeout=120s \
    --set-env-vars GCP_PROJECT='' \
    --set-env-vars SLACK_BOT_TOKEN='' \
    --set-env-vars SIGNING_SECRET=''
```

## 注意事项

部署好 Serverless Function 之后，需要将Serverless Function 的访问的 URL 添加到 Slack App 的配置中；

* 将 `Socket Mode` 关闭
* 将 URL 填到 `Event Subscriptions`, 需要通过其校验
* 将 URL 填到 `Slash Commands` 添加的那个Command（`/summary`） 中

## 总结

Slack bot 的开发相对简单，大部分内容是简单的配置；重要的是将获取到的数据以某种特定的 Prompt ，并将其传递给 AI model 获取到准确的结果。

## 引用

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Slack 官网:https://api.slack.com/apps](https://api.slack.com/apps)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

