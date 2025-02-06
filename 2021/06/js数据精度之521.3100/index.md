# Js 数据精度之 521.3*100


## 原罪

```js
> 521.3*100
< 52129.99999999999
```
用你的浏览器来执行上面的计算，你应该能得到这个神奇的结果（52129.99999999999）。 Why?

## JS 数字丢失精度的原因

```shell
 s eeeeeee eeeeffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff
|1|       11   |                    52                                  |

```

> 1 位用来表示符号位
> 11 位用来表示指数
> 52 位表示位数

## Example

```js
> 0.1 + 0.2
< 0.30000000000000004
```

为什么会是这样？

首先，十进制的 0.1 和 0.2 都会被转换成二进制，但由于浮点数用二进制表达时是无穷的

```js
0.1 -> 0.0001100110011001...（无限）
0.2 -> 0.0011001100110011...（无限）
```

IEEE 754 标准的 64 位双精度浮点数的小数部分最多支持 53 位二进制位，所以两者相加之后得到二进制为：

```js
0.0100110011001100110011001100110011001100110011001100
```

因浮点数小数位的限制而截断的二进制数字，再转换为十进制，就成了 0.30000000000000004。所以在进行算术计算时会产生误差

## 如何解决

### toFix

```js
> (0.1+0.2).toFixed(1)
< "0.3"
```

### Math.round

```js
> 621.3*100
< 62129.99999999999
> Math.round(621.3 * 100)
< 62130
```

### 倍数

```js
> function toFixed(num, s) {
    var times = Math.pow(10, s)
    var des = num * times + 0.5
    des = parseInt(des, 10) / times
    return des}
> toFixed(0.1+0.2, 1)
< 0.3

```

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此 [文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig) 进行校验： `gpg --verify PayForGuzhongren.svg.sig`

