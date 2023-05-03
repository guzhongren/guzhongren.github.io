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

## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [podman](https://podman.io/)

## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

