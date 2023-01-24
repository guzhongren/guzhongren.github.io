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

每个事物都有他自己的标识。好的产品名称对产品来说就是如虎添翼，产品名称可以是随心所欲的字符串，也可以是你的小宠物，当然还可以是地名，人物名等。

比如`鸿蒙`, 原意是远古时期的混沌世界，但在华为当时的情景下代表这希望、梦想；再比如`Kubernetes`, 原意代表舵手，操作驾驶船舶的人，但在云原生背景下，他是用于自动部署，扩展和管理容器化应用程序的操作系统，Kubernates 和舵手的作用在这不谋而合；再比如开源单元测试报告生成工具`Istanbul`, 字面意思上，最初它只是土耳其的城市，因其悠久的历史而闻名，而在开源的世界里，可以被用来给开源项目当名称，同样的还有如`Cypress`等。

### 产品口号(Slogen)

Slogen 就是一句话，各种类型的都有，有表明态度型的，比如 Apple 的 `Think different`; 有鼓励用户行动型的，比如耐克的`Just do it`; 有传达观点型的， 比如戴比乐斯的`钻石恒久远，一颗永留传`; 但在开源的世界里，大家更喜欢用表明态度型，用一句话来说明自己产品的特性， 比如 React 的 Slogen: `A JavaScript library for building user interfaces`, Jenkins 的 Slogen `Build great things at any scale`。

### 标志(Logo)

作为产品，首先被记住的肯定是产品的的使用，然后是标志(Logo)。Logo 有文字型的，有图形型的，也有两者都有的。但是一个不复杂，认知度低的Logo 的辨识度是非常高的。

### 许可证(License)

![Open Source License](https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Open-source-license-chart.svg/1024px-Open-source-license-chart.svg.png)

