# The Solution of Git Adding GPG Sign Failed



1. 因为我对我的所有的 git commit 都开启了签名，而且每次 GPG 签名的最长缓存时间我设置成了 1 天， 所以过了今天明天就得重新输入密码了, 这估计是个无解的问题，除非我生成没有密码的 GPG 密钥对。

2. 同时，在我本记会出现另一个问题，就是签名失败。

```shell
error: gpg failed to sign the data
fatal: failed to write commit object
```

解决方法其实很简单，将 `export GPG_TTY=$(tty)` 这个加入你的shell 启动文件里就可以了， 我这是 `.zshrc`, 然后使之生效。

```shell
source ~/.zshrc
```






## Reference

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [图床:https://sm.ms/](https://sm.ms/)

## Hereby declared（特此申明）

本文仅代表个人观点，与[ThoughtWorks](https://www.thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](/images/wechat/扫码_搜索联合传播样式-标准色版.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

