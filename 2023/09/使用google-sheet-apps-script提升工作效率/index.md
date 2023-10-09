# 使用Google Sheet Apps Script提升工作效率


一切总是在往熵增大的方向发展。

## 遇到的问题

团队周内每天需要都有个Code Diff 的会议来进行代码review, 但是不是每个人都有代码要被Review, 如果有个工具每天在Code Diff 前进行统计，大家有需要代码Review 的就在消息下面标记一下，或者回复一哈；如果大家有标记，那么再进行代码Review，是不是就可以省下一部分时间了？

团队内每周站会的主持人要轮流，要是大家轮流记，估计很快就乱了，如果有个工具，每周一早上在群里自动更新一哈是不是就更好了？对于Oncall 等活动也是一样，是不是就完美了？


这么多问题怎么解决呢？

肯定就是各种机器人啦。我们团队用的都是Google 的那套办公软件，而Google Sheet 是我们经常用来流程化记录内容的工具；同时Google Chat 是我们团队的沟通协作工具。

而Google 全家桶的好处就是其各个应用之间调用协作非常方便。那么我们就用Google Sheet 和Google Chat 来实现一个简单的机器人应用来干上面各种麻烦的事吧。

## Google Chat Webhooks

Google Chat 的Webhooks 允许其他应用程序调用，并可以对消息进行`创建`、`读取` 、`更新` 和`删除`。如同对数据库的增删改差一般。

![Google Chat Webhooks](https://developers.google.com/static/chat/images/arch-pat-notifier.svg)

关于如何创建Google Chat webhooks 可以参考[这里](https://ploi.io/documentation/notifications/how-do-i-create-a-google-chat-webhook); 如果不想看这个链接，可以往下，在实践部分会有操作。


## Google Sheet Apps Script

Google Sheet 之于 Google Suite,就像 Excel 之于 Miscrosoft Office。Google Sheet 最强大的地方在于他支持自定义脚本，虽然其名为`Apps Script`, 文件格式为`.gs`， 但是其就是一些简单的`JavaScript` API, 其请求也是同步的API, 而且没有跨域问题，这就让其作为一个机器人有了初步条件。

当然 Google Sheet Apps Script 最基本的对 Sheet 的读写删都是非常容易的，但在这里需要明白其 API 结构。

![Google Sheet API Structure](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Tools/GoogleSheet/AppsScript.7401tjjcz9g0.webp)

从上图中可以看到
|序号|说明|Note|
|:--|:--|:--|
|1|SpreadsheetApp||
|2|ActiveSheet||
|3|DataRange||
|4|Value||

## 实践

如下，我们实现一个每周一提醒团队谁是本周的站会主持人的机器人。

### 创建Google Chat Webhooks

![Google chat webhooks](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Tools/GoogleSheet/chat-webhooks.1mqmo1im34g0.webp)

点击创建好的Webhooks, 拷贝URL即可。

### 创建Google Sheet 轮转数据

新建Google Sheet，直接写入如下数据

```
xiaoming1
xiaoming2
xiaoming3
xiaoming4
xiaoming5
xiaoming6	current
xiaoming7
xiaoming8
xiaoming9
xiaoming10
```

### 创建Google Sheet 处理脚本

接下来在Google Sheet 中创建Apps Script; 位置：Menu->Extention-> Apps Script;

在编辑器里可以编写处理Google Sheet 的代码，比如有个sheet.gs 里面处理Sheet 相关的操作，如下
```js
const CURRENT = 'current'

function getTheNextStandupPerson() {
  const activeSheet = SpreadsheetApp.getActiveSheet();
  const dataRange = activeSheet.getDataRange()
  const standupList = dataRange.getValues()

  const currentStandupPersonIndex = standupList.findIndex(person => person[1].toUpperCase() === CURRENT.toUpperCase())

  const tempStandupPersonIndex = currentStandupPersonIndex + 1
  const nextStandupPersonIndex =  tempStandupPersonIndex >= standupList.length ? 0: tempStandupPersonIndex
  const nextStandupPerson = standupList.find((_, index) => index === nextStandupPersonIndex )

  return {
    currentStandupPersonIndex,
    nextStandupPersonIndex,
    nextStandupPerson,
  }
}


function updateRecord(currentStandupPersonIndex, nextStandupPersonIndex, nextperson ) {
  Logger.log(`Start to update the latest standup person to ${nextperson}`)
  let currentRow = currentStandupPersonIndex +1
  let nextRow = nextStandupPersonIndex + 1

  const activeSheet = SpreadsheetApp.getActiveSheet()

  activeSheet.getRange(currentRow, 2).setValue('')
  activeSheet.getRange(nextRow, 2).setValue(CURRENT)

   Logger.log(`Successfully update the latest standup person to ${nextperson}`)
}
```

main.gs 处理整个流程，并且在里面发送消息到刚才的Space中，

```js
const WEBHOOK_URL = "https://chat.googleapis.com/v1/spaces/AAAAPhOvPUg/messages?key=AIzaSxxxxxxxxxxxxxxxxxxxxxxxx";

// main function
function sendMessageToChat() {
  if (!isMonday()) return;

  const {currentStandupPersonIndex,
    nextStandupPersonIndex,
    nextStandupPerson } = getTheNextStandupPerson()

  updateRecord(currentStandupPersonIndex, nextStandupPersonIndex, nextStandupPerson)

  const options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json; charset=UTF-8"
    },
    "payload": JSON.stringify({
      "text": `Hey <users/all>,This week's standup host is ${nextStandupPerson} ${'\n'.repeat(3)} The sheet: https://docs.google.com/spreadsheets/d/123434234343/edit#gid=0`
    })
  };
  const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
  Logger.log(response);
}

function isMonday() {
  const date = new Date();
  const day = date.getDay();
  return ![0,2,3,4,5,6].includes(day)
}

```

### 定时执行脚本处理

有多种执行方式；
1. 直接在代码编辑器顶部运行main.gs 里的sendMessageToChat 方法即可。
2. 定时运行,如下图, 以此，我们可以在特定的实践让其自动执行，实现自动化。

![Trigger of Apps Script](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Tools/GoogleSheet/trigger-of-apps-script.5u953kav5cg0.webp)


### 效果
可以看到，之前的主持人是xiaoming6, 现在已经是xiaoming7了。
![Chatbot message result](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Tools/GoogleSheet/chatbot-message.4w4b6vs80rk0.webp)

## 总结

Google Sheet 毕竟是Google 出品，不管是UI 还是API 都很简洁，更是和其自家产品集成的非常紧密；我们在这里实现了Google Sheet 调用Google Chat 来定时给Google Chat 发送消息的功能。当然Google Sheet 还有很多非常优秀的功能，期待你的挖掘。

## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Google Chat Message Format: https://developers.google.com/chat/api/guides/message-formats/text](https://developers.google.com/chat/api/guides/message-formats/text)
* [Google Chat Webhooks: https://developers.google.com/chat/how-tos/webhooks](https://developers.google.com/chat/how-tos/webhooks)
## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

