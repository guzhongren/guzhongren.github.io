# 真的需要在测试中打log么？


## 引言

> "调试程序是程序员最大的耻辱" -- CTO

## 写了 log 并且出错的程序

```js
describe('multiple', () => {
  it('should be send when invoke the method sendMessage', () => {
    Object.defineProperty(window, 'top', {
      value: window,
      writable: true,
      enumerable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'postMessage', {
      writable: true,
      value: jest.fn(),
    })

    console.log(window.top?.postMessage)
    sendMessage('message')
    console.log(window.top?.postMessage)

    expect(window.parent.postMessage).toBeCalledTimes(2)
  })
})

```

运行输出

```js
  console.log
    [Function: mockConstructor] {
      _isMockFunction: true,
      getMockImplementation: [Function (anonymous)],
      mock: [Getter/Setter],
      mockClear: [Function (anonymous)],
      mockReset: [Function (anonymous)],
      mockRestore: [Function (anonymous)],
      mockReturnValueOnce: [Function (anonymous)],
      mockResolvedValueOnce: [Function (anonymous)],
      mockRejectedValueOnce: [Function (anonymous)],
      mockReturnValue: [Function (anonymous)],
      mockResolvedValue: [Function (anonymous)],
      mockRejectedValue: [Function (anonymous)],
      mockImplementationOnce: [Function (anonymous)],
      mockImplementation: [Function (anonymous)],
      mockReturnThis: [Function (anonymous)],
      mockName: [Function (anonymous)],
      getMockName: [Function (anonymous)]
    }

      at Object.<anonymous> (__test__/method_sendMessage_mult_tests.spec.ts:16:13)

  console.log
    [Function: mockConstructor] {
      _isMockFunction: true,
      getMockImplementation: [Function (anonymous)],
      mock: [Getter/Setter],
      mockClear: [Function (anonymous)],
      mockReset: [Function (anonymous)],
      mockRestore: [Function (anonymous)],
      mockReturnValueOnce: [Function (anonymous)],
      mockResolvedValueOnce: [Function (anonymous)],
      mockRejectedValueOnce: [Function (anonymous)],
      mockReturnValue: [Function (anonymous)],
      mockResolvedValue: [Function (anonymous)],
      mockRejectedValue: [Function (anonymous)],
      mockImplementationOnce: [Function (anonymous)],
      mockImplementation: [Function (anonymous)],
      mockReturnThis: [Function (anonymous)],
      mockName: [Function (anonymous)],
      getMockName: [Function (anonymous)]
    }

      at Object.<anonymous> (__test__/method_sendMessage_mult_tests.spec.ts:18:13)

 FAIL  __test__/method_sendMessage_mult_tests.spec.ts
  multiple
    ✕ should be send when invoke the method sendMessage (12 ms)

  ● multiple › should be send when invoke the method sendMessage

    expect(jest.fn()).toBeCalledTimes(expected)

    Expected number of calls: 2
    Received number of calls: 1

      17 |     sendMessage('message')
      18 |     console.log(window.top?.postMessage)
    > 19 |     expect(window.parent.postMessage).toBeCalledTimes(2)
         |                                       ^
      20 |   })
      21 | })

      at Object.<anonymous> (__test__/method_sendMessage_mult_tests.spec.ts:19:39)
      at processTicksAndRejections (node:internal/process/task_queues:96:5)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.077 s
Ran all test suites matching /\/Users\/zhongren\.gu\/01\.Project\/test-window-object\/__test__\/method_sendMessage_mult_tests\.spec\.ts/i with tests matching "multiple should be send when invoke the method sendMessage".
```

## 在测试中写 log 有什么用？
> 本文所说的测试中写的 Log 是提交到代码仓库中的日志。

看了上面的测试和 UT 运行后的结果，你有什么看法？

在我看来，有以下几点：

### 影响总体的测试输出

如果测试中存在很多的 log，并且有部分测试会失败，当你找失败的测试的时候就会变得非常困难，会被log 迷惑。测试结果列表不是那么整齐，给人以测试混乱，不够整洁的感觉，影响开发体验。

### 日志对测试运行的成败没有任何好处

测试在运行失败后，会自动打印出真实值（Received）和 期望值（Expected), 对于优秀的程序员，大家都用 TDD 开发，按照 TDD 的套路，程序的期望值是已知的；如果测试失败，你应该修改你的产品代码，让你的产品代码的输出符合你测试的期望值; 而不是在你的测试代码中调试，打 log。

如果在测试中打印了 Log，程序员最多在测试日志中看看某个变量的值，对生产代码没有任何影响; 同时你还得花时间去找你想要的日志，纯属浪费时间。

如果真的需要看测试的某个变量或者看生产代码中某行代码的运行时值，通过调试你的测试代码，在你的生产代码中打断点即可，完全没有必要将测试中的日志永久的留在代码库中。

## 生产代码中的日志被测试打印出来，可以吗？

不行。没有意义。

运行测试，我们只想知道所有测试是否成功，至于中间打印出生产代码中的日志也没有意义。
如果测试失败，只需要 Fix 对应的测试即可, 无论什么方法。


## 解决方案

如果真的需要在测试时调试代码，可以加 `debug` 级别的调试代码，这样就可以通过日志来调试了，但还是需要通过其他的方式，比如 `eslint` 来限制将 `debug` 日志提交到 Repo 中。

怎么让测试的输出中不输出 log 信息呢？

- 对于前端，我们可以在所有测试运行前 Spy `console.*`的所有的方法，

  ```js
  jest.spyOn(console, 'log').mockReturnValue();
  jest.spyOn(console, 'info').mockReturnValue();
  jest.spyOn(console, 'warn').mockReturnValue();
  jest.spyOn(console, 'error').mockReturnValue();
  ```

  这段代码需要写在 `tests/jest-setup.[t|j]s` 中。

- 或者使用第三方成熟的 npm 包， 像 [jest-mock-console](https://www.npmjs.com/package/jest-mock-console), 这个包功能更强大一点。


## Refs

* [博客: https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Mock logger in jest: http://github.yanhaixiang.com/jest-tutorial/basic/mock-timer/#mock-logger](http://github.yanhaixiang.com/jest-tutorial/basic/mock-timer/#mock-logger)
## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

