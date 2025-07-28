# 解决Podman未挂载Volume的问题


## 问题

在初次使用[podman](https://podman.io/) 挂载本地文件系统的时候通常会报如下的一个错误提示；

> Error: statfs /Users/userName/yyy/xxx: no such file or directory

## 解决方案

为 Podman 虚拟机挂载 $HOME 目录并且重启 podman machine 即可。

```sh
podman machine stop podman-machine-default
podman machine rm podman-machine-default
podman machine init -v $HOME:$HOME
podman machine start
```

## 测试

运行如下命令，可以在命令行里看到本机的目录和文件。
```sh
podman run -ti --rm -v $HOME:$HOME busybox
```

## Add one

如此这样，以后在需要挂载特定目录时，只需要和 docker 的操作一样，只须挂载特定目录即可。

## 引用

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [podman](https://podman.io/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

