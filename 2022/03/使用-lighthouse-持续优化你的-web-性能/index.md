# 使用 Lighthouse 持续优化你的 Web 性能

> 性能是留住用户的关键，
> 性能直接影响公司的命运。
-- [Pinterest](https://www.youtube.com/watch?v=Xryhxi45Q5M&feature=youtu.be&t=1366)

## 介绍

互联网发展至今，网页性能始终是一个重要的问题, 各大互联网公司都在不遗余力的优化自己的 Web 页面，为的就是更快的让用户更快的看到用户想看到的内容。

互联网在近几十年的发展过程中，度量 Web 性能各个指标、术语已经稳定了，各个产品的度量方式都趋于一致。

BBC 发现其网站的加载时间每增加 1 秒，便会多失去 10% 的用户。
DoubleClick by Google 发现，如果页面加载时间超过 3 秒，53% 的移动网站访问活动将遭到抛弃。
DoubleClick by Google 研究表明，与加载时间约为四倍（19 秒）的网站相比，加载时间在 5 秒以内的网站会话加长 70%、跳出率下降 35%、广告可见率上升 25%。
Mobify 的首页加载时间每减少 100 毫秒，基于会话的转化率增加 1.11%，年均收入增长近 380,000 美元。
AutoAnything 的页面加载时间减少一半后，其销售额提升 12-13%。
可见，Web 页面的性能在现今万物互联的时代有多重要。

## Web 性能在度量方面存在的问题

### 不可本地运行，以尽可能早地发现性能问题

很多工具都不可以在本地运行； 如果 Web 性能测试工具可以在本地运行，开发人员可以更早地发现问题，并尽可能早的在本地解决，避免了在 CI 上跑了一会了才发现问题，在`CI/CD` 的敏捷开发过程中这样可以节省很多时间，提高生产效率。`Web 性能测试左移` 必定为 Web 产品性能带来更多好处，甚至为公司带来更多盈利。
 
### 不能持续度量性能指标

目前市场上 Web 性能度量的产品大多都是 `Sass` 产品，使用其产品我们只能得到一个运行完性能测试的可视化结果页面，但是不能持续的记录 Web 网页性能的改进记录，不能很好的量化一个 Web 产品性能的生命周期。当然也有实现历史记录的 Web 性能测试工具，例如 [treo](https://treo.sh/)
### 费用

开源免费的 Web 性能测试工具有不少，但是用起来可能没有那么爽；如果需要更多的特性，如持续记录 Web 网页性能，一般只有商业产品会支持，而且收费还不低。
### CI 集成困难

如前面所说，很多工具要么是本地不能运行，要么就是 Sass 产品，不能很好的与 Pipeline 集成， 导致 Web 性能结果反馈周期长、工程效率低等问题。
## Lighthouse

 > Lighthouse 是一个开源的、自动化的工具，用以提高网页质量。你可以在任何网页上运行它，公开的或需要认证的。它对性能、可访问性、渐进式web应用程序、SEO 等进行审计。

 你可以在 `Chrome DevTools`、 命令行甚至是 `Node` 模块中运行 `Lighthouse`.
 向 Lighthouse 提供一个要审计的 URL，它会对页面运行一系列审计，随即会生成一个关于页面运行情况的报告。对于失败的审计项，可以使用对应项的改进方案。每个审计项都有一个参考文档，解释为什么审核很重要，以及如何修复它。

 使用方法非常简单，可以看一下我对我的开源项目 `Powerboard` 审计的结果。
 ![Lighthouse-Chrome-DevTools](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Tools/Lighthouse/Lighthouse-Chrome-DevTools.47rhl099s9c0.webp)

## Lighthouse CI 及 Lighthouse Server 的使用

 ### Lighthouse CI （LHCI）

> Automate running Lighthouse for every commit, viewing the changes, and preventing regressions
> 为每个提交自动化运行Lighthouse，查看更改，并防止回归
> -- [GoogleChrome/lighthouse-ci](https://github.com/GoogleChrome/lighthouse-ci)

`Lighthouse CI` 是 `Google Chrome` 团队开发的一套可以让持续运行、保存、检索和对Lighthouse结果进行`断言`变得尽可能简单的工具。可以很方便的集成在 CI 上。

#### 使用
`LHCI` 提供 `npm` 安装包，可以很好的在 Pipeline 上集成，只需要在对应目录下运行 `autorun` 命令即可，命令如下

```shell
npm install -g @lhci/cli
lhci autorun
```

运行完成后，LHCI 会将结果存放在 `.lighthouseci` 目录下，用浏览器打开对应的报告即可。

### Lighthouse Server

  > The LHCI server saves historical Lighthouse data, displays trends in a dashboard, and offers an in-depth build comparison UI to uncover differences between builds.
  > LHCI Server 保存 Lighthouse 历史数据，并可在仪表板中显示趋势，并提供深入的构建比较 UI，以揭示构建之间的差异。
  
  | ![lhci-server](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Tools/Lighthouse/lhci-server.5x95meg6f4w0.webp) | ![lhci-server-compare](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Tools/Lighthouse/lhci-server-compare.64ass32uxhg0.webp) |
  |---|---|
  
#### LHCI Server 的安装和使用

LHCI Server 的安装有多种方式，具体可参考![这里](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Tools/Lighthouse/lhci-server.5x95meg6f4w0.webp)，推荐使用 Docker 的方式运行。需要注意的是，第一次运行需要创建 Lighthouse App, 需要在 Docker 中运行 `lhci wizard` 并填入相应的信息，**最后记录下生成的 `Build token` 和 `Admin token`**。

### Lighthouse CI 和 Lighthouse Server 集成

![Lighthouse CI Recommended Setup Progression](https://user-images.githubusercontent.com/2301202/81843922-f2e17300-9513-11ea-85f9-d3d8a0b52633.png)

- 前面已经讲了 `lhci` 和 `lhci server` 如何安装了，接下来就是需要将两者结合起来一起使用了。这里我们以 `GitHub Actions` 为例来搞一个 Demo。
- 构建 `GitHub workflow`， 具体实践可参考 [Powerboard](https://github.com/guzhongren/Powerboard) 的实现细节
- .github/workflows/Lighthouse.yml
```yml
name: Lighthouse CI
on:
  push:
    branches:
      - main
jobs:
  lhci:
    name: Lighthouse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.event.pull_request.head.sha }}
      - name: Use Node.js 10.x
        uses: actions/setup-node@v1
        with:
          node-version: 16.14.2
      - name: npm install, build
        run: |
          npm install
          npm run build
      - name: Upload Lighthouse Report
        run: |
          npm install -g @lhci/cli
          lhci autorun --config=.github/config/lighthouserc-no-condition.json
          lhci upload --serverBaseUrl=${{ secrets.LHCI_SERVER_URL }} --token=${{ secrets.LHCI_BUILD_TOKEN }}
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
      - name: Check Lighthouse Report
        run: |
          lhci autorun --config=.github/config/lighthouserc.json
          lhci upload --serverBaseUrl=${{ secrets.LHCI_SERVER_URL }} --token=${{ secrets.LHCI_BUILD_TOKEN }}

```
- .github/config/lighthouserc-no-condition.json
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "settings": {
        "formFactor": "desktop",
        "screenEmulation": {
          "mobile": false,
          "width": 1920,
          "height": 1080,
          "deviceScaleFactor": 1,
          "disabled": false
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": "off",
        "categories:accessibility": "off",
        "categories:best-practices": "off",
        "categories:seo": "off",
        "categories:pwa": "off"
      }
    }
  }
}

```
- .github/config/lighthouserc.json
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "settings": {
        "formFactor": "desktop",
        "screenEmulation": {
          "mobile": false,
          "width": 1920,
          "height": 1080,
          "deviceScaleFactor": 1,
          "disabled": false
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.8 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 1 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "categories:pwa": ["warn", { "minScore": 0.99 }]
      }
    }
  }
}
```
- 需要将 `lhci Server` 生成的 `Build token` 和 `lhci Server` 的地址存放在 GitHub 项目的 Secrets 中
- 这里执行了两次 `lhci` 命令。因为 `lhci autorun` 运行完成后会运行默认的断言(`Assertion`), 第一次用没有断言的命令，目的是将当前的网页性能可以上到 Server 端; 第二次配置了各项指标的阈值，如果不满足要求，Pipeline 将会阻断，实现 `Web 性能测试左移`。
- ![Powerboard Lighthouse Actions](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/Tools/Lighthouse/powerboard-lighthouse-actions.40eis8x91cu0.webp)

## 总结

 - 对于：开发人员、技术领导或者市场营销人员
 - 他们想：`持续量化`并展示 Web 页面的`性能`
 - 这个：Lighthouse CI
 - 是一个：由 `Google` 编写的一套工具，可以持续运行、保存、检索并对 `Lighthouse` 结果进行断言变得尽可能简单。它可以评估 Web 应用和页面，以及从开发的最佳实践中收集性能指标和洞见等信息
 - 它可以：测试你的 Web 页面，得到 Web 页面的 `Performance` 、 `Accessibility` 、 `Best-Practices` 、 `SEO` 和 `PWA` 在不同`设备`上的分数, 这些分数可以用于分析产品性能，帮助提升用户转化率等
 - 不同于：[treo](https://treo.sh/) 和其他一些性能测试工具
 - 它的优势是: `Open-Source`, `Free`, `Self-hosted` data and Server, `Easy to integrate`。
## Refs

* [Get Down to Business: Why the Web Matters (Chrome Dev Summit 2018): https://web.dev/i18n/zh/why-speed-matters/](https://web.dev/i18n/zh/why-speed-matters/)
* [为什么速度很重要？: https://web.dev/i18n/zh/why-speed-matters](https://web.dev/i18n/zh/why-speed-matters)
* [Lighthouse: https://developers.google.cn/web/tools/lighthouse](https://developers.google.cn/web/tools/lighthouse)
* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)

## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

