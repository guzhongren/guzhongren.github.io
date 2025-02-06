# Container Image Scanner - Trivy

## Abstract

In modern software development, we leverage public images as base images to build up applications images quickly and deploy them into the production environment.

With more and more applications containerized, container security is also becoming more important. To use vulnerability scanners, we can bring forward the security feedback cycle which is traditionally done towards the end. This aligns closely with our belief that by adopting agile, we will be able to get faster feedback. This is what we are doing in order to achieve it.

## Pain points on application environment security

![Pain points on application environment security](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/Group%2052.5gp1z5ybbps0.png)

Now, we use advanced technology to build up our application, like NodeJS, Java and so on,  then store the code repository on git platforms like GitHub, Gitlab and so on. Code repository consists of our code and dependencies; For dependencies, we can use tools to ensure security like npm audit of NodeJS, and Dependabot of GitHub; And for our business code, there is another security tool to scan, like [SoneQube](https://www.sonarqube.org/).

So, for the dependencies and our business code, those things are under our control, we can ensure the application’s security and get fast feedback and build confidence by using all kinds of tools before we deploy our application into the production environment. As you know, the basic system environment which our application runs is out of our control. Let’s consider from the opposite side, if we can’t ensure the security of our application and its system environment, it will lead to unexpected problems, like hackers attack, leakage of user information, property loss, what's more, cause damage to the reputation of the company. So, it is important to ensure the security of our product.

## The value of keeping container image secure

### Protect the client's property and reputation

We supply professional services for our client, so we must ensure every line of code is reliable and secure. Because code is property and reputation. For ourselves, just ensure the security of code, and the environment of application, the client can achieve the maximum benefit.

### Build our respected brand

The work we do is to make our clients succeed. Only if our customers succeed, we can succeed. So, we did not only archive business value, but also protect the security of the product.

## Best 2 solutions to keep container images secure

![Best 2 solutions to keep container images secure](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/Group%2050.1czb512thukg.png)

### Solution 1: Scan the image at a regular time in the image registry

In this way, we need to add a security scanner for the images' registry. The scanner might be a cron job or an operable step that can be triggered by the operator.

It will be automatically triggered by a cron job when a special time. For example, docker hub scans their official registry at a special time, it will send an alert to the organizer when there are any vulnerabilities.

### Solution 2: Integrate the scanner within your CI/CD pipeline

In another way, we can scan the image product in the pipeline, it is more simple and efficient. The pipeline will automatically execute the command that scans the image when we push code to the code repository.  Because the pipeline scans the product mechanically for every time, so we can find any security problem and fix it in time.

Now, more and more teams or groups use agile to develop their projects. If we can find any vulnerabilities as early as possible, we can reduce the risk of the product before the product is published. The pipeline is a good tool to ensure the security of your product every line of code because it can automatically execute when you commit your code.

## Container image scanner comparison

For the above solution, we surveyed several scanner tools, like [Trivy](https://github.com/aquasecurity/trivy),[Claire](https://github.com/quay/clair), [Anchore Engine](https://github.com/anchore/anchore-engine), [Quay](https://github.com/quay/quay),[Docker Hub](https://hub.docker.com/) and [GCR](https://cloud.google.com/container-registry). We made a comparison from different dimensions.

|Scanner|OS packages|Application dependencies|Easy to use|Accuracy|Suitable for CI|Suitable for Solution|
|:--|:--|:--|:--|:--|:--|:--|
|Trivy|✅|✅|⭐ ⭐ ⭐|⭐ ⭐ ⭐|⭐ ⭐ ⭐|2
|Clair|✅|❌|⭐ |⭐ ⭐ |⭐ ⭐ |2
|Anchore Engine|✅|✅|⭐ ⭐|⭐ ⭐|⭐ ⭐ ⭐|2
|Quay|✅|❌|⭐ ⭐ ⭐|⭐ ⭐ |❌|1
|Docker Hub|✅|❌|⭐⭐⭐|⭐|❌|1
|GCR|✅|❌|⭐ ⭐ ⭐|⭐ ⭐ |❌|1

Firstly we can separate those scanners into 2 parts suitable for solution, the Trivy, Clair, Anchore Engine, and Quay are suitable for solution, the others are suitable for solution 1.

For the first dimension: OS package, those scanners can do it, but for the second dimension: Application dependence, just only Trivy and Anchore engine can do it, and for the fifth dimension is it suitable for ci; only the first three left.

For the Trivy, Clair, and Anchore Engine, the communities of these three are very active, so we could not care about anyone to solve your issues; And as a tool, it must be easy to use and there is good documentation to reference. The documentation of Trivy is very detailed and very friendly. But for the vulnerability database, Clair ingests vulnerability metadata at regular intervals from a configured set of sources and stores the data in its database. Trivy and Anchore Engine will download the latest vulnerability metadata and cache it in a local file,
it will check the update to keep the metadata latest when the tool runs again. At the same time, the usage of Trivy is more friendly, because we can filter the different severity which you can specify, but it is not allowed for Anchore Engine.

March 16, 2020, Aqua Security, the leading platform provider for securing cloud-native applications and infrastructure, announced today that its open-source Trivy vulnerability scanner is being added as an integrated option in widely used cloud-native platforms, CNCF’s Harbor registry and Mirantis Docker Enterprise.  You can find this post [here](https://blog.aquasec.com/trivy-vulnerability-scanner-joins-aqua-family).

## Trivy in Thoughtworks Technology radar volume 23

![Trivy in TW tech radar](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/trivy-tw-radar.2543ysqo6wf4.png)

Thoughtworks Technology Radar is famous for accurately responding to technological trends; In the latest technology radar, Thoughtworks put the Trivy into the __adopt__ area, which means Trivy is useful, valuable and practicable.

## Inner working of Trivy

![Inner working of Trivy](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/Group%2051.4icjkydqu3s0.png)

Before we use Trivy, we need to know how Trivy works inside. As you see, there are 2 steps; first, we run the Trivy command, Trivy will download the vulnerability DB from the [NVD](https://nvd.nist.gov) website into the local machine. And then Trivy uses the vulnerability data to scan every layer of your image.

## How To Use Trivy

![trivy in pipeline](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/trivy-in-pipeline.6ksfsma323c0.png)

### Pipeline

Now we have to know how Trivy works inside, we can integrate it into our pipeline; you can see this pipeline, first, we build code into docker image, next, Trivy will check the vulnerabilities in the docker image that build from the last step; if there is no vulnerability, the image will be pushed to the image registry and deploy it to the production environment. If there are some vulnerabilities, the pipeline will be broken by the Trivy command line, you need to fix the vulnerability to make the pipeline green.

### Usage of Trivy

Before we write code to integrate, we have to know how to use Trivy. As we know, Trivy is a binary application, so we can use it in the command line. At the same time, Trivy provides its docker image, so we can easily setup it and use it, the command is as follows. For this command, we need to highlight some parameters.

```shell
❯ docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy \
  image \
  --exit-code 1 \
  --ignore-unfixed \
  --severity HIGH,CRITICAL ${YOUR_IMAGE}
```

* -v /var/run/docker.sock:/var/run/docker.sock  If you would like to scan the image on your local host machine, you need to mount docker.sock
* --ignore-unfixed Ignore the unfixed issue of vulnerability; If there are some unfixed vulnerabilities, trivy will ignore those vulnerabilities
* --severity Set the vulnerability level which you want to scan
* --exit-code Status of trivy when vulnerabilities were found (default: 0). In the pipeline if you set the value to 1, the pipeline will exit and not run continually if you set it to 0, the pipeline will continually run but report the result. So, if you wanna break the pipeline, you can set it to 1.

For more information about the arguments and other usages with different ways, please visit the website of Trivy organization by this link: [https://github.com/aquasecurity/trivy](https://github.com/aquasecurity/trivy).

### Demo

Below is a demo to show how the trivy breaks the pipeline and what happens when we fix the issues; This project is about to build a Buildkite dashboard, it will filter the built information of your organization which you specify. We use Github actions to build application and setup the Trivy in the pipeline;

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

In this build job, we use [Nignx:1.18](https://hub.docker.com/_/nginx) as a base image to build application images. This build failed because there are some vulnerabilities.

![Trivy Dashboard Failed](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/trivy-dashboard-failed.4bffhau2xvk0.png)

Now, we must fix this issue to continue delivery. There are 2 steps to do, firstly, we should use the latest Nginx image as a base image; secondly, we could ignore unfixed vulnerabilities, because maybe we are unable to fix vulnerabilities at the system level. You can review the change of code by clicking this link:
[https://github.com/guzhongren/Buildkite-Dashboard/commit/90182b9b3770aeb28a6e566208334dd0c6f8f725#annotation_843974303](https://github.com/guzhongren/Buildkite-Dashboard/commit/90182b9b3770aeb28a6e566208334dd0c6f8f725#annotation_843974303)

![Trivy Dashboard Successfully](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/trivy-dashboard-successfully.28w37b5otts0.png)

## Summary

Security is a very important issue no matter where you are. We can __Shift Left Security__, so we can reduce the security risk in the production environment; For the scanner tool Trivy,  it is very useful to keep the security of images, it can scan not only images but also git repositories, file systems, etc.

## 引用

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

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/扫码_搜索联合传播样式-白色版。ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此 [文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig) 进行校验： `gpg --verify PayForGuzhongren.svg.sig`

