# 研发效能之度量


在当前复杂的商业环境下，企业普遍倡导内部降本增效。在这种背景下，研发活动也越来越倾向于数字化度量和呈现。通过研发效能度量，组织能够获取更准确、全面的研发数据，从而更好地制定优化研发的决策和计划。

利用研发效能度量数据，组织可以更合理地管理和分配研发资源，进而提高研发效率和品质。这种优化不仅为企业在激烈的市场竞争中脱颖而出提供了有力支持，还为其展现更强的核心竞争力创造了更有利的条件。

## 当前研发效能的问题

人人都在说效能，可没有人拿出数据来展示自己的效能。

人人都在说效能，可没有人说，除了 DORA Metrics 可以衡量部署，恢复等工作效率之外，还有哪些指标可以衡量团队所有人的效能。

人人都在说提效，但没人能说清楚使用了某个方法论之后，到底提效了多少。

## 研发效能的范围

研发效能的范围涵盖了研发活动的各个方面，主要包括以下几个方面：

- 效率：评估需求前置时间，流动时间，流动速率等。

- 成本效能：衡量完成项目所需的成本，包括人力资源、设备、材料等方面的费用。

- 质量效能：评估研发产品或服务的质量水平，包括产品的可靠性、性能、用户体验等方面。

- 技术能力：评估组件或产品的可复用能力，可配置能力和可扩展能力等。

- 工程能力：评估变更前置时间，部署频率和测试覆盖率等。

- 协作能力：评估团队工作的流动效率，流动负载和流动分布等。

这些方面共同构成了研发效能的范围，通过对这些方面的度量和评估，可以全面了解研发活动的表现和效果，从而进行有效的管理和优化。

这么多的效能面，从产品研发迭代过程来看，我们可以直接量化的是效率，工程能力和协作能力。

## 研发效能的难点

### 工具不统一

