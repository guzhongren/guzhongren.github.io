---
title: "Config ssh to Keychina"
date: 2020-01-22T15:07:49+08:00
draft: false
author: "谷中仁"
authorLink: "https://guzhongren.github.io"
description: ""
license: "Creative Commons Attribution 4.0 International license"
tags: ["ssh", "keychain", "linux", "ssh-add"]
categories: ["tool"]
featuredImage: "https://images.pexels.com/photos/2881785/pexels-photo-2881785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
---

## 将生成的ssh 私钥添加到 Mac 的keychain 中， 如果是其他操作系统，可忽略此步骤

```shell
$ ssh-add -K .ssh/is_rsa
```
## 将登录信息配置到.ssh/config中

```shell
$ touch ~/.ssh/config
$ vim ~/.ssh/config
# edit text
Host myvm
  Hostname ip
  User user
```

## 保存之后就可以使用如下命令快捷登录服务器了

```
$ ssh myvm
```

## 参考地址

<https://blog.infox.ren/2019/10/24/ssh-guide/>


----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/扫码_搜索联合传播样式-白色版.ae9zxgscqcg.png)