在开源的世界里，许可证的选择非常重要；有的是不可商用的，许可证包括GNU通用公共许可证（GPL）、GNU通用公共许可证版本3（GPLv3）、类似GPL的许可证，以及非常严格的自由软件许可证，著名软件如：Linux操作系统内核, GNU工具套件,WordPress博客系统等。也有可商用，但不能被云厂商托管使用的许可证，如[BSD 3-Clause](https://opensource.org/licenses/BSD-3-Clause),软件如： [Redis](https://github.com/redis/redis); 如[Server Side Public License (SSPL)](https://www.mongodb.com/licensing/server-side-public-license)，软件如： [MongoDB](https://github.com/mongodb)。也有可商用也可免费使用的许可证，如：MIT, Apache License 2.0, 开源软件有ECharts等。

许可证的选择可以参考 [opensource.org](https://opensource.org/licenses/category)和开源工具[License Selector](https://ufal.github.io/public-license-selector/)来选择合适的许可证。

### 开发文档(README)

长盛不衰的开源项目总是有一个简单直观的开发文档，指导和帮助新加入的贡献者(Contributor)来快速上手项目, 或者记录一些重要的操作步骤，如如何发布版本。当然也可以在 README 里写使用步骤，项目 Roadmap 等。

README 文档非常重要，不管你的开源项目使用范围有多大，请把他当作一个礼仪一样的内容来准备, 为了自己也是为了他人。

### 产品网站(Web site)

产品网站是宣传产品非常重要的途径。对于开源产品不需要花哨的设计，或者酷炫的交互，只须将产品的名称、Slogen、特性（Feature）、相关文档放在醒目的位置，然后集成一些社交信息，比如GitHub 项目链接，如果有大公司使用你的产品，可以将其单独列出来，来为自己的产品背书。还有，如果有项目捐赠者，一定要将其分类高亮出来，给予捐赠者相应的地位和曝光，说不定他们可以为你的产品吸引来更多的捐赠者。

如下是一些做的比较好的产品网站：
- Jenkins: [https://www.jenkins.io/](https://www.jenkins.io/)
- Playwright: [https://playwright.dev/](https://playwright.dev/)

### 产品路线图(Roadmap)

产品路线图为项目关注者、贡献者指明产品未来的发展方向，及涉及的技术维度，同时也是一种知识沉淀，可以让后面关注项目的人了解到产品是怎么来的，为什么会是这样以及将来会是什么发展方向。

产品路线图可能会影响到用户的商业决策，也可能会影响到项目贡献者的积极性等，所以在展示你的产品路线图的时候一定要谨慎。

Roadmap 的形式有各种各样的，如下是Jenkins 和 Azure 的。
- Jenkins: [https://www.jenkins.io/project/roadmap/](https://www.jenkins.io/project/roadmap/)
- Azure: [https://github.com/Azure/AKS/projects/1](https://github.com/Azure/AKS/projects/1)

### 发布计划(Release plan)

![Linux Kernel Release](https://upload.wikimedia.org/wikipedia/en/timeline/gogh13ap32j8q3u985j8sx5r65w01ya.png)

发布计划在开源项目里也是一个非常重要项目，有计划的发布周期总是给人以稳定、靠谱的期望，有了期望之后，不管是贡献者还是使用者，大家都有了盼头。

不同的项目有不同的发布方式。比如 [Linux Kernal](https://www.kernel.org/) 的发布计划，完全取决于 [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) 和 Linux Kernel 社区。其发布计划可在[这里](https://en.wikipedia.org/wiki/Linux_kernel_version_history#:~:text=Property%20Value%20%20Version%20%20%20%20Original,Kroah-Hartman%20%20%20Named%20Blurry%20Fish%20Butt%20)查看。

当然还有规律性发布的产品，如[GoLang](https://github.com/golang/go), 其发布计划如下：总体目标是每6个月发布一次主要版本，然后细分为3个月的常规开发，然后是3个月的测试和优化，即所谓的版本冻结。

还有基于功能的发布计划，大部分产品都使用这种。比如 Kubernetes, 其发布计划就是将所涉及的功能开发完成后才发布的。其发布计划可以查看[这里](https://github.com/kubernetes/kubernetes/milestones)。

### 产品版本控制策略(Version control)

产品的版本控制策略通常是指产品的版本。我们通常使用语义化([Semver](https://semver.org/))的策略来发布产品，比如 [React](https://github.com/facebook/react/blob/main/packages/react/package.json); 还有一种基于日期的发布策略，但是一般不常用， 比如 [Ubuntu Desktop](https://ubuntu.com/download/desktop), 其版本是与年份和月份相关的，如`Ubuntu 22.04.1 LTS`。

### 反馈系统(Feedback)

所谓反馈一般指两种，一种是来自最终用户的反馈，可能包含夸赞、诋毁或者建议意见，良好的反馈循环可以将某些反馈转化为需求；另一种是间接产生的反馈，如贡献者或者使用该项目的开发者发现的不足，这类反馈一般都是比较重要的 bug，作为开源项目的维护者，应及时关注并解决。

反馈系统的类型也是多种多样，通常是在产品官网或者产品社区网站提供一个对话框或者留言板，允许用户进行留言, 这种方式主要针对最终用户；还有一种通过使用代码托管平台创建 Issue, 这种方式主要针对开发者。 这里可以使用其他开发者开源的一些应用，如：[uterance.es](https://utteranc.es/)、 [gitment](https://github.com/imsun/gitment)和 [gitalk](https://github.com/gitalk/gitalk)。

### 代码(Code)

作为开源项目，毋庸置疑必须以代码为基础，但是在写代码之前一定要考虑一些事，比如项目组的行为规范(Code of conduct)、贡献策略(Contributing)、安全(Security)、合规性(Compliance)、及产品文档(Doc as code)......


#### 行为规范(Code of Conduct)

#### 贡献策略(Contributing)
#### 安全(Security)
#### 合规性(Compliance)
#### 文档即代码(Doc as code)

## 社区



## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Kubernates](https://kubernetes.io/)
* [EChart](https://echarts.apache.org/)
* [Istanbul](https://github.com/istanbuljs)
* [Cypress](https://www.cypress.io/)
* [Semver: https://semver.org/](https://semver.org/)
* [Utterance.es: https://utteranc.es/](https://utteranc.es/)
* [Gitment: https://github.com/imsun/gitment](https://github.com/imsun/gitment)
* [Gitalk: https://github.com/gitalk/gitalk](https://github.com/gitalk/gitalk)
## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

