# Rust Doc 小记


## 前言

学习 Rust 肯定离不开查看其官方或者第三方开发者的文档，而在 Rust 的 crate 中，对于开发者或者使用者，文档是非常友好的。在这就不举例了。本文主要是记录一下写 rust doc 的一些小步骤。方便日后查阅。

## 示例

### 生成项目

```shell
$ cargo new mylib --lib

````

### 编写 lib.rs 中的实现

```rust

pub fn add_one(x: i32) -> i32 {
		x + 1
}

```

### 为 add_one 添加注释

最终效果如下：

```rust
//! My Crate name
//!
//! `my_crate_name` is test for studying
/// Add one for the number given
///
/// #Example
///
/// ```rust
///let five = 5
///assert_eq!(6, rust_study::add_one(five));
/// ```
///
pub fn add_one(x: i32) -> i32 {
    x + 1
}

```

### 生成 rust 标准文档并查看

```shell
$ cargo doc --open
```

执行如上命令，cargo 会根据注释生成 web 网页文档，并且自动打开，如下是上面文档生成的结果。

![rust-doc.jpg](https://i.loli.net/2020/04/16/nBq8Zc2u3IV7Pmf.jpg)

![rust-doc-fn.jpg](https://i.loli.net/2020/04/16/mQ2W6hcNwv39Tb4.jpg)

## 总结

* Rust 中写的注释代码，可以用来做方法示例，或者当作测试，如果是测试，运行`cargo test`	, cargo	不仅会测试 tests 文件夹下的测试案例，还会寻找注释中的测试。
* 什么时候写注释呢？优秀的程序员总是强调方法名即注释等。但有不确定的时候就得写注释啦。
	*	在 rust 中，在程序会 panic 的时候需要写注释告诉调用者可能 panic 的方法
	*	返回值是 Result 类型的时候，需要告诉调用者，Ok 和 Err 的数据会是什么

Rust 的编译器相当严谨，结合 TDD 写代码应该会很爽。

