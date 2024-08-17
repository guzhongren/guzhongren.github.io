# Git多 user 管理


## 痛点

平时在一个电脑上会有不同的项目开发，尤其是个人项目和公司项目；

- 通常，我们不希望工作在公司项目上的时候用自己个人的git 信息提交commit, 相反也是一样
- 在不同目录下，在命令行中切换git config 也是个重复劳动的工作，比较费精力


## 方案

### 方案1：不同的gitconfig配置

此方案的实现思路是，git 检测当前目录是否是已经配置的目录，如果是配置的目录，那么就加载对应的gitconfig

#### 步骤

- 更新`~/.gitconfig`, 按需追加并修复如下内容
```git
[includeIf "gitdir:~/01.Project/"]
  path = ~/.gitconfigs/.gitconfig-personal

[includeIf "gitdir:~/04.company/"]
  path = ~/.gitconfigs/.gitconfig-company
```

- 建立相应的目录和文件，如~/.gitconfigs/.gitconfig-personal

```sh
mkdir -p ~/.gitconfigs1 && touch ~/.gitconfigs1/.gitconfig-personal
```

- 配置个人信息
```git
[user]
	email = personal@email.com
	name = personalName
	signingkey = signingkey
[commit]
	gpgsign = true
[init]
	defaultBranch = main
[tag]
	forceSignAnnotated = true
[pull]
	rebase = true
[gpg]
	program = gpg
[core]
	sshCommand = ssh -i ~/.ssh/id_github
	ignorecase = false
```
如上内容根据自己的需求更改即可。

### 方案2：简化git config 命令

#### 思路

使用git alias 执行命令加载不同的配置

#### 步骤

在~/.gitconfig中追加如下配置，并按需更改即可

```git

[alias]
  personal = "!f() { git config user.name 'personalUserName' && git config user.email 'personal@email.com' && git config --global user.signingkey KEY; }; f"
  company = "!f() { git config user.name 'company' && git config user.email 'company@email.com' && git config --global user.signingkey KEY; }; f"
```
使用时只需要执行一个git alias命令，如下

```sh
git company
```

## 总结

99%的事物皆可自动化！



## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)

## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

