# 使用 setuptools 工具搭建 Python 工程


最近运维项目上要使用Pyspark进行报告生成，嗯，是的，运维项目的技术栈永远是你想象不到的。

有活就干，这形势只能“狗着”。

技术栈是Python, 硅基生命时代的基础之一； 工程化管理工具是[setuptools](https://setuptools.pypa.io/en/latest/userguide/index.html), 嗯，对我来说是新工具，在工作的8年里，第一次听说这个。这次的重点就是利用它来构建一个模块化的工程。 相对于前端架构而言，其就相当于 `package.json`。

## 期望

基于 setuptools 产出一个模块化的工程，高级模块要依赖通用模块(commons)。

## 工具介绍

按照 setuptools 官网介绍，我们需要更新最新的 setuptools，安装 `build` 和 `whell`, 依赖管理会在 setuptools 的 `install_requires` 中体现，如下;

> pip 最好是 pip3, Python 最好是最新版的 Python3。

## 代码实践

### 虚拟环境

在 Python 工程中，虚拟环境是一个非常重要的概念。 你可以随时创建纯净的虚拟环境开始你的（已有/新的）工程。 最简单的好处就是不会在系统级别相互影响。

在我们这个示例中，最简单的好处就是生成的包不会影响系统中已有的包。退出虚拟环境后，在虚拟环境中安装的包不会在系统中出现。

```sh
# 在你合适的位置创建目录管理 Python 虚拟环境
mkdir myenv
cd myenv
# 使用 Python 自带的 venv 来创建全新的虚拟环境
python3 -m venv myenv
# 激活当前环境，然后就可以切换目录到工程目录进行编码了
source bin/activate

# 退出当前虚拟环境
deactivate
```

### setuptools

setuptools 是 Python 官方的工程构建工具。 其可以打包项目、打包 lib等。有三种配置格式， 分别为`pyproject.toml`、 `setup.cfg` 和 `setup.py`, 竟然不支持 yaml 语法。 官方不推荐 `setup.py` 这种形式，但其可读性真的好啊，因为我不是很喜欢 `toml`。

### 目标工程

#### 文件结构

```sh
tree -L 3
.
├── LICENSE
├── setup.py
├── src
│   ├── commons
│   │   └── __init__.py
│   ├── module1
│   │   ├── __init__.py
│   │   └── __main__.py
│   └── timmins
│       ├── __init__.py
│       └── __main__.py
└── tests
    └── test.py

6 directories, 8 files
```

### setup.py

```python
from setuptools import setup

setup(
    name='zhongren',
    version='0.1.1',
    entry_points={
        'console_scripts': [
            'hello-world = timmins:hello_world',
            'module = module1:say_hello',
        ]
    },
    install_requires=[
        'build',
        'wheel'
    ]
)

```
这个文件主要描述了工程的名字和版本，最重要的是 `entry_points` 和 `install_requires`。

- `entry_points` 数组中的每一条记录都会被打包成一个可执行程序，在这里将会产生 `hell-world`和 `module` 两个可执行程序。
- `install_requires` 指定依赖的第三方库，这里不指定版本，使用最新版。

##### commons

```python
# __init.py
def say(something):
    print("commons say: " + something)

```

`commons` 是项目公共方法，供高层模块调用。

##### module1

```python
# __init__.py
from commons import say

def say_hello():
    say('zhongren world')
```

在 `__init__.py` 中，我们通过加载指定的绝对路径的方法，调用了 commons 模块中的 say 方法，实现了 `低耦合`。

```python
# __main__.py
from . import say_hello

if __name__ == '__main__':
    say_hello()
```

在同样的工程下面，为什么还要有 `__main__.py`呢？

因为我们要将工程打包，并生成多个模块，在这里是模块 `module1`
 和 `timmins`；并在模块中调用了底层模块的 `say` 方法。并且这部分会是可运行程序的`入口`。

##### timmins

```python
# __init__.py
def hello_world():
    print("Hello world")
```
此模块只是暴露方法出去，相当于 lib。
```python
# __main__.py
from . import hello_world

if __name__ == '__main__':
    hello_world()
```

此模块和 module1 的功能相同，只是调用了自己目录下 `Lib` 的方法。

#### 构建

```sh
python setup.py install
......
Processing zhongren-0.1.1-py3.11.egg
Removing /usr/local/lib/python3.11/site-packages/zhongren-0.1.1-py3.11.egg
Copying zhongren-0.1.1-py3.11.egg to /usr/local/lib/python3.11/site-packages
Adding zhongren 0.1.1 to easy-install.pth file
Installing hello-world script to /usr/local/bin
Installing module script to /usr/local/bin

Installed /usr/local/lib/python3.11/site-packages/zhongren-0.1.1-py3.11.egg
Processing dependencies for zhongren==0.1.1
Finished processing dependencies for zhongren==0.1.1
```

按照提示，打包后的模块已经被安装在了 `/usr/local/bin` 中了。我们可以使用两种方式进行验证。

1. CMD

```sh
module
> commons say: zhongren world
hello-world
> Hello world
```
可以看到两个 `entry_points` 模块运行后的输出和我们在程序中定义的一致。

2. 测试

```python
# test.py
from timmins import hello_world
from module1 import say_hello

hello_world()
say_hello()
```

通过执行`python3 test`, 输出如下
```sh
python3 tests/test.py
> Hello world
> commons say: zhongren world
```

#### wheel 构建

我们最终想要的肯定是一个可以部署的包（package）,在 Python 里，通常使用 `.whl` wheel 包来分享或者部署。

##### 打包 whl 包

```sh
python3 setup.py bdist_wheel

running bdist_wheel
running build
running build_py
......
running install_scripts
creating build/bdist.macosx-13-x86_64/wheel/zhongren-0.1.1.dist-info/WHEEL
creating 'dist/zhongren-0.1.1-py3-none-any.whl' and adding 'build/bdist.macosx-13-x86_64/wheel' to it
adding 'commons/__init__.py'
adding 'module1/__init__.py'
adding 'module1/__main__.py'
adding 'timmins/__init__.py'
adding 'timmins/__main__.py'
adding 'zhongren-0.1.1.dist-info/LICENSE'
adding 'zhongren-0.1.1.dist-info/METADATA'
adding 'zhongren-0.1.1.dist-info/WHEEL'
adding 'zhongren-0.1.1.dist-info/entry_points.txt'
adding 'zhongren-0.1.1.dist-info/top_level.txt'
adding 'zhongren-0.1.1.dist-info/RECORD'
removing build/bdist.macosx-13-x86_64/wheel

```

可以看到 `zhongren-0.1.1-py3-none-any.whl` 在 `dist` 目录下被成功构建。

同样，可以使用安装命令来测试安装, 并用上面的`python3 tests/test.py` 来验证。

```sh
pip3 install dist/zhongren-0.1.1-py3-none-any.whl
Looking in indexes: https://pypi.tuna.tsinghua.edu.cn/simple
Processing ./dist/zhongren-0.1.1-py3-none-any.whl
Installing collected packages: zhongren
Successfully installed zhongren-0.1.1
```

## 总结

学习最佳实践，可以节约时间，同时，也是真爱生命。

项目工程地址: [https://github.com/beef-noodles/py-project](https://github.com/beef-noodles/py-project)

## 引用

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [setuptools: https://setuptools.pypa.io/en/latest/userguide/index.html](https://setuptools.pypa.io/en/latest/userguide/index.html)
* [Import Modules From Parent Directory in Python: https://www.delftstack.com/howto/python/python-import-from-parent-directory/](https://www.delftstack.com/howto/python/python-import-from-parent-directory/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

