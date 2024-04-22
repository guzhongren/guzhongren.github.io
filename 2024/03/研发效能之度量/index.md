# 研发效能之度量


在当前复杂的商业环境下，企业普遍倡导内部降本增效。在这种背景下，研发活动也越来越倾向于数字化度量和呈现。通过研发效能度量，组织能够获取更准确、全面的研发数据，从而更好地制定优化研发的决策和计划。

利用研发效能度量数据，组织可以更合理地管理和分配研发资源，进而提高研发效率和品质。这种优化不仅为企业在激烈的市场竞争中脱颖而出提供了有力支持，还为其展现更强的核心竞争力创造了更有利的条件。

## 当前研发效能的问题

人人都在说效能，可没有人拿出数据来展示自己的效能。

人人都在说效能，可没有人说，除了DORA Metrics 可以衡量部署，恢复等工作效率之外，还有哪些指标可以衡量团队所有人的效能。

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

### 指标收集粗略且不准确

当然，市场上存在多种收集，统计工具，比如 
* [Tech Dash](https://web.techdash.thoughtworks.net/) Thoughtworks 内部工具
* [Sleuth](https://www.sleuth.io/) 
* [polaris](https://polaris.thoughtworks.net/)
* [Metrik](https://github.com/thoughtworks/metrik)
* [DevLake](https://devlake.apache.org/), 收集，分析和可视化DevOps工具的零散数据，以提取卓越工程的洞见。
* [Polaris](https://sites.google.com/thoughtworks.com/polaris/home), automated tracking of engineering excellence fitness metrics.
* [Metrik](https://github.com/thoughtworks/metrik), calculates the [four key metrics](https://www.thoughtworks.com/radar/techniques/four-key-metrics) based on CI/CD build data.
* [Four Keys](https://github.com/GoogleCloudPlatform/fourkeys), measures the four key metrics.
* [HeartBeat](https://github.com/thoughtworks/HeartBeat), calculates delivery metrics from CI/CD build data, revision control and project planning tools.
* [Kuona project for IT Analytics](https://github.com/kuona/kuona-project), provides a dashboard on data from various sources.
* [Test Trend Analyzer](https://github.com/anandbagmar/tta), consumes test results for test trends.
* [TRT](https://github.com/thetestpeople/trt), consumes test results for test trends.
* [GoCD's analytics extension](https://extensions-docs.gocd.org/analytics/current/), collects and displays build metrics for GoCD.
* [pulse](https://www.pulse.codacy.com), support the continuous improvement of your engineering teams with data-driven insights.
* [Jellyfish](https://jellyfish.co), translate and maximize the business impact of engineering.
* [BuildPulse](https://github.com/marketplace/buildpulse), automatically detects flaky tests.

## 解决方案

### Heartbeat 的解决方案
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

