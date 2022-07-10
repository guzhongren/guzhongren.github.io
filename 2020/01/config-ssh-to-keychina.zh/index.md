# Config ssh to Keychina


## 将生成的 ssh 私钥添加到 Mac 的 keychain 中， 如果是其他操作系统，可忽略此步骤

```shell
$ ssh-add -K .ssh/is_rsa
```
## 将登录信息配置到。ssh/config 中

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
![谷哥说-微信公众号](https://cdn.staticaly.com/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)

