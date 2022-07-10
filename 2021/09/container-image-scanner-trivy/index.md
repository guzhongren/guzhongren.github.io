# Container Image Scanner - Trivy

## 摘要

在现代软件开发中， 我们会使用一些公共镜像作为基础镜像来快速构建我们的应用镜像，并将其部署到生产环境中。

随着越来越多的应用程序被容器化，容器安全也随之变得越来越重要。在项目的 Pipeline 中， 我们可以使用漏洞扫描器（Vulnerability Scanners）进行扫描并提前获得反馈，实现 “__安全左移__” ，也可以更好的实践敏捷。

## 基于容器的应用程序的安全痛点

![基于容器的应用程序的安全痛点](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/Group%2052.5gp1z5ybbps0.png)

现在，我们使用先进的技术来构建我们的应用程序，如 NodeJS、 Java 和 Kotlin 等，然后将代码库存储在托管的 Git 平台上，如 GitHub、Gitlab 等。代码库由我们的业务代码和依赖关系组成；对于依赖项，我们可以使用专业的扫描工具来确保安全，比如 NodeJS 的 npm audit , GitHub 的 Dependabot；至于我们的业务代码，可以使用其他的一些安全工具可以扫描，比如 [SoneQube](https://www.sonarqube.org/) 等。

因此，对于依赖（ Dependencies）和我们的业务代码，这些都在我们的控制之下，我们可以确保应用程序的安全性，并且在 Pipeline 上获得快速反馈；同时在我们将应用程序部署到生产环境之前可以通过使用各种工具建立信心。但是，通常情况下我们的应用程序运行的系统环境是不受我们控制的，可能存在潜在的安全漏洞。在这我们可以换位思考一下，如果我们不能保证我们的应用程序运行的系统的环境安全，就会导致各种各样意想不到的问题，如黑客攻击、用户信息泄露、财产损失，更会对公司的声誉造成损害。所以，确保我们产出物（Artifact）的安全是很重要的。

## 保持容器镜像安全的价值

### 保护客户的财产（Property）和声誉（Reputation）

我们为公司或客户提供专业的服务，所以我们必须确保每一行代码都是可靠和安全的。因为代码就是公司或者客户的财产和名誉。作为开发者，只要保证代码及应用程序的环境的安全性，公司或者客户就能获得最大的效益。声誉即价值。

### 打造受人尊敬的品牌（Branding）

我们的工作就是让我们的公司或客户成功。只有公司或客户成功，我们才能成功。因此，我们不仅要实现业务价值，还需要保护了产品的安全。用户使用安全的产品或者服务得到更大的价值，公司或者客户的品牌效应就会扩大，从而带来更大的价值。品牌及价值。

## 保持容器镜像安全的 2 个最佳方案

![保持容器镜像安全的 2 个最佳方案](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/Group%2050.1czb512thukg.png)

### 方案 1： 在镜像注册表中定期扫描

通过这种方式，我们需要为镜像注册表添加一个安全扫描程序，扫描程序可以是一个定时任务（Cron Job） 作业，也可以是由特定的人触发的可执行操作。

如果是一个定时任务，它将在特定时刻由定时任务自动触发。例如，Docker Hub 会在特定的时间扫描他们的官方注册表，当有任何漏洞被扫描出来时，它会向镜像维护者发送报警信息。
### 方案 2：将扫描工具集成到 Pipeline 中

另一种方法是在 Pipeline 上对镜像产物进行扫描，这样更加简单高效。当我们将代码推送到代码存储库时， Pipeline 将自动执行扫描镜像的命令。因为 Pipeline 每次都是无差别地执行，所以我们可以发现任何安全问题并及时报警修复。

现在，越来越多的团队或公司使用敏捷来开发他们的项目。如果我们能够尽早地发现任何安全问题或者漏洞，我们就可以在产品发布之前降低产品的安全风险。 Pipeline 是确保每一行代码和基础运行环境的安全性是的最好方法之一，因为它可以在提交代码时自动执行。

## 容器安全扫描工具对比

针对上述解决方案，我们调查了 [Trivy](https://github.com/aquasecurity/trivy)、[claire](https://github.com/quay/clair)、[Anchore Engine](https://github.com/anchore/anchore-engine)、[Quay](https://github.com/quay/quay)、[Docker hub](https://hub.docker.com/) 和 [GCR](https://cloud.google.com/container-registry) 等几种扫描工具，从不同维度进行对比。

|Scanner|OS packages|Application dependencies|Easy to use|Accuracy|Suitable for CI|Suitable for Solution|
|:--|:--|:--|:--|:--|:--|:--|
|Trivy|✅|✅|⭐ ⭐ ⭐|⭐ ⭐ ⭐|⭐ ⭐ ⭐|2
|Clair|✅|❌|⭐ |⭐ ⭐ |⭐ ⭐ |2
|Anchore Engine|✅|✅|⭐ ⭐|⭐ ⭐|⭐ ⭐ ⭐|2
|Quay|✅|❌|⭐ ⭐ ⭐|⭐ ⭐ |❌|1
|Docker Hub|✅|❌|⭐⭐⭐|⭐|❌|1
|GCR|✅|❌|⭐ ⭐ ⭐|⭐ ⭐ |❌|1

首先，我们可以将这些扫描工具按照其执行的环境简单分类； 因为 Docker Hub、GCR 和 Quay 是需要在服务端也就是容器注册中心运行的， 所以适合方案 1； Trivy、Clair 和 Anchor Engine 可以在 Pipeline 上工作，所以适合解决方案 2。

对于第一个维度：OS Package，这些所有的扫描工具都可以做到，但是对于第二个维度：Application dependencies，只有 Trivy 和 Anchore Engine 可以做到，对于第五个维度：Suitable for CI, 只有前三个符合条件。

对于漏洞数据库的更新，Clair 会定期从一组配置的源中获取漏洞元数据库（Vulnerability Database），并将数据存储在其数据库中，只要不获取最新的漏洞元数据，每次执行都用之前的漏洞数据库，漏洞数据库的时效性有点差。 Trivy 和 Anchore Engine 则是每次运行都将下载最新的漏洞数据库并将其缓存在本地文件中，当扫描工具再次运行时，它将检查并更新数据库以保持数据库为最新状态。

同时，对于 Trivy、Clair 和 Anchore Engine，这三者的社区非常活跃，所以我们不能用没有人来帮你解决你的问题来评判； 而且作为一种工具，它必须易于使用并且有良好的文档可供参考。经过调研，发现 Trivy 的文档非常详细，非常友好， 而且 Trivy 的使用方式更加友好，比如我们可以过滤掉（.trivyignore）你指定的漏洞，对于最新发现的漏洞，官方没有给出修复版本，这时候我们就可以忽略这个漏洞继续构建，但 Anchore Engine 做不到。

2020 年 3 月 16 日，领先的云原生应用和基础设施安全平台供应商 Aqua Security 宣布，其开源的 Trivy 漏洞扫描器将作为一个集成选项添加到其使用的云原生平台、CNCF 的 Harbor 注册表和 Mirantis Docker Enterprise 中。你可以在这里找到这篇文章。

## Trivy 在 Thoughtworks 雷达 23 期中

![Trivy in TW tech radar](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/trivy-tw-radar.2543ysqo6wf4.png)

Thoughtworks 技术雷达以准反应技术趋势而闻名；在最新的技术雷达中，Thoughtworks 将 Trivy 引入了置于 __Adopt__，说明 Trivy 是有用的、有价值的和可行的。

## Trivy 的工作原理

![Inner working of Trivy](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/Group%2051.4icjkydqu3s0.png)

在我们使用 Trivy 之前，我们需要知道 Trivy 内部是如何运作的。如上图所示，有两个步骤；首先，我们运行 Trivy 命令，Trivy 将从 [NVD](https://nvd.nist.gov) 网站下载漏洞数据库到本地机器。然后， Trivy 利用漏洞数据扫描你的镜像的每一层（Layer）。

## 实践 Trivy

![trivy in pipeline](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/trivy-in-pipeline.6ksfsma323c0.png)

### Pipeline

现在我们已经知道 Trivy 是如何工作的，我们可以将它集成到我们的 Pipeline 中；首先，将代码构建到 Docker 镜像中，接下来，Trivy 会扫描上一步构建的 Docker 镜像； 如果没有漏洞，镜像会被推送到镜像注册中心并部署到 Test 或者 UAT 环境； 如果存在漏洞，Pipeline 会被 Trivy 的命令行打断退出，这时候你就需要修复漏洞以使 Pipeline 变绿通过。

### Trivy 的使用方法

在编写代码进行集成之前，我们必须知道如何使用 Trivy，Trivy 是一个二进制应用程序，所以我们可以在命令行中使用它。同时，Trivy 提供了它的 Docker 镜像，所以我们可以很容易地在 Pipeline 上设置和使用。命令如下，对于这个命令，我们需要重点说明一些参数。

```shell
❯ docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy \
  image \
  --exit-code 1 \
  --ignore-unfixed \
  --severity HIGH,CRITICAL ${YOUR_IMAGE}
```

* -v /var/run/docker.sock:/var/run/docker.sock 如果想扫描本地主机上的镜像，需要挂载 docker.sock
* --ignore-unfixed 忽略未修复的漏洞问题；如果存在未修复的漏洞，Trivy 将忽略这些漏洞
* --severity 设置要扫描的漏洞级别
* --exit-code 发现漏洞时 Trivy 的退出状态（默认值：0)； 在 Pipeline 中，如果将该值设置为 1，且有漏洞被发现，则 Pipeline 将退出，而不会继续运行。如果将其设置为 0，则 Pipeline 将继续运行，但会报告结果。所以，如果你想在发现漏洞后阻止 Pipeline 继续执行，可以设置它为 1。

想了解更多关于参数和使用方法的信息，请访问 Trivy 的官方网站：[https://github.com/aquasecurity/trivy](https://github.com/aquasecurity/trivy)。

### Demo

下面是一个 Demo，展示了 Trivy 如何打断 Pipeline 的执行 ，以及当我们修复问题后又发生什么。该项目将构建一个 Buildkite Dashboard（Buildkite 是一个 CI/CD 平台），它将过滤出你指定的组织下的项目的构建信息。这里我们使用 GitHub Actions 来构建这个应用程序，并在 Pipeline 中集成 Trivy，代码如下：

```yml
- name: Trivy scanner
  run: |
      docker run --rm \
      -v /var/run/docker.sock:/var/run/docker.sock \
      aquasec/trivy image \
      --severity HIGH,CRITICAL \
      --exit-code 1 \
      dashboard:${{ github.sha }}
```

在这个 Job 中，我们使用 [Nignx:1.18](https://hub.docker.com/_/nginx) 作为基础镜像来构建应用程序镜像。可以看到由于存在一些漏洞，本次构建失败了。

![Trivy Dashboard Failed](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/trivy-dashboard-failed.4bffhau2xvk0.png)

现在，我们必须解决这个问题来达到持续交付目的。这里有两个步骤要做，首先，我们应该使用最新的 Nginx 镜像作为基础镜像；其次，我们可以忽略未修复的漏洞，因为我们可能无法在系统级别修复某些最新的漏洞。你可以通过如下链接查看修复该问题的代码更改；
https://github.com/guzhongren/Buildkite-Dashboard/commit/90182b9b3770aeb28a6e566208334dd0c6f8f725#annotation_843974303

![Trivy Dashboard Successfully](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/trivy-dashboard-successfully.28w37b5otts0.png)

## 总结

无论你在哪里，安全都是一个非常重要的问题。我们可以将 “__安全左移（Shift Left Security）__”，这样就可以减少生产环境中的安全风险；对于扫描工具 Trivy 来说，它对于保证镜像的安全性非常有用，它不仅可以扫描镜像，还可以扫描 Git 仓库，文件系统等。

最后，非常感谢同事张思楚、王亦晨和邢砚敏等人的大力支持和指导，在他们热心帮助和辛苦付出之下才有了这篇文章。

## Refs

* [https://www.sonarqube.org/](https://www.sonarqube.org/)
* [https://hub.docker.com/r/aquasec/trivy#ignore-unfixed-vulnerabilities](https://hub.docker.com/r/aquasec/trivy#ignore-unfixed-vulnerabilities)
* [https://github.com/marketplace/actions/aqua-security-trivy](https://github.com/marketplace/actions/aqua-security-trivy)
* [https://github.com/quay/clair](https://github.com/quay/clair)
* [https://github.com/aquasecurity/trivy](https://github.com/aquasecurity/trivy)
* [https://github.com/anchore/anchore-engine](https://github.com/anchore/anchore-engine)
* [https://github.com/quay/quay](https://github.com/quay/quay)
* [https://cloud.google.com/container-registry](https://cloud.google.com/container-registry)
* [https://goharbor.io/blog/harbor-1.10-release/](https://goharbor.io/blog/harbor-1.10-release/)
* [https://www.thoughtworks.com/radar/tools?blipid=201911077](https://www.thoughtworks.com/radar/tools?blipid=201911077)
* [https://cve.mitre.org/index.html](https://cve.mitre.org/index.html)
[https://nvd.nist.gov](https://nvd.nist.gov)
* [https://blog.aquasec.com/trivy-vulnerability-scanner-joins-aqua-family](https://blog.aquasec.com/trivy-vulnerability-scanner-joins-aqua-family)
* [https://guzhongren.github.io/](https://guzhongren.github.io/)

## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/扫码_搜索联合传播样式-白色版。ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此 [文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig) 进行校验： `gpg --verify PayForGuzhongren.svg.sig`

