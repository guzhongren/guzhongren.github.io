# 使用 Cypress 创建测试镜像并完成 E2E 测试


## 缘由

最近在做一个 Buildkite 的 Dashboard 的项目 [Powerboard](https://github.com/guzhongren/Powerboard)，项目是托管在 GitHub 的 Git Pages 上的；项目只是一个纯前端项目，且 E2E 测试是用 [Cypress](https://www.cypress.io/) 构建的；如果要进行 E2E 测试一般情况都是对着部署在 Git Pages 上的网站直接测试，而且也是这么做的😄。

## 痛点

### 测试滞后

这么做肯定是有问题的，产品都上线了才做测试，肯定已经迟了；如果程序有问题，那么就会影响所有用户。这种情况应该算是 P1 级别的产品事故，对用户来说简直就是灾难。应该在部署之前就应该完成 E2E 测试，如果测试通过不了，就不应该部署代码。所以测试应该前移。

## 解决方案

由于我们的测试需要自动化，需要在 Pipeline 上执行，所以必须是一个可以独立运行的程序和 Cypress 程序同时运行，并最终返回测试结果，由 Pipeline 来决定是否终止 Pipeline 运行。

在 GitHub Actions 的 Pipeline 上同时运行程序只能依靠 `docker-compose`, 在这我们可以使用 Cypress 官方出品的 [cypress/included](https://hub.docker.com/r/cypress/included), 通过编排程序来进行测试。

### cypress/included

cypress/included 可以让我们挂载 cypress 的测试脚本，然后自动执行，并在最终返回 Linux 命令状态值，如 0 ， 非 0 值。

### Docker-compose

[Docker-compose](https://docs.docker.com/compose/) 是一套容器编排工具，可以很轻松的管理容器的启动顺序等。在本地项目搭建中非常有用，比如构建数据库，执行 shell/yaml lint 等。

## 执行方案

### 构建应用镜像

在测试之前需要将应用构建好并部署好，我们可以用 Node 镜像打包应用，并利用容器的多阶段构建 ([multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)) 完成应用轻量化构建，并部署在 [Nginx](https://hub.docker.com/_/nginx) 中。

```yaml
FROM node:17-alpine as distPackage
COPY ./ /app
WORKDIR /app
RUN yarn
RUN yarn build

FROM nginx:latest
COPY --from=distPackage /app/dist /usr/share/nginx/html
```

### 编排 service

因为我们的程序需要在测试的时候就要部署好，所以我们可以利用 Docker-compose 的 [build](https://docs.docker.com/compose/compose-file/compose-file-v3/#build) 参数，在容器启动时构建应用并部署。并在 cypress/included 启动是执行测试命令 `npx cy:docker`, 具体就是`cross-env ENV=docker cypress run --spec 'cypress/integration/dashboard.spec.js`。

```yaml
version: '3'
services:
  web:
    build:
      context: ./
      dockerfile: ./Dockerfile
    container_name: web
    restart: always
    ports:
      - '80:80'

  e2e:
    image: cypress/included:9.2.1
    container_name: cypress
    depends_on:
      - web
    environment:
      - CYPRESS_baseUrl=http://web
      - ENV=docker
    command: npx cy:docker
    working_dir: /e2e
    volumes:
      - ./:/e2e

```

这样我们就可以独立的运行起真实程序和正式的测试程序了，具体的 Pipeline 可以参考 Powerboard 的 [Workflow](https://github.com/guzhongren/Powerboard/blob/main/.github/workflows/main.yml)。

```yml
      - name: E2E
        run: |
          docker-compose up --build e2e

```

## 总结

`Docker-compopse` 有很好的应用编排能力，可以很轻松的构建多服务程序；并在构建应用的时候可以使用多阶段构建来优化镜像大小。使用 `Cypress` 可以提高开发效率并可在 `Pipeline` 上保证程序的正确性。

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Cypress: https://www.cypress.io/](https://www.cypress.io/)
* [cypress/included: https://hub.docker.com/r/cypress/included](https://hub.docker.com/r/cypress/included)
* [GitHub Actions: https://docs.github.com/en/actions](https://docs.github.com/en/actions)
* [Powerboard: https://github.com/guzhongren/Powerboard](https://github.com/guzhongren/Powerboard)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)


## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此 [文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig) 进行校验： `gpg --verify PayForGuzhongren.svg.sig`

