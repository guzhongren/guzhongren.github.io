# 对 forEach 和 for 两种循环类型中执行异步函数的复盘


## 问题

有这么一个需求，有一个合法的数组，需要每隔 3 秒执行一个异步函数，直到最后得到所有异步函数执行结果。

## 伪解决方案

```js
// testForEach.js
const sleep = () => {
  return new Promise((resolve, reject) => {
      setTimeout(resolve, 3000)
  })
}

const getDifferent = (startDate, endDate) => {
  return Math.floor((endDate - startDate) / 1000)
}

const startDate = new Date()
let list = [1, 2, 3, 4, 5, 566, 7, 78, 8, 89, 9, 0]

async function testForEach() {
  let promiseList = []
  list.forEach(async item => {
      console.log('================1forEach================')
      await sleep()
      promiseList.push(await item * 2)
      console.log('================2forEach================')
  })
  const result = await Promise.all([...promiseList])
  const endDate = new Date()
  console.log(getDifferent(startDate, endDate))
  return result
}
testForEach().then(result => {
  console.log(result)
})
```

### 解释就是

`sleep` 函数用来等待函数执行；

`getDifferent` 函数用来计算函数开始执行到结束的时间差；

`testForEach` 中用  Array 的 `forEach`实现循环，并在其中使用休眠 3 秒的逻辑，且通过对原有数组进行异步计算（item * 2）, 然后返回 `await Promise.all`的结果。

最后一行，执行 Promise 函数，得到 Promise.all 的返回结果，打印，验证。

这一切是不是没有问题？ 最简单的验证办法就是在浏览器控制台运行一下； 这是我的运行结果

```js
12================1forEach================
0
[]
Promise {<fulfilled>: undefined}
12================2forEach================
```

前面的 12 代表 这行在最近被重复输出了 12 次，而且看下面，promise 的结果也还没得到，然后程序在输出 2 forEach 的时候停顿了 3 秒；总之，我们没有达到效果。 为什么呢？

## 掩饰

查看 MDN 官网中关于 [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 的解释，可以看到有一行说明

> Note: There is no way to stop or break a forEach() loop other than by throwing an exception. If you need such behavior, the forEach() method is the wrong tool.

> Early termination may be accomplished with:

>  A simple for loop
>  A for...of / for...in loops
>  Array.prototype.every()
>  Array.prototype.some()
>  Array.prototype.find()
>  Array.prototype.findIndex()
>  Array methods: every(), some(), find(), and findIndex() test the array elements with a predicate returning a truthy value >  to determine if further iteration is required.

简单翻译一下，如果要让 forEach 停下，那么只有抛异常这一种方案；但是如果你想在循环中退出那么就需要考虑其他方案了。

但是在我们的案例中，我们需要让循环中的所有结果都正常运行，所以，我们得使用官方建议的方案。【试了一下， every 也是一样的效果，难道是我对文档理解有误？】

## 新方案

当遇到问题时，往往用原始的方法就可以解决问题。so 使用最原始的 for 循环来解决问题。

```js
// testFor.js
const sleep = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 3000)
    })
}

const getDifferent = (startDate, endDate) => {
    return Math.floor((endDate - startDate) / 1000)
}

const startDate = new Date()
let list = [1, 2, 3, 4, 5, 566, 7, 78, 8, 89, 9, 0]

async function testFor() {
    let promiseList = []
    for (let i = 0; i < list.length; i++) {
        console.log('================1for length================')
        await sleep()
        promiseList.push(await list[i] * 2)
        console.log('================2for length================')
    }
    const result = await Promise.all([...promiseList])
    const endDate = new Date()
    console.log(getDifferent(startDate, endDate))
    return result
}

testFor().then(value => {
    console.log(value)
})
```

代码很简单，没有什么可以解释的。在你的浏览器控制台中运行应该可以得到如下结果，在控制台输出的时候是每隔 3 秒输出 2for length 和 1for length 的，直到最后循环完成输出结果。

```js
================1for length================
Promise {<pending>}
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
================1for length================
================2for length================
36
(12) [2, 4, 6, 8, 10, 1132, 14, 156, 16, 178, 18, 0]
```

## 总结

* **如果遇到问题用新特性解决不了，就需要考虑使用最原始的方法了**
* **零信任** 要有质疑精神，只要不是自己写的，就有可能有 bug， 不然那么多漏洞是怎么发现的
* Keep simple, Keep run

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)

* [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)


## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此 [文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig) 进行校验： `gpg --verify PayForGuzhongren.svg.sig`

