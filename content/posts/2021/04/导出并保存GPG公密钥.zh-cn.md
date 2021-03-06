---
title: "导出并保存GPG公密钥"
date: 2021-04-10T20:12:25+08:00
draft: false
author: "谷中仁"
authorLink: "https://guzhongren.github.io"
description: ""
license: "Creative Commons Attribution 4.0 International license"

tags: ["GPG", "公钥", "密钥", "保存", "Auth", "security"]
categories: ["Auth"]
featuredImage: "https://images.pexels.com/photos/2881785/pexels-photo-2881785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
images: [""]
---

## 简介

GPG 是开源免费的身份验证工具，简单一句话就是对于公钥使用者可以和密钥拥有者秘密通信;对于密钥使用者，可以像外界证明某句话是你说的；在现实场景中，你可以写了一份信，但是大家怎么知道这份信是你写的呢？如果你身边有熟悉你的人，那TA可以通过你的笔迹或者你家生产的信纸来知道这份信是你的，但是对于别人呢？他们对你不了解，所以他们很难证明：你就是你？

在程序的世界里，你身边都是陌生人，怎么证明你就是你？一般都使用公钥私钥的非对称加密算法。在网上有很多关于 GPG 和Github 结合的说明，比如 [GitHub 官网的Doc](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification); 最重要的另一件事是备份你的公钥和密钥。

## 备份

### 列出公钥

```shell
❯ gpg --list-secret-keys --keyid-format LONG
/Users/c4/.gnupg/pubring.kbx
----------------------------
sec   rsa4096/XXXXXXXXXXXXXX 2021-04-10 [SC]
      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
uid                 [ 绝对 ] user(仅用来签名git, message) <user@email.com>
ssb   rsa4096/202XXXXXXXXXXXXX 2021-04-10 [E]

```

sec 下面的第二行 也就是所有字符都是X的那一行就是 keyId;


### 导出公钥

```shell
❯ gpg -a -o public-file.key --export keyId

```
> -a 为 --armor 的简写，表示密钥以ASCII的形式输出，默认以二进制的形式输出；

> -o 为 --output 的简写，指定写入的文件；

导出会有一个 `public-file.key` 在当前目录下生成，里面存放你的公钥。

### 导出私钥

```shell
❯ gpg -a -o private-file.key --export-secret-keys keyId
```

导出一个私钥 private-file.key.

### 导入公钥私钥

```shell
❯ gpg --import xxxx.key

```
xxxx.key 可以是公钥，也可以是私钥。


### 保存

公钥可以放在自己的网站或者信任的服务器上，但是私钥一定要自己保管，千万千万不能泄漏出去。否则在计算机的世界里，人人都可以是你。


推荐将你的公钥和私钥都保存在像`1password`, `lastpassword` 或者`Bitwarden`里，我用的是 `bitwarden`; 因为不能存文件，只能将公钥和私钥的内容复制并拷贝进去。但效果是一样的。

#### 缓存

在设置了强密码的前提下， 我们可以稍微的牺牲一些安全性， 通过配置gpg-agent的 default-cache-ttl， 让我们解密后的私钥在内存中存在的时间稍微长一些（默认10分钟）， 比如， 一天：

```shell
#~/.gnupg/gpg-agent.conf

default-cache-ttl-ssh 86400

max-cache-ttl-ssh 86400
```

## 分发

将公钥发送到CA管理中间机构，方便别人验证。

```shell
❯ gpg -k
/Users/c4/.gnupg/pubring.kbx
----------------------------
pub   rsa4096 2021-04-11 [SC]
      3D4DC54CDDA6FAFDD13A4970D18Axxxxxxxxxx
uid           [ 绝对 ] guzhongren (used for git&message) <guzhongren@live.cn>
sub   rsa4096 2021-04-11 [E]


❯ gpg --send-key 3D4DC54CDDA6FAFDD13A4970D18Axxxxxxxxxx
```
## ⚠️ 注意

你的私钥差不多就是计算机世界里的另一个你，所以，把你自己保护好。

## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)


## Statement（特此申明）

本文仅代表个人观点，与[Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/扫码_搜索联合传播样式-白色版.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`
