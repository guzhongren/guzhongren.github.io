# The Solution of Git Adding GPG Sign Failed


1. 因为我对我的所有的 git commit 都开启了签名，而且每次 GPG 签名的最长缓存时间我设置成了 1 天， 所以过了今天明天就得重新输入密码了，这估计是个无解的问题，除非我生成没有密码的 GPG 密钥对。

2. 同时，在我本记会出现另一个问题，就是签名失败。

```shell
error: gpg failed to sign the data
fatal: failed to write commit object
```

解决方法其实很简单，将 `export GPG_TTY=$(tty)` 这个加入你的 shell 启动文件里就可以了， 我这是 `.zshrc`, 然后使之生效。

```shell
source ~/.zshrc
```

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

