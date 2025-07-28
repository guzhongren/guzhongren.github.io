# 使用 git 迁移 git 项目并保留提交记录


## 场景

在平时开发中我们有自己的 git 仓库，组内提交都是在这个库。突然有一天，领导说要把这个库整合到另一个更大的工程中（华为云的看板），那里面有前后端的代码；为了方便大家查找，我们需要将各个组的代码迁移到同一个大工程下。

## 问题

  * 提交要保留提交记录
  * changelog 要保留
  *  组内成员要保留

## 解决方案

 ```shell
git push --mirror ......
```

## 操作

假如我们原有的仓库为`git@codehub.devcloud.huaweicloud.com:project.git`

#### 1. 从原地址克隆一份裸版本库

```shell
$ git clone --bare git@codehub.devcloud.huaweicloud.com:project.git
......
```

#### 2. 在新目录创建 git *空*项目

这一步是为了让旧项目有**镜像**

假如新仓库地址为`git@codehub.devcloud.huaweicloud.com:leaderProject.git`
#### 3. 镜像推送代码到新仓库

进入旧 git 目录，推送即可

```shell
$ cd project
$ git push --mirror git@codehub.devcloud.huaweicloud.com:leaderProject.git
```

## 晒个图

![git.mirror.png](https://i.loli.net/2020/03/29/ow9O6BnDeuLjqQh.png)

## 引用

* [1. 博客：https://guzhongren.github.io/](https://guzhongren.github.io/)
* [2. 原文：https://yq.aliyun.com/articles/675073?spm=a2c4e.11155435.0.0.27543312iFnJbY](https://yq.aliyun.com/articles/675073?spm=a2c4e.11155435.0.0.27543312iFnJbY)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

