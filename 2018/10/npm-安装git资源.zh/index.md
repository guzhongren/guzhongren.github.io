# Npm 安装 git 资源

## 引言

我们大多数情况下用到的包都是存放在 [npmjs.com](https://www.npmjs.com/) 这个网站上的，只要我们安装了 Node，我们就可以使用 Node 自带的 npm 包来下载你需要的包；但有时候我们想让我们自己的包或者库私有，哪怎么办呢？很多人就会想到自己搭一个私服，比如 [Nexus Repository Manager ](https://oss.sonatype.org/#Documentation) 和 [sinopia](https://github.com/rlidwka/sinopia);　虽然搭建起来不是很困难，尤其是 sinopia 就是一个 npm 包，安装灰常简单，但是都需要一台服务器，一台服务。.. 一台服。.. 一台。.. 一。..

现在大多数公司肯定有自己的 git 仓库了，[没有到 git？说明你们技术太 XXX 落后] 那么我们何不利用 git 仓库来存放我们的各种 lib 呢？

## 传统方式
> 前事不忘，后事之师。先来复习一下怎么从 npmjs.com 获取包。[这句是我说的]

```shell
$ npm install XXX
...
```

## git 仓库

假如你已经做了一个特别牛逼的库，但是因为只是公司内部使用，比如一些工具库，放出去比如放到 npmjs.com 上没任何意义的，你可以把这个库整理成一个 git 的 repo, 当然打个标签，发个各版本什么的那就更好了。当你把你牛逼的库放在你司的 git 上后，比如地址是 ***ssh:git.niubi.com/yourName/niubility.git***　或者　***https://git.niubi.com/yourName/niubility.git***, 接下来就是发大招。

## 大招

```shell
$ npm install git+ssh:git.niubi.com/yourName/niubility.git
...
**#或者**
$ npm install git+https://git.niubi.com/yourName/niubility.git
...

```

## 隐藏技能 [不推荐]

### 用户名方式

如果你将 npm 注册到自己的 git 仓库，就可以直接省去域名等一切能定位到该 lib 的的通用信息。

#### 注册及登录

```shell
$ npm adduser --registry http://you.domain.com
...
$ npm login --registry http://you.domain.com
...
```

#### 安装

```shell
$ npm install yourName/niubility
...
```

## 恩，没什么可说的了我真是来测试打赏功能的。

## 引用

* [1. 博客：https://guzhongren.github.io/](https://guzhongren.github.io/)
* [2. 图床：https://sm.ms/](https://sm.ms/)
* [3. 原文：https://yq.aliyun.com/articles/655108?spm=a2c4e.11155435.0.0.3c783312bi9tbU](https://yq.aliyun.com/articles/655108?spm=a2c4e.11155435.0.0.3c783312bi9tbU)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)

