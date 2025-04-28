# MacOS 使用指纹解锁 Sudo 密码


## 出发点

我们平时用Mac电脑进行命令行操作的时候，可能需要使用`sudo` 进行操作，那么就得输入密码。但在Mac系统上，我们通常用指纹来作为密码管理器。

其实我们可以通过简单的配置就可以实现。

## 解决步骤

- 编辑文件

```sha
sudo vim /etc/pam.d/sudo
```

- 在文件最前面加入如下代码
```text
auth       sufficient     pam_tid.so
```

- `wq!` 保存推出即可。

## 总结

配置即生产力。

## 引用

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

