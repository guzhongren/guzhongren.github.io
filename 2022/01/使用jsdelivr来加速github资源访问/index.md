# 使用 jsdelivr 来加速 Github 资源访问


## 遇到的问题

22 年又开始了，西安 ZF 的防疫政策真的是在全国人民面前一遍又一遍的刷出了新的高度，过了魔幻的 2020，又过了艰难的 2021，2022，感觉你都找不到个合适的词来形容了。

最近西安大数据局搞得二维码已经连续崩溃两次了，更可笑的是自吹自擂的说把 1M 的图片优化到 500kB, 又艰难的优化到 100KB, 真的是艰难的不行，难道用 base64 算法搞成字符串会超过 10kB 么？还有把对外的图片放在了自己的服务器上，没有用到 CDN, 简直了，更何况是自己 host 的图片。一个字：简直了。

最近在优化我们组自己构建的开源项目 [Powerboard](https://github.com/Apollo-for-fun/Powerboard) 的使用体验。经过一遍遍的优化，我们现在的策略是将 token 和 config 放在 URL 中，config 是存储配置的 URL。目前，我们将 config 存放在 GitHub 的 [Gist](https://gist.github.com/) 上。

但是这有个问题，就是 Gist 的访问在国内被墙了，被🧱了，被🧱了；而且 GitHub 的资源访问也比较慢。

## 前置知识

> 内容分发网络（英语：Content Delivery Network 或 Content Distribution Network，缩写：CDN）是指一种透过互联网互相连接的电脑网络系统，利用最靠近每位用户的服务器，更快、更可靠地将音乐、图片、视频、应用程序及其他文件发送给用户，来提供高性能、可扩展性及低成本的网络内容传递给用户。 ---- wikipedia

## 解决方案

之前想过提高 GitHub 资源的下载速度，了解过各种 GitHub 资源的 Proxy。比如
- `https://hub.fastgit.org`
- `https://github.com.cnpmjs.org`
- 本地配置代理等

对于`hub.fastgit.org`, 在将 raw 资源地址配置到 URL 中后并不能直接获取到配置信息，存在跨域的问题。对此还有一个开源的代理方案，那就是`jsdelivr`。

### jsdelivr

[jsdelivr](https://github.com/jsdelivr/jsdelivr) 是为 npm, GitHub, JavaScript 和 ESM 加速构建的免费，快速，可靠的开源 CDN。此开源项目是 [prospectone](https://prospectone.io/) 公司开源的一个项目，而 prospectone 是在 CDN 方面也是很有经验的技术公司。

从其官网可以看到，jsdelivr CDN 遍布世界，在中国也有很多，更友好的是，在西安也有一个。

![cdn-around-the-world](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/cdn/cdn-around-the-world.12nesnyias8w.webp)

#### 模式

```
https://cdn.jsdelivr.net/gh/{usernameOrOrgName}/{repoName@version}/{filePath}
```

- usernameOrOrgName: GitHub 用户名或者组织名
- repoName: 存储文件的仓库名
- @version: Release 版本号；如果不填写使用最新版
- filePath: 存储在 GitHub 仓库上的相对路径

#### 实现

创建组织的团队配置仓库，并写入要配置的内容，commit 并 push。

按照上面 jsdelivr 的模式配置路径，效果如下：

```
https://cdn.jsdelivr.net/gh/guzhongren/Buildkite-Dashboard/cypress.json
```

![jsdelivr 效果](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/cdn/cdn-github-data.5f2n2k3it68.webp)

## 总结

CDN 是加速资源加载的有效方法，虽然我们没有能力去构建一个自己的 CDN, 但可以利用现有方案去解决自己的问题。只是需要扩大自己的眼界和提升自己的认知即可。

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)
* [jsdelvr:https://www.jsdelivr.com/](https://www.jsdelivr.com/)
* [prospectone: https://prospectone.io/](https://prospectone.io/)
* [CDN: https://zh.wikipedia.org/wiki/%E5%85%A7%E5%AE%B9%E5%82%B3%E9%81%9E%E7%B6%B2%E8%B7%AF](https://zh.wikipedia.org/wiki/%E5%85%A7%E5%AE%B9%E5%82%B3%E9%81%9E%E7%B6%B2%E8%B7%AF)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)


## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此 [文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig) 进行校验： `gpg --verify PayForGuzhongren.svg.sig`

