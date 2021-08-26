---
title: "Golang 基准测试(Benchmark)"
date: 2019-09-10T09:56:24+08:00
draft: false
author: "谷中仁"
authorLink: "https://guzhongren.github.io"
description: ""
license: "Creative Commons Attribution 4.0 International license"

tags: ["go", "Benchmark", "golang", "test", "testing", "单元测试", "基准测试", "TDD"]
categories: ["Golang"]
featuredImage: "https://golang.google.cn/lib/godoc/images/footer-gopher.jpg"
---

# Benchmark 🧪

> 基准测试是对计算机系统的性能的测试。

在程序中，基准测试，是一种测试代码性能的方法；比如有一个问题你有多种不同的方案，你想选择一种性能最好的方案，那么你就需要基准测试。

> 基准测试主要是通过测试 CPU 和内存的效率问题，来评估被测试代码的性能，进而找到更好的解决方案。比如链接池的数量不是越多越好，那么哪个值才是最优值呢，这就需要配合基准测试不断调优了。

## 工程意图

仓库： <https://github.com/guzhongren/TDD/tree/master/09.benchmar>

根据输入的字符串和重复次数，输出重复次数后的字符串。

## 初始化工程

```shell
go mod init benchmark
```

测试的函数需要以 Test 开头，参数为 *testing.T 类型

## Test

* 测试先行
```go
# 测试 Repeat 函数
func TestRepeat(t *testing.T) {
	actual := Repeat(`a`, 6)
	expect := `aaaaaa`
	if actual != expect {
		t.Errorf(`expect %s, but got %s`, expect, actual)
	}
}
```
* 运行 **go test**, 程序会报错，因为没有实现 Repeat 函数。

* 最小化的实现 Repeat

```go
// Repeat return a string with same char
func Repeat(char string, count int) (result string) {
	for i := 0; i < count; i++ {
		result += char
	}
	return
}
```

上面的函数中 return 并没有返回值，是因为，在 Repeat 函数的返回值部分有一个result，
当返回值是函数体里面的值的时候，可以不用写返回值，go 程序自动将该值返回。但return 依旧不能省略。

## Benchmark

基准测试的函数名须以 Benchmark 开头， 参数须为 *testing.B；循环中的 b.N， go 会根据系统情况生成，不用用户设定。

```go
func BenchmarkRepeat(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Repeat(`b`, 5)
	}
}

```

## 运行测试

* 基本测试

```shell
$ go test
PASS
ok      benchmark       0.006s
```

基本测试很简单，不用解读了。

* 基准测试

```shell
$ go test -bench=. -run=none
goos: darwin
goarch: amd64
pkg: benchmark
BenchmarkRepeat-12      10000000               116 ns/op
PASS
ok      benchmark       1.297s
```

运行基准测试也要使用go test命令，不过我们要加上-bench=标记，它接受一个表达式作为参数，匹配基准测试的函数，. 表示运行所有基准测试。

因为默认情况下 go test 会运行单元测试，为了防止单元测试的输出影响我们查看基准测试的结果，可以使用-run=匹配一个从来没有的单元测试方法，过滤掉单元测试的输出，我们这里使用none，因为我们基本上不会创建这个名字的单元测试方法。

下面着重解释下说出的结果，看到函数后面的-12了吗？这个表示运行时对应的 GOMAXPROCS 的值。接着的 10000000 表示运行 for 循环的次数，也就是调用被测试代码的次数，最后的 116 ns/op表示每次需要话费 116 纳秒。
以上是测试时间默认是1秒，也就是1秒的时间，调用 10000000 次，每次调用花费 116 纳秒。如果想让测试运行的时间更长，可以通过 -lunchtime 指定，比如5秒。





## Refs

[1.https://golang.google.cn/](https://golang.google.cn/)
[2.Golang 依赖注入(Dependency Injection)](https://guzhongren.github.io/2019/09/golang-%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5dependency-injection/)
----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/扫码_搜索联合传播样式-白色版.ae9zxgscqcg.png)
