# 将 Colima 设置为 TestContainer 的容器运行时


## 原因

根据 docker 公司的策略，Docker Engine 是需要收费的，而作为开源方案的 [Colima](https://github.com/abiosoft/colima) 作为很多开发者的首选方案；而在集成测试中，[TestContainer](https://testcontainers.com/) 是一个非常实用的临时数据库构建工具，可为集成测试提供数据库，为整个工程做测试保障。

但在基于 Colima 容器运行时的 TestContainer 运行却需要额外的配置，没有 Docker engine 那样直接。如果不做配置，我们经常会遇到一个问题“can't connect to host.docker.internal”，可以参考这个 [colima issue](https://github.com/abiosoft/colima/issues/902)。

这是由于在运行 TestContainer 的时候没有办法找到容器的 sock、host 等，同时需要禁用 TestContainer 用来控制新建容器的 sidecar 容器‘Ryuk’。

## 方案

需要将 DOCKER_HOST、TESTCONTAINERS_HOST_OVERRIDE、TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE 和 TESTCONTAINERS_RYUK_DISABLED 这些变量暴露在环境变量中，这样可以使 TestContainer 和 Colima 容器运行时链接，就可以正常运行集成测试了。

但，为了让这个配置生效，而不是每次在每个项目中手动配置，我们最好的方式是将其放置在 shell 运行的 profile 中，如 `.zshrc`。


```shell
export DOCKER_HOST="unix://${HOME}/.colima/docker.sock"
export TESTCONTAINERS_HOST_OVERRIDE=127.0.0.1
export TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE=/var/run/docker.sock
export TESTCONTAINERS_RYUK_DISABLED=true
```

如此这样之后，可通过 `source ~./zshrc`使其立即生效，或者新建一个 shell tab，从而激活这些环境变量。。

## 总结

Colima 的配置如此，基于 [Podman](https://podman.io/) 的方案也很简单，只需要保证 DOCKER_HOST、TESTCONTAINERS_HOST_OVERRIDE、TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE 和 TESTCONTAINERS_RYUK_DISABLED 的值被正确链接。

