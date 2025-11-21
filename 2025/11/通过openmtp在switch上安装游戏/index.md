# 通过 openMTP 在 Switch 上安装游戏


## 问题

前几天入手了 OLED 版本最新的 Switch 一代，顺便破解了装了好多游戏，拿到手之后，发现好多游戏都不喜欢玩，为了玩射击类和动作类游戏，随即开始自己安装游戏，问同事要了他安装游戏的网盘资源，晚上在闲鱼上花了不到 3 块钱开了个夸克的会员下游戏。

游戏下载好之后就需要安装到 Switch 上了，接下来就把 Switch 和 我的 MacBook Pro 连接起来，准备安装游戏，但是 MacBook Pro 就是始终不识别我的 Switch SD 卡，估计是 SD 卡格式不识别。所以我就开始启用所谓的破解版的官方使用的 MTP 来安装游戏，但是 MacBook Pro 也是不能找到；

因为在 MTP 下面还有个 FTP, 我准备用 FTP 来传输，然后再安装游戏，但是 MacBook Pro 可以访问 Switch 的 FTP 服务器，但是，没有写的权限，又失败了。

## 解决思路

网上有很多说用一个[Commander one](https://commander-one.com/) 可以安装在 MacBook 上，然后就可以找到 Switch 的 MTP 设备，然后就可以安装游戏了。好消息是确实可以找到 Switch 的 MTP 设备，坏消息是，拷贝游戏到 Switch 时，会探窗框说继续免费使用拷贝，但是没有任何进度。好无语啊，连个提示都没有，这不应该是一个商业公司开发的产品。

没有什么是能难到程序员的。于是我就在 GitHub 上搜 MTP, 果然有个 [OpenMTP](https://github.com/ganeshrvel/openmtp) 的项目，打开一看，README 文档也写的不错，直接就有 Homebrew 的安装命令，毫不犹豫的就尝试安装，果然有些开源的产品做的就是非常的懂用户体验，尤其是给程序员用的。

```bash
brew install --cask openmtp
```

## 最终方案

因为 OpenMTP 使用起来非常简单，只要要找对目标磁盘，直接将要拷贝的文件（游戏）拖拽到目标磁盘就可以了。

![OpenMTP](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/Tools/mtp/openMTP-switch.2yysbj8l4m.webp)

## 总结

Commander One 可能是个好软件，但是在复制游戏到目标磁盘的时候不可用，但开源世界总有代替的东西，有时候可能很直接，拿来就可以用，有时候需要多个工具组合一下，但最终都可以解决问题。程序员的世界就是这样，永远不会缺少解决问题的工具。

