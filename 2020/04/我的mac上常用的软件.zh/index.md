# 我的Mac上常用的软件


> 软件常用常新，软件大多的目的都是效率，办公，沟通，和娱乐等。虽说Mac 也有自己的时间机器，可以随时将新机器回复到旧机器上，但是作为分享和传播，那么写一篇文章那是最有效率的了，也可为自己后期使用做备份。
> 最近由同事的一个脚本启发，特制做了我自己 Mac 电脑上必备的一些软件的快速安装脚本；程序员的本质就是将一切事物简单化，代码化...化； 地址如下, 欢迎提PR：
> [awesome-setup: https://github.com/guzhongren/awesome-setup](https://github.com/guzhongren/awesome-setup)

接下来，我将按照生产力，效率,沟通和娱乐这几类将我Mac上的常用软件列个清单。

# 生产力

## [Visual Studio Code](https://code.visualstudio.com/)

![Visual Studio Cod](https://code.visualstudio.com/assets/home/home-screenshot-mac-lg-2x.png)

从严格意义上来说，VSCode并不算IDE，但是其设计与插件系统非常完美，作为前端起家的我，只要能写代码我就可以创造世界，估计以后还有一篇写插件的博客。

* 轻量
* 插件系统非常完善
* 绝大多数编程语言都支持

## [Vim](https://www.vim.org/)

![Vim](https://www.vim.org/images/vim_header.gif)

作为程序员开发必备利器！

* 装逼利器
* 学习Linux的必备工具
* 高效编码的工具
* 任何Linux版本都有的编辑器
* 定制化程度非常高
* ......
![My vim](https://pic4.zhimg.com/80/v2-9e69dc4ead341789600ae4a46b11442a.png)
在此推荐我的定制的vimrc,[地址在这](https://github.com/guzhongren/.vim),

## [iTerm2](https://iterm2.com/)

![iTerm2](https://iterm2.com/img/logo2x.jpg)
Mac 上非常好用的终端，安装之后自带zsh, 而zsh又自带各种好用的快捷方式，比如简化的git命令，zsh的自动补全等插件

* 界面简洁
* 自定义配置程度比较高
* 可搭配不同的命令行主题，在此推荐[powerlevel10k](https://github.com/romkatv/powerlevel10k)
* 真的比Mac自带的终端好用啊 😄

## [IDEA](https://www.jetbrains.com/idea/)

![IDEA](https://www.jetbrains.com/idea/img/screenshots/idea_overview_5_1.png)

Java开发必备

## 备忘录

备忘录可以随时打开做笔记，记录重要的内容，当然和iPhone配合使用会更高效。主要就是使用自己制作的快捷指令，我的主要有两个，一个是`Copy and Paste`, 顾名思义，将复制的内容粘贴到备忘录中；第二个`顺便记`，这个快捷指令会将语音内容转化为文字并将其追加到备忘录中。

使用这两个快捷指令，将非常高效，比如平时记录零碎的知识点，重要的总结内容等。

## [XMind](https://www.xmind.net/)

![XMind](https://assets.xmind.net/www/assets/images/home/home-hero-ui@2x-f649b7aa98.png)

思维导图界的翘楚，当然需要付费。

* 界面简洁赶紧
* 功能简单但丰富
* 主题多样，市面上99%的导图类型都实现了
* 主题真的很好看
* 可跨平台使用

## [Adobe XD](https://www.adobe.com/cn/products/xd.html)

![Adobe XD](https://www.adobe.com/content/dam/cc/us/en/creative-cloud/xd.svg)

传统图像大厂Adobe产品，结合 Adobe 全家桶使用应该很爽，需要注意的是在国内，XD不可以使用在线存储服务，所以在注册时记得将地区选择为其他地区，推荐美国🇺🇸，

* 使用简单，免费，相比与Sketchup, 这点还是很诱人的
* 中文文档做的也不错
* 插件系统也不错，可与Trello等工具结合
* 矢量图形编辑也非常不错

## [jsonpp](https://github.com/jmhodges/jsonpp)

json_pp 我主要是用来格式化 curl 命令行的结果，例如测试某个 restful 接口，返回的 json，在命令行就会自动给你格式化好输出，

### 安装

```shell
brew install jsonpp
```

# 效率

## [Bitwarden](https://bitwarden.com/)

![Bitwarden](https://bitwarden.com/images/hero.png)

用来存储和生成密码的工具

* 开源
* 免费 (有商业版)
* 支持两步验证(2FA)
* 可按条件生成随机密码(我从来不记我的密码，而且我也记不住)
* 多端支持
* 可自定义数据存储方案
* 可自动填充账号密码

## [Microsoft Todo](https://todo.microsoft.com/tasks/)

![Microsoft Todo](https://to-do-cdn.microsoft.com/static-assets/c87265a87f887380a04cf21925a56539b29364b51ae53e089c3ee2b2180148c6/icons/logo.png)

微软收购了Wunderlist, 然后推出了桌面版，Web版，Mobile(Apple, Android), Pad版的Todo应用，我比较看好的功能

* 只需一个 Microsoft 账号就可以在各个终端进行数据同步
* 界面清新简洁
* 可自定义分组，分类
* 可自定义背景图片
* 可与其他人共享Todo
* 最重要的是可以在每一个Todo里定义子Todo

## Itsycal

[Itsycal](https://www.mowglii.com/itsycal/itsycalbanner2@2x.png)

Mac自带的顶部的日历其实有点不好用，如果你要看你的日程，那么你需要点开日历，而且他的时间格式其实也不是很友好（对于定制党）；Itsycal 很好的解决了这个问题。

### 安装

```shell
brew cask install itsycal
```

# 沟通

## 微信

![微信](https://i.loli.net/2020/04/01/IeZ5T6VYBHD8dxU.jpg)
不管是亲朋还是同事沟通，微信都是非常高效的工具，而且微信里面的小程序现在可以运行在桌面端了，使用场景也越来越多了；还有一个非常好用的功能：截屏！ 以前电脑上会安装QQ， 现在QQ也不用了，快速分享内容并标注微信是不二之选。

# 娱乐

##[IINA](https://iina.io/)

![IINA](https://iina.io/images/sc-sky.png)

> The modern media player for macOS.

* 开源，免费
* 支持多种资源播放（在线，本地文件，Youtube等）
* 界面简洁清爽
* 操作简单直观
* 字幕，视频大小可随意调节

# 工具

## 清理工具

[tencent-lemon](lemon.qq.com/)

### 安装

```shell
brew cask install tencent-lemon
```


## Reference

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Todo: https://todo.microsoft.com/tasks/](https://todo.microsoft.com/tasks/)
* [Visual Studio Cod: https://code.visualstudio.com/](https://code.visualstudio.com/)
* [Vim: https://www.vim.org](https://www.vim.org/)
* [Vimrc: https://github.com/guzhongren/.vim](https://github.com/guzhongren/.vim)
* [Bitwarden:https://bitwarden.com/](https://bitwarden.com/)
* [IDEA: https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)
* [微信:https://res.wx.qq.com/a/wx_fed/weixin_portal/res/static/img/3sPNXyP.gif](https://res.wx.qq.com/a/wx_fed/weixin_portal/res/static/img/3sPNXyP.gif)
* [IINA:https://iina.io/](https://iina.io/)
* [Adobe XD: https://www.adobe.com/cn/products/xd.html](https://www.adobe.com/cn/products/xd.html)
* [Itsycal:https://www.mowglii.com/itsycal/](https://www.mowglii.com/itsycal/itsycalbanner2@2x.png)

## Statement（特此申明）

本文仅代表个人观点，与[Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](/images/wechat/扫码_搜索联合传播样式-标准色版.png)

