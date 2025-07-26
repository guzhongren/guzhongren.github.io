# 依旧免费使用 Docker Desktop 的方案


## 缘由

[Docker](https://www.docker.com/) 公司在 2021 年 8 月更新了 Docker Desktop 的 [使用条款](https://docs.docker.com/subscription/#docker-desktop-license-agreement)，决定对大企业（员工超过 250 人或者年收入超过 1 千万美元）用户（包含员工的个人性质使用）开始执行收费订阅的策略，于 2021 年 8 月 31 日生效，同时，给了使用者一个缓冲时间，延续到 2022 年 1 月 31 日，在此之前可以继续免费使用。

很明显，开源公司在这个伸手的年代活不下去了，还有最近比较火的 [Facker.js](https://github.com/Marak/Faker.js) 删库事件。对删库这事多说几句，因为自家火灾，作者房子被烧了，然后他想让使用自己辛辛苦苦免费维护的 Facker.js 的这些商业公司来为自己捐款改善自己的生活环境，并继续维护 Facker.js, 但很多公司不鸟他，他只能删库来抱怨。要说呀，用这些库的人的人都是开发者，安装完你开发的库，然后就开开心心的写代码去了，除非不会用的库，不然没人去看你的 README 的。更何况你仓库边上的捐款信息。

## 问题

如果你现在下载最新的或者旧版的 Docker 安装包，安装包的使用条款都已经被悄悄的动了手脚，里面的 Liscense 的条款已经有了上面说的内容了。所以说你还是会被要求收费的。除非你在一个小公司，人数和收入不在条款之内，那你就开心的用吧。

但是还有一部分人就在这个条款的要求范围之内了。

> 安全无小事。

> 雪崩的时候，没有一片雪花是无辜的。

市面上还是有不少 Docker 的替代方案，比如 [podman](https://github.com/containers/podman), [lima](https://github.com/lima-vm/lima) 和 [colima](https://github.com/abiosoft/colima), 但用起来却没有 Docker 这么流畅，舒服。

## 解决方案

使用 2021 年 8 月 30 日之前的任何版本都是可以的，所以下载之前的旧版并且不升级就可以了。

### 安装旧版 Docker Desktop

我在百度网盘有备份 Mac 版 3.5.2 版本的 Docker Desktop 副本，可以下载安装。

> 链接：https://pan.baidu.com/s/1nmJezbYx8BmexK6eVXihtg 提取码：gedn

如果觉得慢，恰好我也有空，我可以将我本地的副本直接隔空给你。

### 验证安装的 Docker 副本的修改时间

```shell
    ~/Downloads                                                                               19:54:48 
❯ ls -al /Applications/Docker.app/Contents/Resources/LICENSE.rtf /Applications/Docker.app/Contents/MacOS/Docker
.rwxr-xr-x zhongren.gu admin 16 MB Thu Jul  8 01:58:59 2021  /Applications/Docker.app/Contents/MacOS/Docker
.rw-r--r-- zhongren.gu admin 19 KB Thu Jul  8 01:59:00 2021  /Applications/Docker.app/Contents/Resources/LICENSE.rtf

```
可以看到，两个文件最后的修改时间是 2021 年 6 月 8 日，在 2021 年 8 月 30 日之前，所以是符合我们的要求的。

### 禁止 Docker 升级

安装完旧版的 Docker 之后，要禁止 Docker 升级，这样，Docker 的使用条款就永远是旧的，Docker 的律师也拿你没办法喽。

在这通过命令行修改 host 文件，使 `desktop.docker.com` 指向 `127.0.0.1`, 不然 Docker 升级服务访问真正的 Docker 服务器。

```shell
echo '127.0.0.1 desktop.docker.com' | sudo tee -a /etc/hosts
```
### 验证未升级

![docker.desktop.3.5.2.66501](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/DevOps/docker.desktop.3.5.3.66501.4nfe3o7foow0.webp)

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)


## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此 [文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig) 进行校验： `gpg --verify PayForGuzhongren.svg.sig`

