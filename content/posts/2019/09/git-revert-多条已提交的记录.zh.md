---
title: "Git Revert 多条已提交的记录"
date: 2019-09-30T15:52:49+08:00
draft: false
author: "谷中仁"
authorLink: "https://guzhongren.github.io"
description: ""
license: "Creative Commons Attribution 4.0 International license"

tags: ["git"]
categories: ["git", "revert", "multRevert"]
featuredImage: "https://yqfile.alicdn.com/4a5a82578aaa956e2fc4b83847feba87e44ad848.png"
---


我需要撤销最后的四个提交

![image](https://yqfile.alicdn.com/3fbcbf5e8d1d7d7d1ab6f5978b9df1f702f4e420.png)

如果用*git revert * 一个一个revert 挺费劲，可以用*git revert OLDER_COMMIT^..NEWER_COMMIT* 这种格式，对应我的工程就是

```shell
$ git revert 54b23c2251acde.....09123463e99436fba83f9^..a19a10b24b648b80401234686aac65...
```

这样会在log 上多留下四条revert相关的记录，我不想生成revert相关的记录呢？可以的

```shell
$ git revert -n 54b23c2251acde.....09123463e99436fba83f9^..a19a10b24b648b80401234686aac65...
```

就是多加个 *-n* 参数，然后再通过 git add 和git commit 等步骤就可以了。

最后的效果如下

![image](https://yqfile.alicdn.com/4a5a82578aaa956e2fc4b83847feba87e44ad848.png)





## Refs

[1.https://guzhongren.github.io/](https://guzhongren.github.io/)

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/扫码_搜索联合传播样式-白色版.ae9zxgscqcg.png)
