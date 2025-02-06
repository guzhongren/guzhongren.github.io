# 解决 vscode 配置 deno 时命令不可用的问题的记录


## 缘由

最近在用`vscode`写`deno`, 最佳拍档应该就是官方提供的插件了，但是使用插件需要对项目进行初始化 (`deno:init`)，其实就是在项目根目录创建一个文件 (.vscode/settings.json)， 然后在里面写入 deno 对该项目的配置。

在我刚开始写 deno 代码的时候，这个插件还是好的，但是参与到朋友的一个 demo 的时候就出问题了； 初始化：CMD+ Shift + P,`deno:init`, 然后右下角提示`deno._init_project`未找到，请重启 vscode。然后不管怎么重启，即使把插件的源码下载下来编译运行都不行。最终只有重新安装大法了。然而，重装了还是不行。

## 解决方案

解决方案应该只能是将所有关于 vscode 的所有插件和配置都彻底删除重新安装才行。

### 删除插件

```shell
rm -rf ~/.vscode/extensions
```

### 删除系统缓存数据

```shell
rm -rf ~/Library/Application\ Support/Code
```

### 从应用程序中删除 vscode

打开 Mac 的应用程序管理文件夹，删除 `Visual Studio Code`

### 重新安装 vscode

直接下载安装包或者使用 Homebrew

```shell
brew install visual-studio-code
```

### 安装 deno 插件

在 vscode 的扩展中搜索并安装 deno 插件。

## 测试

打开 deno 相关的项目。CMD + Shift + P ， 输入 `deno：init`，应该不会再弹出命令找不到的错误提示了。

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)

