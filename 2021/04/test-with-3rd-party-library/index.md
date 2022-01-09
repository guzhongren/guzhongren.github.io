# Test With 3rd Party Library


## 场景

一般的前端开发情况下，我们都会用到其他的第三方库，比如 UI 库 `Ant Desgin`， 请求库 `axios` 等，通常对于 UI 库，我们可以通过快照等操作对其进行测试，但是对于像 axios 这类第三方库，我们必须通过 mock 的方式来实现。

## 问题

上周四晚上突然收到同事的微信求助，怎么 mock 一个 `jwt-decode` 这个库。然而理想很丰满，现实很骨干。妹子找了 jest 官网的各种测试方式，没有成功，我岂能随随便便成功。

妹子的问题如下：

```js

import jwt_decode from 'jwt-decode'

const cookieAccessToken = cookie.parse(window.document.cookie) {
  "cookie-key"
}
const userJwt = (cookieAccessToken && jwt_decode(cookieAccessToken))
....
```

## 解决方案

在构建项目前期，通过各种尝试启动一个支持 `import` 语法的项目，始终未遂。 最终还是按照 Jest 官网的提示一步步走，构建起了一个项目。

### 参考官网示例

官网示例如下，是一个 mock 有方法的类的，但是通过上面的代码可知，这个不是一个类，而是直接使用的一个方法。

```js
import moduleName, {foo} from '../moduleName';

jest.mock('../moduleName', () => {
  return {
    __esModule: true,
    default: jest.fn(() => 42),
    foo: jest.fn(() => 43),
  };
});

moduleName(); // Will return 42
foo(); // Will return 43
```

很明显这是不符合我么场景的。通过观察可知，jest.mock 的第二参数是工参数，返回了一个对象，然后通过调用个这个对象的方法，返回特定的mock数据。 那么对于我们这种情况，我们只需要返回一个 mock 后的方法即可。

so, 方案可整理如下


```js
import jwt_decode from "jwt-decode";

jest.mock("jwt-decode", () => {
	return jest.fn().mockImplementation(() => {
		return "test";
	});
});

it("jwt", () => {
	var token =
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJleHAiOjEzOTMyODY4OTMsImlhdCI6MTM5MzI2ODg5M30.4-iaDojEVl0pJQMjrbM1EzUIfAZgsbK_kgnVyVxFSVo";

	const decoded = jwt_decode(token);
	expect(decoded).toBe("test");
});
```

然后运行 test，通过。


Code 地址：https://github.com/guzhongren/awesome-unittest/tree/main/JavaScript/Frontend/src/3rd-part-test


## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)

* [mocking-modules: https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options]:(https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options)

## Statement（特此申明）

本文仅代表个人观点，与[Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/扫码_搜索联合传播样式-白色版.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

