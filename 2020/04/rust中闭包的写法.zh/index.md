# Rust 中闭包的写法


在鲁迅的文章《孔乙己》中说，茴香豆的茴字有好几种写法，记得没错的话应该是四种，具体哪四种请参考下文引用。

在 Rust 中，闭包也有好几种写法，今天就来总结一哈。

## 闭包的写法

###  闭包语法

```rust
 fn add_one_v1(x: u32) -> u32 {x + 1 }
 let add_one_v2 = |x: u32| -> u32 {x + 1};
 let add_one_v3 = |x| {x + 1};
 let add_one_v4 = |x| x + 1;

```

### 使用闭包

```rust
 let a = add_one_v1(5);
 let b = add_one_v2(5);
 let c = add_one_v3(5);
 let d = add_one_v4(5);
 println!("a={}, b={}, c={}, d={}", a, b, c, d);

```

执行`cargo run`会得到如下结果：

`a=6, b=6, c=6, d=6`

## 重点说明

> 闭包定义会为每个参数和返回值类型推导一个具体的类型，但是不能推导两次（不能让俩次或多次使用是不同类型的参数进行调用）

语言描述有点模糊，那么用代码说明问题

```rust
 // 不能推导两次的示例
 let example_closure = |x| x;

 let s = example_closure(String::from("hello"));
 println!("第一次{}", s);
 // 如果参数为数字 5 ，则报错
 // let n = example_closure(5);
 let n = example_closure(5.to_string());
 println!("第二次{}", n);
```

在上面我们定义了一个参数为 x, 返回值为 x 的闭包，但是 x 的类型我们并没有指定。

经过第一次调用，传入参数类型为字符串， 得到的结果 s 也为字符串 `hello`,

第二次调用如果传入参数为数字 5， 那么程序就会报错，如下

```shell
error[E0308]: mismatched types
  --> src/main.rs:22:29
   |
22 |     let n = example_closure(5);
   |                             ^
   |                             |
   |                             expected struct `std::string::String`, found integer
   |                             help: try using a conversion method: `5.to_string()`

```
如果将数字 5 转换为字符串 5，那么程序就运行正常。

## 总结

Rust 的闭包感觉和 js 的函数的写法很像，感觉到了 Rust 又借鉴了部分 js 的语法。

