---
title: "Go Import相关操作"
date: 2020-05-16T20:09:26+08:00
draft: false
author: "谷中仁"
authorLink: "https://guzhongren.github.io"
description: ""
license: "Creative Commons Attribution 4.0 International license"

tags: [""]
categories: [""]
featuredImage: "https://images.pexels.com/photos/2881785/pexels-photo-2881785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
images: [""]
---
go 的 import 其实是去GOROOT下去加载你写的模块，当然Go的import还支持如下两种方式来加载自己写的模块：
* 相对路径
  ```golang
  import   "./model"  //当前文件同一目录的model目录，但是不建议这种方式import
  ```

* 绝对路径
  ```golang
  import   "shorturl/model"  //加载GOPATH/src/shorturl/model模块
  ```

上面展示了一些import常用的几种方式，但是还有一些特殊的import，让很多新手很费解，下面是三种导入包的使用方法。
1. 点操作   有时候会看到如下的方式导入包

import( . “fmt” ), 这个点操作的含义就是这个包导入之后在你调用这个包的函数时，你可以省略前缀的包名，也就是前面你调用的fmt.Println(“hello world”) 可以省略的写成Println(“hello world”)

2. 别名操作 别名操作顾名思义可以把包命名成另一个用起来容易记忆的名字
  import( f “fmt” ) 别名操作调用包函数时前缀变成了重命名的前缀，即f.Println(“hello world”)
3. _操作 这个操作经常是让很多人费解的一个操作符，请看下面这个import
  ```golang
  import ( “database/sql” _ “github.com/ziutek/mymysql/godrv”
  ```

_操作其实只是引入该包。当导入一个包时，它所有的init()函数就会被执行，但有些时候并非真的需要使用这些包，仅仅是希望它的init()函数被执行而已。这个时候就可以使用_操作引用该包了。即使用_操作引用包是无法通过包名来调用包中的导出函数，而是只是为了简单的调用其init函数()。

## Refs

* [1.博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [2.图床:https://sm.ms/](https://sm.ms/)

## Statement（特此申明）

本文仅代表个人观点，与[Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/扫码_搜索联合传播样式-白色版.ae9zxgscqcg.png)
