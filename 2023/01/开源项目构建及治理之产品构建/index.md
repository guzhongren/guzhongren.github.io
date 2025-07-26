# 开源项目构建及治理之产品构建

## 前言

计算机世界几乎就是建立在开源项目之上的。近几年，国内外有很多开源项目出圈，例如 CNCF 的Kubernetes, 百度在Apache 毕业的 EChart。开源不仅可以展示自己的技术能力，而且还可以为他人提供免费“物料”，减少重复造轮子的事的发生，“间接为全球碳中和做贡献”。


因为之前有一些开源相关的实践，只是在小范围内实践了部分项目，而最近正在参与并领导一个开源项目，正好把之前的一些实践给应用起来了，同时也在这里做个总结。

## 一图胜千言

![开源项目构建及治理](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/Open-Source/开源项目构建及治理.2witgnrnxzc0.webp)

## 产品（Product）

开源的目的为了方便他人以最低的代价实现业务价值增长，或工作效率提升等；那么必须有一个产物（Artifact）,它可能是一个可下载, 可直接运行的软件包，也可能是一个有无服务器运行的在线应用程序，亦或是某一个领域，实践比较好或体验更好的第三方的依赖等。凡此种种，我们都可以称之为 “产品（Production）”。

一个好的开源产品应该包含但不限于以下内容。

### 产品名称(Name)

每个事物都有他自己的标识。好的产品名称对产品来说就是如虎添翼，产品名称可以是随心所欲的字符串，也可以是你的小宠物，当然还可以是地名，人物名等。

比如`鸿蒙`, 原意是远古时期的混沌世界，但在华为当时的情景下代表着希望、梦想；再比如`Kubernetes`, 原意代表舵手，操作驾驶船舶的人，但在云原生背景下，他是用于自动部署、扩展和管理容器化应用程序的操作系统，Kubernates 和舵手的作用在这不谋而合；再比如开源单元测试报告生成工具`Istanbul`, 字面意思上，最初它只是土耳其的城市，因其悠久的历史而闻名，而在开源的世界里，可以被用来给开源项目当名称，同样的还有如`Cypress`等。

### 产品口号(Slogen)

Slogen 就是一句话，各种类型的都有，有表明态度型的，比如 Apple 的 `Think different`; 有鼓励用户行动型的，比如耐克的`Just do it`; 有传达观点型的，比如戴比乐斯的`钻石恒久远，一颗永留传`; 但在开源的世界里，大家更喜欢用表明态度型，用一句话来说明自己产品的特性，比如 React 的 Slogen: `A JavaScript library for building user interfaces`,  Jenkins 的 Slogen `Build great things at any scale`。

### 标志(Logo)

作为产品，首先被记住的肯定是产品的的使用，然后是标志(Logo)。Logo 有文字型的，有图形型的，也有两者都有的。但是一个不复杂，认知度低的Logo 的辨识度是非常高的。

### 许可证(License)

![Open Source License](https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Open-source-license-chart.svg/1024px-Open-source-license-chart.svg.png)

