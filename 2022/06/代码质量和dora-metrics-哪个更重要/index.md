# 代码质量和Dora Metrics， 哪个更重要？


## 起因

最近在项目上搞代码质量方面的工作，发现项目代码运行测试后不能生成测试报告，导致 SonarQube 上没有关于测试覆盖率的Metric, 而且Pipeline 还可以正确运行，并没有因为不满足 SonarQube 的 Quality Gate 而 break Pipeline 的运行。

不能生成测试报告这个问题简单，只是因为运行测试的容器的用户对特定的目录没有权限，这个很好解决。

但是对于SonarQube 不能 break Pipeline 这点组内有不同的意见。有些人交付更重要，有些人认为代码质量在这里更为重要。

## 分析

所有的问题都是解决“人”的问题。

代码质量， 英语 Code Quality, 衡量代码测试覆盖率，Code Smells， Bug 数量，安全问题（Security HotSpot）等。 代码质量在软件开发过程中都是重中之重。

[Dora Metrics]() 是一套衡量软件交付效能的指标，有
- 部署频率（Deployment frequency）
- 前置时间（Lead time for change）
- 变更失败率（Change failure rate）
- 故障回复时间（Time to restore services）

在我们这个场景下，大家关心的是`变更失败率` 和 `代码质量` 哪个更重要。

### 如果更关心变更失败率

如果更关心变更失败率，而放弃了代码质量，那么面临的问题将会是由“人”导致的各种问题，如大家提交了低质量的代码，因为没有质量门禁来拦截，人们大多情况下因为自己的懒惰或者逃避责任而选择忽略已存在的各种不符合高质量的代码。长此以往，代码质量问题积累越来越多，项目将难以维护，CI/CD 的失败变更率肯定会随之提高。

### 如果更关心代码质量

如果更关心代码质量， 那么面临的问题会变成，提交了代码之后可能会被 SonarQube 检测出来一些不符合某些门禁指标的issues，然后由于不满足预定的指标而将Pipelien 阻断，造成`变更失败率`指标的升高。


## 如何做呢

那么对于这两项，哪个更为重要，或者有什么办法使两者都可以兼得呢？

个人认为，在正常的软件交付过程中，代码质量更为重要。 应该通过一定的检测技术来阻止有问题的代码部署到生产环境，就像`测试左移(Shift-left Testing)`。这样，我们可以确保我们的代码没有任何问题，避免了代码层面的可能引起的生产问题。


但是有时候，事情也不是绝对的。我们可以给质量门禁给予一定的容忍度，可以让有小问题的代码通过门禁并且部署到生产环境。比如，略微降低代码的测试覆盖率，或者降低安全问题的级别。但是这样做就需要每次在合并代码到主分支之前，将所有的代码质量问题都解决，而这必须成为团队的规约，大家必须遵守。


## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Dora Metrics:https://devops.com/dora-and-google-cloud-to-collaborate-on-devops-research/](https://devops.com/dora-and-google-cloud-to-collaborate-on-devops-research/)    
## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

