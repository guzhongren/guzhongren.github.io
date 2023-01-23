# 开源项目构建及治理


## 前言

计算机世界几乎就是建立在开源项目之上的。近几年，国内外有很多开源项目出圈，例如 CNCF 的Kubernetes, 百度开源,在Apache 毕业的 EChart。开源不仅可以展示自己的技术能力，而且还可以为他人提供免费"物料"，减少重复造轮子的事的发生，"间接为全球碳中和做贡献"。


因为之前有一些开源相关的实践，只是在小范围内实践了部分项目，而最近正在参与并领导一个开源项目，正好把之前的一些实践给应用起来了；同时也在这里做个总结。

## 一图胜千言

![开源项目构建及治理](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Open-Source/开源项目构建及治理.3owdrno2fvk0.webp)

## 产品（Product）

开源的目的为了方便他人以最低的代价实现业务价值增长，或工作效率提升等；那么必须有一个产物（Artifact）,它可能是一个可下载, 可直接运行的软件包，也可能是一个有无服务器运行的在线应用程序，亦或是一个某领域，实践比较好或体验更好的第三方的依赖等。凡此种种，我们都可以称之为"产品（Production）"。

一个好的开源产品应该包含但不限于以下内容。

### 产品名称(Name)

每个事物都有他自己的标识。好的产品名称对产品来说就是如虎添翼，有的可以让用户看到项目名称就知道他的厉害之处，比如"鸿蒙", 原意是远古时期的混沌世界，但在华为当时的情景下代表这希望、梦想；再比如`Kubernetes`, 原意代表舵手，操作驾驶船舶的人，但在云原生背景下，他是用于自动部署，扩展和管理容器化应用程序的操作系统，Kubernates 和舵手的作用在这不谋而合；再比如开源单元测试报告生成工具`Istanbul`, 字面意思上，最初它只是土耳其的城市，因其悠久的历史而闻名，而在开源的世界里，可以被用来给开源项目当名称，还有比如`Cypress`等。

### 产品口号(Slogen)

Slogen 就是一句话，各种类型的都有，有表明态度型的，比如 Apple 的 `Think different`; 有鼓励用户行动型的，比如耐克的`Just do it`; 有传达观点型的， 比如戴比乐斯的`钻石恒久远，一颗永留传`; 但在开源的世界里，大家更喜欢用表明态度型，用一句话来说明自己产品的特性， 比如 React 的 Slogen: `A JavaScript library for building user interfaces`, Jenkins 的 Slogen `Build great things at any scale`。

### 标志(Logo)

作为产品，首先被记住的肯定是产品的的使用，然后是标志(Logo)。Logo 有文字型的，有图形型的，也有两者都有的。但是一个不复杂，认知度低的Logo 的辨识度是非常高的。

### 许可证(License)

在开源的世界里，许可证的选择非常重要；有的是不可商用的，许可证包括GNU通用公共许可证（GPL）、GNU通用公共许可证版本3（GPLv3）、类似GPL的许可证，以及非常严格的自由软件许可证，著名软件如：Linux操作系统内核, GNU工具套件,WordPress博客系统等。也有可商用，但不能被云厂商托管使用的许可证，如[BSD 3-Clause](https://opensource.org/licenses/BSD-3-Clause),软件如： [Redis](https://github.com/redis/redis); 如[Server Side Public License (SSPL)](https://www.mongodb.com/licensing/server-side-public-license)，软件如： [MongoDB](https://github.com/mongodb)。也有可商用也可免费使用的许可证，如：MIT, Apache License 2.0, 开源软件有ECharts等。

许可证的选择可以参考 [opensource.org](https://opensource.org/licenses/category)和开源工具[License Selector](https://ufal.github.io/public-license-selector/)来选择合适的许可证。

### 开发文档(README)

长盛不衰的开源项目总是有一个简单直观的开发文档，指导和帮助新加入的贡献者(Contributor)来快速上手项目。当然也可以在 README 里写使用步骤，项目 Roadmap 等。

README 文档非常重要，不管你的开源项目使用范围有多大，请把他当作一个礼仪一样的内容来准备。

### 产品网站(Web site)
### 产品路线图(Roadmap)
### 发布计划(Release plan)
### 产品版本控制策略(Version control)
### 反馈系统(Feedback)
### 代码(Code)

## 社区



## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Kubernates](https://kubernetes.io/)
* [EChart](https://echarts.apache.org/)
* [Istanbul](https://github.com/istanbuljs)
* [Cypress](https://www.cypress.io/)

## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

