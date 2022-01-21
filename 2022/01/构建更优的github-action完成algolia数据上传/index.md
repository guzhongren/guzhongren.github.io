# 构建更优的GitHub Action完成Algolia数据上传


## 场景

程序员喜欢写博客，大都喜欢自己 Host 一个自己的 Blog, 通常 Blog 会有一个全局的搜索功能，开源博客一般都会选择 [lunrjs](https://lunrjs.com/) 或者 [algolia](https://www.algolia.com/) 等。我的 Blog 是基于 [Hugo](https://gohugo.io/) 构建的，使用的主题是 [LoveIt](https://hugoloveit.com/), 集成的是 algolia 的搜索方式。

对于存储在 algolia 上的数据，我是通过 GitHub Action：[Algolia Docsearch Indexer](https://github.com/marketplace/actions/algolia-docsearch-indexer) 来上传的, 之前使用是没有问题的。


## 问题

突然有一天我要使用搜索功能，但是怎么也搜索不到我想搜索的内容，看了 GitHub 项目的构建状态，一切正常，然后登陆到 algolia 后台一看， 最后一次的数据更新是在 21 年 8 月； 然后打开最近的博客构建记录，看了执行如下 GitHub workflow 的 yaml 日志，大吃一惊：程序执行错误，但还是在最后给我们送了一个🚀，同样是写代码，你能忍？

```yaml
    - uses: darrenjennings/algolia-docsearch-action@master
      with:
        algolia_application_id: ${{secrets.ALGOLIA_APPLICATION_ID}}
        algolia_api_key: ${{secrets.ALGOLIA_API_KEY}}
        file: './public/index.json'
```

运行日志

```log
Run darrenjennings/algolia-docsearch-action@master
/usr/bin/docker run --name a682564a13d76444749d3b720346ba2365371_9474ad --label 6a6825 --workdir /github/workspace --rm -e INPUT_ALGOLIA_APPLICATION_ID -e INPUT_ALGOLIA_API_KEY -e INPUT_FILE -e HOME -e GITHUB_JOB -e GITHUB_REF -e GITHUB_SHA -e GITHUB_REPOSITORY -e GITHUB_REPOSITORY_OWNER -e GITHUB_RUN_ID -e GITHUB_RUN_NUMBER -e GITHUB_RETENTION_DAYS -e GITHUB_RUN_ATTEMPT -e GITHUB_ACTOR -e GITHUB_WORKFLOW -e GITHUB_HEAD_REF -e GITHUB_BASE_REF -e GITHUB_EVENT_NAME -e GITHUB_SERVER_URL -e GITHUB_API_URL -e GITHUB_GRAPHQL_URL -e GITHUB_REF_NAME -e GITHUB_REF_PROTECTED -e GITHUB_REF_TYPE -e GITHUB_WORKSPACE -e GITHUB_ACTION -e GITHUB_EVENT_PATH -e GITHUB_ACTION_REPOSITORY -e GITHUB_ACTION_REF -e GITHUB_PATH -e GITHUB_ENV -e RUNNER_OS -e RUNNER_ARCH -e RUNNER_NAME -e RUNNER_TOOL_CACHE -e RUNNER_TEMP -e RUNNER_WORKSPACE -e ACTIONS_RUNTIME_URL -e ACTIONS_RUNTIME_TOKEN -e ACTIONS_CACHE_URL -e GITHUB_ACTIONS=true -e CI=true -v "/var/run/docker.sock":"/var/run/docker.sock" -v "/home/runner/work/_temp/_github_home":"/github/home" -v "/home/runner/work/_temp/_github_workflow":"/github/workflow" -v "/home/runner/work/_temp/_runner_file_commands":"/github/file_commands" -v "/home/runner/work/blog/blog":"/github/workspace" 6a6825:64a13d76444749d3b720346ba2365371  "***" "***" "./public/index.json"
Cloning into 'docsearch-scraper'...
Collecting pipenv
  Downloading pipenv-2021.11.23-py2.py3-none-any.whl (3.6 MB)
Collecting virtualenv
  Downloading virtualenv-20.10.0-py2.py3-none-any.whl (5.6 MB)
Requirement already satisfied: pip>=18.0 in /usr/local/lib/python3.6/site-packages (from pipenv) (21.2.4)
Requirement already satisfied: setuptools>=36.2.1 in /usr/local/lib/python3.6/site-packages (from pipenv) (57.5.0)
Collecting virtualenv-clone>=0.2.5
  Downloading virtualenv_clone-0.5.7-py3-none-any.whl (6.6 kB)
Collecting certifi
  Downloading certifi-2021.10.8-py2.py3-none-any.whl (149 kB)
Collecting importlib-resources>=1.0
  Downloading importlib_resources-5.4.0-py3-none-any.whl (28 kB)
Collecting backports.entry-points-selectable>=1.0.4
  Downloading backports.entry_points_selectable-1.1.1-py2.py3-none-any.whl (6.2 kB)
Collecting six<2,>=1.9.0
  Downloading six-1.16.0-py2.py3-none-any.whl (11 kB)
Collecting importlib-metadata>=0.12
  Downloading importlib_metadata-4.8.3-py3-none-any.whl (17 kB)
Collecting filelock<4,>=3.2
  Downloading filelock-3.4.1-py3-none-any.whl (9.9 kB)
Collecting distlib<1,>=0.3.1
  Downloading distlib-0.3.4-py2.py3-none-any.whl (461 kB)
Collecting platformdirs<3,>=2
  Downloading platformdirs-2.4.0-py3-none-any.whl (14 kB)
Collecting zipp>=0.5
  Downloading zipp-3.6.0-py3-none-any.whl (5.3 kB)
Collecting typing-extensions>=3.6.4
  Downloading typing_extensions-4.0.1-py3-none-any.whl (22 kB)
Installing collected packages: zipp, typing-extensions, importlib-metadata, six, platformdirs, importlib-resources, filelock, distlib, backports.entry-points-selectable, virtualenv-clone, virtualenv, certifi, pipenv
WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv
Successfully installed backports.entry-points-selectable-1.1.1 certifi-2021.10.8 distlib-0.3.4 filelock-3.4.1 importlib-metadata-4.8.3 importlib-resources-5.4.0 pipenv-2021.11.23 platformdirs-2.4.0 six-1.16.0 typing-extensions-4.0.1 virtualenv-20.10.0 virtualenv-clone-0.5.7 zipp-3.6.0
WARNING: You are using pip version 21.2.4; however, version 21.3.1 is available.
You should consider upgrading via the '/usr/local/bin/python -m pip install --upgrade pip' command.
Installing dependencies from Pipfile.lock (aabb41)...
Traceback (most recent call last):
  File "docsearch", line 5, in <module>
    run()
  File "/github/workspace/docsearch-scraper/cli/src/index.py", line 161, in run
    exit(command.run(sys.argv[2:]))
  File "/github/workspace/docsearch-scraper/cli/src/commands/run_config.py", line 21, in run
    return run_config(args[0])
  File "/github/workspace/docsearch-scraper/cli/../scraper/src/index.py", line 33, in run_config
    config = ConfigLoader(config)
  File "/github/workspace/docsearch-scraper/cli/../scraper/src/config/config_loader.py", line 72, in __init__
    for key, value in list(data.items()):
AttributeError: 'list' object has no attribute 'items'
🚀 Successfully indexed and uploaded the results to Algolia

```

面对一个磨洋工的工具，作为程序员的我们肯定不能忍。
打开 GitHub 上这个 Action 的[源码](https://github.com/darrenjennings/algolia-docsearch-action), 根据对 Action 构建的了解和现有代码，作者使用的是 Python 和 algolia 自己在 GitHub 上开源的[工具](https://github.com/algolia/docsearch-scraper.git), 然后执行一个  Python 脚本上传文件到 algolia 的；根据以往经验，由 Python 构建的项目镜像一般都比较大，在本地测试了一下，果不其然的大。

### 面临的问题

- 工具损坏
- 镜像体积大

## 方案Spike

|Item|Option1 使用algolia 自己的 Restful 接口|Option 2 algolia SDK|
|--|--|--|
|描述|使用 algolia自己的Restful 接口实现上传|使用其官方提供的SDK 编写代码来集成|
|是否推荐|No|Yes|
|实现难度|Middle|Low|
|优点|流程可控|简单直接，无需担心错误情况的处理|
|缺点|需要写更多的代码来控制整个流程|整个上传过程不可控|
|安全问题|No|No|
|相对难度|Middle|Low|
|相对成本|Middle|Low|


综上分析，使用 Option2 SDK 的方案更佳。

## 执行方案

新建 GitHub Action 项目，我们使用 Dockerfile 的方式构建上传索引的方案；
*  新建 entrypoint.sh 并写入如下代码, 脚本执行需要传入如下几个变量：

|Name|Description|Required|
|--|--|--|
|FILE_PATH|要上传的文件路径|Yes|
|ALGOLIA_APPLICATION_ID|Algolia 平台的应用Id|Yes|
|ADMIN_API_KEY|Algolia 上传所用的API Key|Yes|
|INDEX_NAME|在 Algolia 上你所创建的索引名|Yes|

  ```shell
  #!/bin/sh
  set -eu
  
  npm install -g @algolia/cli
  
  algolia import -s $FILE_PATH -a $APPLICATION_ID -k $ADMIN_API_KEY -n $INDEX_NAME 
  
  if [ "$?" != "0" ] ; then
    echo "😢 Failed to upload your data to Algolia, PLZ report an issue, thx!"
    exit 1
  fi
  
  echo "🚀 Successfully uploaded!"
  ```

* 新建 Dockerfile 并写入如下代码，在此我们使用最小化的 Node 镜像 `node:lts-alpine`

```dcokerfile
FROM node:lts-alpine
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
```

* 更新README, 完善使用文档。

详细代码请参考 [algolia-docsearch-upload-action](https://github.com/guzhongren/algolia-docsearch-upload-action/blob/main/Dockerfile)。

## 验证结果

在完成 Action 并将其集成到 Pipeline 上之后，成功运行，数据可成功上传到 Algolia 平台上，并且博客的右上角的搜索功能可以成功搜索到最新的文章，说明我们的 Action 是可以完成我们的需求的。 

### 运行效率比较

没有对比就没有伤害。下面对我自己写的 Action 和之前集成过的 Action 在`镜像大小`和`执行效率`方面进行对比。

{{< echarts >}}
{
  "title": {
    "text": "运行效率比较",
    "top": "2%",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis"
  },
  "legend": {
    "data": ["algolia-docsearch-upload-action", "algolia-docsearch-action"],
    "top": "10%"
  },
  "toolbox": {
    "feature": {
      "saveAsImage": {
        "title": "Save as Image"
      }
    }
  },
  "xAxis": {
    "type": "category",
    "data": ["algolia-docsearch-upload-action", "algolia-docsearch-action"] 
  },
  "yAxis": {
    "name": "耗时(s)",
    "type": "value"
  },
  "series": [
    {
      "type": "bar",
      "data": [
        {
          "value": 22,
          "itemStyle": {
            "color": "#f2ce2b"
          }
        },
        {
          "value": 34,
          "itemStyle": {
            "color": "#2c9678"
          }
        }
      ]
    }
  ]
}
{{< /echarts >}}

### 镜像大小比较

{{< echarts >}}
{
  "title": {
    "text": "镜像大小比较",
    "top": "2%",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis"
  },
  "legend": {
    "data": ["algolia-docsearch-upload-action", "algolia-docsearch-action"],
    "top": "10%"
  },
  "toolbox": {
    "feature": {
      "saveAsImage": {
        "title": "Save as Image"
      }
    }
  },
  "xAxis": {
    "type": "category",
    "data": ["algolia-docsearch-upload-action", "algolia-docsearch-action"] 
  },
  "yAxis": {
    "name": "镜像大小(M)",
    "type": "value"
  },
  "series": [
    {
      "type": "bar",
      "data": [
        {
          "value": 109,
          "itemStyle": {
            "color": "#f2ce2b"
          }
        },
        {
          "value": 902,
          "itemStyle": {
            "color": "#2c9678"
          }
        }
      ]
    }
  ]
}
{{< /echarts >}}
## Refs

* [博客: https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Algolia Docsearch Indexer: https://github.com/marketplace/actions/algolia-docsearch-indexer](https://github.com/marketplace/actions/algolia-docsearch-indexer)
* [GitHub Action: https://docs.github.com/en/actions](https://docs.github.com/en/actions)

## Statement（特此申明）

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/扫码_搜索联合传播样式-白色版.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

