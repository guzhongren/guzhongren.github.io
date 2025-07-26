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
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)