大多数组织都在使用不用的工具进行项目管理和产品构建部署等，并没有统一的套件来组织整个流程; 比如有的组织在用 Jira 管理需求，也有的组织在用 Trello, 也有开源组织在用 GitHub 的 Issues 或者 [Projects](https://github.com/kubernetes/kubernetes/projects/10); 在部署工具中，有的组织在用Jenkins, Buildkite，有的组织也在用 [GitHub Actions](),[ GitLab Suites](); 在源代码控制方面，各个组织也有不同的选择，比如GitHub, GitLab 等版本控制工具。

### 数据关系复杂

一个组织下肯定会有不同的项目组或者团队，每个团队在看板上对每一列的定义可能不尽相同，那么在计算效能的时候就需要定制化地去选择对应的数据。比如一个Account 大家都在用Jira, 每个团队有自己的定义过的看板，那么在最终统计看板效能的时候，大家的维度都不一样，可想而知，其最终的结果肯定也是不准确的。

### 统计维度多样

对于管理者，不同的人需要看到不同的维度，这样的统计才有意义。比如：
- 作为项目经理(Project Manager)，我想知道团队交付趋势(Momentum), 从而可以看出项目是否有风险
- 作为交付经理(Delivery Manager)，我想知道当前迭代团队的交付指标(Metrics)，从而知道团队交付速率，数据和质量等
- 作为技术领导(Tech Lead)，我想知道团队冲刺速度(Velocity)和周期时间(Cycle time)，从而分析出每个超出预定目标卡的原因并找到对应的提升办法，并在下个迭代改进
- ......

### 指标收集粗略且范围单一

当然，市场上存在多种收集，统计工具，比如 
* [Tech Dash](https://web.techdash.thoughtworks.net/) Thoughtworks 内部统计 DORA Metrics 的统计工具
* [Sleuth](https://www.sleuth.io/) 统计 DORA Metrics 的工具
* [polaris](https://polaris.thoughtworks.net/) Thoughtworks 内部统计 DORA Metrics 的统计工具
* [Metrik](https://github.com/thoughtworks/metrik) Thoughtworks 开源的 DORA Metrics 统计工具
* [DevLake](https://devlake.apache.org/), 收集，分析和可视化 DevOps 工具的零散数据，以提取卓越工程的洞见。
* [Four Keys](https://github.com/GoogleCloudPlatform/fourkeys), measures the four key metrics.
* [Kuona project for IT Analytics](https://github.com/kuona/kuona-project), provides a dashboard on data from various sources.
* [Test Trend Analyzer](https://github.com/anandbagmar/tta), consumes test results for test trends.
* [TRT](https://github.com/thetestpeople/trt), consumes test results for test trends.
* [GoCD's analytics extension](https://extensions-docs.gocd.org/analytics/current/), collects and displays build metrics for GoCD.
* [pulse](https://www.pulse.codacy.com), support the continuous improvement of your engineering teams with data-driven insights.
* [Jellyfish](https://jellyfish.co), translate and maximize the business impact of engineering.
* [BuildPulse](https://github.com/marketplace/buildpulse), automatically detects flaky tests.

在此，我们选择如下部分工具进行对比并说明。

## 解决方案对比

||Heartbeat|Sleuth|Metrik|DevLake|
|:--|:--|:--|:--|:--|
|开源|✅|❌|✅|✅|
|免费|✅|❌|✅|✅|
|自动统计|✅|✅|✅|✅|
|人工表单收集|❌|❌|❌|❌|
|社区活跃程度|🔋|🪫|➖|🔋|
|支持 GitHub 作为版本控制工具|✅|✅|❌|✅|
|支持 GitLab 作为版本控制工具|❌|✅|❌|✅|
|支持 GitHub Actions 作为 Pipeline 工具|❌|❌|❌|✅|
|支持 BuildKite 作为 Pipeline 工具|❌|✅|❌|✅|
|支持 GitLab 套件作为 Pipeline 工具|❌|✅|❌|✅|
|支持 Jenkins 作为 Pipeline 工具|❌|✅|✅|✅|
|支持度量 PR/MR 的前置时间|✅|❌|❌|✅|
|支持度量基于版本控制工具的特定分支的 DORA Metrics|✅|❌|❌|✅|
|支持自定义仓库统计|✅|✅|✅|✅|
|支持 Jira 作为项目管理工具|✅|❌|❌|✅|
|支持度量迭代完成点数|✅|❌|❌|✅|
|支持度量迭代完成卡数|✅|❌|❌|✅|
|支持按人统计迭代卡的时间分配|✅|❌|❌|❌|
|支持度量每张卡在每个状态中的时间消耗|✅|❌|❌|❌|
|支持度量返工（Rework）|✅|❌|❌|❌|
|导出 DORA Metrics 报告|✅|❌|✅||
|导出迭代内项目管理工具每张卡的时间消耗报告|✅|❌|❌|✅|
|多个迭代的图表展示|✅|✅|✅|✅|

从组织精准度量研发效能角度看，Heartbeat 统计的数据来源更多，比如统计 DORA Metrics 的数据源 Pipeline(BuildKite), 项目管理工具(Jira) 和版本控制工具(GitHub)，并且各个部分的自定义能力较强, 更能体现出交付质量和价值。

### Heartbeat 的解决方案

#### Heartbeat 是什么

|||
|:--|:--|
|对于</br> 目标用户/客户|TL, BA, PM, PO|
|谁</br> 需求/机会|1. 更好的了解交付效能</br> 2. 提高团队生产力和效率|
|产品|Heartbeat|
|是一个</br>|可视化项目交付效能的开源工具|
|它可以</br>关键好处，使用的竞争理由|1. 整合3个开发与进度管理产品</br> 2. 自动计算8个交付性能指标</br> 3. 可以导出相关数据报告|
|相比于</br>主要竞争替代方案|Sleuth, Metrics 和 DevLake|
|优势</br>差异点|1. 自动从第三方获取数据并计算交付效能指标</br> 2. 从数据源获取的最真实的交付效能指标，而不是通过手动收集所得|

#### 为什么会有 Heartbeat

在 Thoughtworks， 我们有 SDP(Sensible Default Practice) 来指导日常的软件工程开发工作，通过遵循 SDP 的最佳实践，组织可以提高研发效能；反之，通过分析收集到的各个指标，作为 TL 等角色的人，可以分析出哪些最佳实践是团队所需要提升的，从而针对性的采取行动来促进研发效能。

![研发效能反馈图]()

## 总结

## Refs

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