在开源的世界里，许可证的选择非常重要；有的是不可商用的，许可证包括GNU通用公共许可证（GPL）、GNU通用公共许可证版本3（GPLv3）、类似GPL的许可证，以及非常严格的自由软件许可证，著名软件如：Linux操作系统内核, GNU工具套件,WordPress博客系统等。也有可商用，但不能被云厂商托管使用的许可证，如[BSD 3-Clause](https://opensource.org/licenses/BSD-3-Clause),软件如： [Redis](https://github.com/redis/redis); 如[Server Side Public License (SSPL)](https://www.mongodb.com/licensing/server-side-public-license)，软件如： [MongoDB](https://github.com/mongodb)。也有可商用也可免费使用的许可证，如：MIT, Apache License 2.0, 开源软件有ECharts等。

许可证的选择可以参考 [opensource.org](https://opensource.org/licenses/category)和开源工具[License Selector](https://ufal.github.io/public-license-selector/)来选择合适的许可证。

### 开发文档(README)

长盛不衰的开源项目总是有一个简单直观的开发文档，指导和帮助新加入的贡献者(Contributor)来快速上手项目, 或者记录一些重要的操作步骤，如如何发布版本。当然也可以在 README 里写使用步骤，项目 Roadmap 等。

README 文档非常重要，不管你的开源项目使用范围有多大，请把他当作一个礼仪一样的内容来准备， 为了自己也是为了他人。

### 产品网站(Web site)

产品网站是宣传产品非常重要的途径。对于开源产品不需要花哨的设计，或者酷炫的交互，只需将产品的名称、Slogen、特性（Feature）、相关文档放在醒目的位置，然后集成一些社交信息，比如GitHub 项目链接，如果有大公司使用你的产品，可以将其单独列出来，来为自己的产品背书。还有，如果有项目捐赠者，一定要将其分类高亮出来，给予捐赠者相应的地位和曝光，说不定他们可以为你的产品吸引来更多的捐赠者。

如下是一些做得比较好的产品网站：
- Jenkins: [https://www.jenkins.io/](https://www.jenkins.io/)
- Playwright: [https://playwright.dev/](https://playwright.dev/)

### 产品路线图(Roadmap)

产品路线图为项目关注者、贡献者指明产品未来的发展方向，及涉及的技术维度，同时也是一种知识沉淀，可以让后面关注项目的人了解到产品是怎么来的，为什么会是这样以及将来会是什么发展方向。

产品路线图可能会影响到用户的商业决策，也可能会影响到项目贡献者的积极性等，所以在展示你的产品路线图的时候一定要谨慎。

Roadmap 的形式有各种各样的，如下是Jenkins 和 Azure 的 Roadmap。
- Jenkins: [https://www.jenkins.io/project/roadmap/](https://www.jenkins.io/project/roadmap/)
- Azure: [https://github.com/Azure/AKS/projects/1](https://github.com/Azure/AKS/projects/1)

### 发布计划(Release plan)

![Linux Kernel Release](https://upload.wikimedia.org/wikipedia/en/timeline/gogh13ap32j8q3u985j8sx5r65w01ya.png)

发布计划在开源项目里也是一个非常重要项目，有计划地发布周期总是给人以稳定、靠谱的期望，有了期望之后，不管是贡献者还是使用者，大家都有了盼头。

不同的项目有不同的发布方式。比如 [Linux Kernal](https://www.kernel.org/) 的发布计划，完全取决于 [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) 和 Linux Kernel 社区。其发布计划可在[这里](https://en.wikipedia.org/wiki/Linux_kernel_version_history#:~:text=Property%20Value%20%20Version%20%20%20%20Original,Kroah-Hartman%20%20%20Named%20Blurry%20Fish%20Butt%20)查看。

当然还有规律性发布的产品，如[GoLang](https://github.com/golang/go), 其发布计划如下：总体目标是每6个月发布一次主要版本，然后细分为3个月的常规开发，然后是3个月的测试和优化，即所谓的版本冻结。

还有基于功能的发布计划，大部分产品都使用这种。比如 Kubernetes, 其发布计划就是将所涉及的功能开发完成后才发布的。其发布计划可以查看[这里](https://github.com/kubernetes/kubernetes/milestones)。

### 产品版本控制策略(Version control)

产品的版本控制策略通常是指产品的版本。我们通常使用语义化([Semver](https://semver.org/))的策略来发布产品，比如 [React](https://github.com/facebook/react/blob/main/packages/react/package.json); 还有一种基于日期的发布策略，但是一般不常用，比如 [Ubuntu Desktop](https://ubuntu.com/download/desktop), 其版本是与年份和月份相关的，如`Ubuntu 22.04.1 LTS`。

### 反馈系统(Feedback)

所谓反馈一般指两种，一种是来自最终用户的反馈，可能包含夸赞、诋毁或者建议意见，良好的反馈循环可以将某些反馈转化为需求；另一种是间接产生的反馈，如贡献者或者使用该项目的开发者发现的不足，这类反馈一般都是比较重要的 bug，作为开源项目的维护者，应及时关注并解决。

反馈系统的类型也是多种多样，通常是在产品官网或者产品社区网站提供一个对话框或者留言板，允许用户进行留言, 这种方式主要针对最终用户；还有一种通过使用代码托管平台创建 Issue, 这种方式主要针对开发者。这里可以使用其他开发者开源的一些应用，如：[uterance.es](https://utteranc.es/)、 [gitment](https://github.com/imsun/gitment)和 [gitalk](https://github.com/gitalk/gitalk)。

### 代码(Code)

作为开源项目，毋庸置疑必须以代码为基础，但是在写代码之前一定要考虑一些事，比如项目组的行为规范(Code of conduct)、贡献策略(Contributing)、代码请求(PR)、安全(Security)、合规性(Compliance)、及产品文档(Doc as code)……


#### 行为规范(Code of Conduct)

"无规矩不成方圆"。好的开源社区的特质总是相似的，平等、没有各种歧视、激励性发言和没有骚扰等等的，在社区内容是一些默认"规矩"，大家都默认遵守。Code of Conduct 包含各个方面，人文、政治、地理、宗教和性别等。这里可以参考 Microsoft 和 Thoughtworks 与 [Contributor Convenant](https://www.contributor-covenant.org/)的行为规范。
- [Microsoft Open Source Code of Conduct: https://github.com/microsoft/playwright/blob/main/CODE_OF_CONDUCT.md](https://github.com/microsoft/playwright/blob/main/CODE_OF_CONDUCT.md)
- [Thoughtworks Code of Conduct: https://www.thoughtworks.com/content/dam/thoughtworks/documents/guide/tw_guide_code_of_conduct_en_aug_2021.pdf](https://www.thoughtworks.com/content/dam/thoughtworks/documents/guide/tw_guide_code_of_conduct_en_aug_2021.pdf)
- [Contributor Convenant](https://www.contributor-covenant.org/)

#### 贡献策略(Contributing)

开源项目总是欢迎来自世界各地的贡献者(Contributor)。为了更好地协作或者减少认知负载，开源社区一般会有自己的贡献策略，比如代码风格是什么样的，API 该怎么规范，如何做Code Review, 以及需要满足什么样的代码测试覆盖率等等。一般会在项目的README 中强调出来，当然也可以将其代码化，通过 CI 工具来实现自动化检查。比如 Playwright 就在自己的 [Contributing](https://github.com/microsoft/playwright/blob/main/CONTRIBUTING.md) 文档里阐述了如何为其项目贡献的贡献策略。

![Allcontributors](https://allcontributors.org/img/icons/android-icon-192x192.png)

同时，如果你将项目的贡献者添加到项目中醒目的位置，让所有人看到他为这个项目贡献了内容，这将激励更多的贡献者为项目做贡献。这里推荐使用[Allcontributors](https://allcontributors.org/), 通过为你的开源项目集成这个工具，在项目的README 中可以显示共享者的头像及贡献类型，让贡献者感觉到参与开源项目的荣耀感。

#### 代码请求(PR)

在开源项目中，大家通常使用 PR (Pull Request) 来贡献代码, 所以项目的维护者(Maintainer)要将一部分精力放在 Reveiw 别的贡献者的PR 上，同时给予鼓励性的言语评语(Comment), 或者给予适当的建议意见。要相信正向的鼓励总是会带来不一样的额外收获。

当然，我们也要推荐大家使用一些约定俗成的简写，如：

|简写|英语全拼|中文释义|
|:--|:--|:--|
|PR|Pull request|请求合并代码|
|WIP|Work in progress|贡献者做了很大的改动，但部分完成了，这里就是WIP,这样就方便别人知道你的提交的进展，审核已经完成的部分|
|PTAL|Please take a look|请求别人进行 Code Review|
|TBR|To be reviewed|提示别人这些代码要被Review|
|TL/DR|Too long, Don't read|太长了，懒得看|
|LGTM| Look good to me|通常是指Review 通过|
|SGTM|Sound good to me|和LGTM 同义|
|AFAIK|As far as I know|据我所知|
|CC|Carbon Copy|抄送|

#### 安全(Security)

安全问题不管是在开源项目还是商业项目中都非常重要，我们可以将其分为`静态应用安全测试`、`动态应用安全测试`和`依赖安全检查`几大类。

##### 静态应用安全测试

静态应用安全测试(Static Application Security Testing),简称 `SAST`，也称之为源码安全扫描。

SAST 主要是通过使用工具来对源代码进行分析，找出源代码中存在的安全问题，比如密钥, 或者存在安全问题的对象的方法等。

使用SATS, 我们能够:
- 让安全问题提早暴露出来，从而降低修复成本
- 降低开发团队对于安全专业技能的要求
- 用事半功倍的方式获取源码对安全质量的反馈

做静态应用安全测试的工具有很多，主要分为开源免费和商业授权使用两类；并且可以将其集成到 IDE 或者 Pipeline 中。

###### 开源免费

- [SonarQube](https://www.sonarsource.com/)
- [Spot Bugs](https://spotbugs.github.io/)
- [Find-Sec-Bugs](https://find-sec-bugs.github.io/)
- [Bandit](https://github.com/PyCQA/bandit)
- [Brakeman](https://github.com/presidentbeef/brakeman)
- [trufflehog](https://github.com/trufflesecurity/trufflehog)
- [Talisman](https://github.com/thoughtworks/talisman)

###### 商业授权

- [Fortify](https://www.microfocus.com/en-us/cyberres/application-security)
- [CheckMarx](https://checkmarx.com/)

##### 动态应用安全测试

动态应用安全测试， Dynamic Application Security Testing,简称 `DAST`。

DAST 主要是使用第三方漏洞工具对正在运行的应用程序及其环境进行扫描，并将扫描到的安全问题可视化处理的过程。

DAST 通常在项目运行起来之后进行，是对应用程序的*行为*进行测试。

可使用的工具有：

###### 开源免费

- [OWASP® Zed Attack Proxy (ZAP)](https://www.zaproxy.org/)
- [Arachni](https://www.arachni-scanner.com/)

##### 商业授权

- [Acunetix](https://www.acunetix.com/)
- [Rapid7](https://www.rapid7.com/)

##### 依赖安全检查

现代应用程序大都是基于已有的第三方框架(Framework) 和包(package)来构建的。在开发过程中，我们更关注我们的功能的实现，容易忽略第三方依赖的安全问题，比如 2021 年的 [Log4Shell 漏洞问题](https://en.wikipedia.org/wiki/Log4j#Log4Shell_vulnerability), 由于这个[Log4j](https://logging.apache.org/log4j/2.x/) 常用包被集成到全球很多项目中，而其某些版本是有安全漏洞的，如果不能及时修复，那么可能会出现很多问题，包括政治，经济，安全等等。

对于依赖安全来说，也有很多工具可以使用：

###### 开源免费

- [Mend renovate](https://www.mend.io/free-developer-tools/renovate/), 注：商业收费，但对开源项目免费
- [npm-autit](https://docs.npmjs.com/cli/v6/commands/npm-audit)
- [OWASP DependencyCheck](https://owasp.org/www-project-dependency-check/)
- [GitHub Dependabot](https://github.com/dependabot)
- [Pipen](https://realpython.com/pipenv-guide/) - Python
- [bundle-audit](https://github.com/rubysec/bundler-audit) - Ruby
- [Hawkeye](https://github.com/hawkeyesec/scanner-cli), 注：作者正在转手这个项目
- [Trivy](https://github.com/aquasecurity/trivy)
- [Snyk](https://snyk.io/)
###### 商业授权

- [BlackDuck](https://www.synopsys.com/software-integrity/security-testing/software-composition-analysis.html)
- [Snyk](https://snyk.io/)

#### 合规性(Compliance)

开源项目的合规性不仅是自身产品代码的合规性，还有一部分是第三方依赖的合规性。

如果你的开源项目使用了受版权保护的依赖，那么，你很可能会收到有版权依赖公司的律师函或者邮件，轻则什么事都没有，重则倾家荡产，牢底坐穿。比如，2018年 Facebook 将 React 的许可证由 MIT 许可证变更为 Facebook 公司的许可证，这个变更带来了一些问题，其中一些是：

- 遵循新许可证的限制： 新许可证要求在使用React的代码的同时，必须在应用程序中明确标识"Powered by React"。这可能会对一些公司或组织带来麻烦，因为他们可能不想在应用程序中显示这个标识。

- 对第三方库的影响： 由于React是一个流行的JavaScript库，很多第三方库都依赖于它。因此，这次许可证变更可能会影响到这些第三方库的使用。

- 法律纠纷风险： 因为新许可证包含了一些限制条款，所以如果某些公司或组织没有遵循这些限制条款，他们可能会面临法律纠纷。

- 对开源社区的影响： 这次许可证变更可能会对开源社区产生影响，因为一些开发人员可能不愿意遵循新许可证的限制条款，而放弃使用React。

所以，在开始你的开源项目前，你需要想清楚你的开源项目的定位及开源协议，这里可以参考 [opensource.org](https://opensource.org/licenses) 来找到适合你的开源协议，也可以使用这款工具[License Selector](https://ufal.github.io/public-license-selector/)来根据提问来选择合适的开源协议。

当然你需要一定的工具来保证你的依赖的合规性。比如：对于基于 NodeJS 的项目，可以使用 [license-compliance](https://www.npmjs.com/package/license-compliance) 来检查依赖及其依赖的依赖的合规性。对于 Gradle 项目，可以使用 [Gradle-License-Report](https://github.com/jk1/Gradle-License-Report) 来检查 Gradle 项目的合规性。

#### 文档即代码(Doc as code)

对于产品而言，一定要有文档; 产品文档一般被当作使用说明或者遇到问题时的解决方案；对于开源项目来说，最好的文档就是代码化的文档，并且托管在网站上，像 [GitHub pages](https://pages.github.com/) 和 [Netlify](https://www.netlify.com/)等。

现在也有很多可以快速构建文档的工具库，如：
- [Docusaurus](https://docusaurus.io/)
- [Astro](https://astro.build/)
- [Hugo](https://gohugo.io/)
- [VuePress](https://vuepress.vuejs.org/)

大多数文档框架都支持自定义，这样开发者可以将产品的介绍页也可以加进去，这样产品介绍和产品文档就在同一个项目和同一个网站中，提升用户体验和开发体验了。

## 社区

社区是另一个比较大的话题，我们将在下篇中聊。这里放上《如何组织社区》的思维导图。

![如何组织社区](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/Open-Source/社区建设.6u6659b42mw0.webp)

## 引用

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Kubernates: https://kubernetes.io/](https://kubernetes.io/)
* [EChart: https://echarts.apache.org/](https://echarts.apache.org/)
* [Istanbul: https://github.com/istanbuljs](https://github.com/istanbuljs)
* [Cypress: https://www.cypress.io/)](https://www.cypress.io/)
* [Semver: https://semver.org/](https://semver.org/)
* [Utterance.es: https://utteranc.es/](https://utteranc.es/)
* [Gitment: https://github.com/imsun/gitment](https://github.com/imsun/gitment)
* [Gitalk: https://github.com/gitalk/gitalk](https://github.com/gitalk/gitalk)
* [Contributing: https://github.com/microsoft/playwright/blob/main/CONTRIBUTING.md](https://github.com/microsoft/playwright/blob/main/CONTRIBUTING.md)
* [opensource.org: https://opensource.org/licenses](https://opensource.org/licenses)
* [Docusaurus: (https://docusaurus.io/](https://docusaurus.io/)
* [Astro: https://astro.build/](https://astro.build/)
* [Hugo: https://gohugo.io/](https://gohugo.io/)
* [VuePress: https://vuepress.vuejs.org/](https://vuepress.vuejs.org/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)

