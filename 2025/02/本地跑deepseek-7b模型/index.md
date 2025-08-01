# 本地跑deepseek 7b模型


## 背景

最近，Deepseek 因其卓越的性能和高效的推理速度在技术圈内引起了广泛关注。

Deepseek 采用了先进的算法(使用汇编和 CUDA 混编的方式调用 GPU)和训练方法(蒸馏)，不仅显著提升了推理速度，还降低了对硬件配置的要求，使其能够在更多设备上运行。

然而，使用在线 Deepseek 服务时，用户可能会遇到“服务器繁忙，请稍后再试”的问题。

作为程序员，我们自然不能忍受这种情况，因此本文将指导你如何在本地搭建 Deepseek 模型。

## 搭建步骤

### 所需软件及环境

#### 环境

- **操作系统**: MacOS M1 (Sequoia [Version 15.3])

#### 软件

- **[Ollama](https://ollama.com/)**: 用于管理和运行大模型。
- **[Chatbox AI](https://chatboxai.app/)**: 提供与大模型交互的界面。

### 安装步骤

#### 安装 Ollama

Ollama 可以通过命令行或手动下载安装包进行安装。手动安装后，系统会自动启动 Ollama 服务；而通过命令行安装后，则需要手动启动服务。

```sh
brew install ollama
# 安装完成后，启动 Ollama 服务
ollama serve
```

#### 运行 deepseek模型

1. 访问 Ollama 模型库，搜索 deepseek。
2. 选择 deepseek-r1 模型，并选择 7b 版本。
3. 点击复制按钮，将命令行粘贴到终端中运行。Ollama 将自动拉取并启动该模型。

```sh
ollama run deepseek-r1:7b
```

#### 安装 Chatbox

Chatbox 是与大模型进行交互的界面。你可以选择直接安装软件或通过 Docker 运行。推荐使用软件安装，以便快速启动和操作。

可安装软件或者通过docker 运行，推荐软件安装，可以快速启动软件来提速。

#### 配置

Chatbox 安装完成并且 deepseek 大模型运行起来后，在 Chatbox -> Settings 中选择本地启动的模型即可。

## 总结

随着人工智能技术的快速发展，社会分工可能会发生显著变化, 最明显的是人工智能会淘汰掉社会分工的中间层。

未来的趋势可能是：要么成为顶层的规则设计者，要么成为底层的实践者。通过本地搭建和运行 Deepseek 模型，我们不仅能够避免在线服务的限制，还能更深入地理解和掌握这一前沿技术。

## 引用

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Deepseek:https://www.deepseek.com/](https://www.deepseek.com/)
* [Ollama:https://ollama.com/](https://ollama.com/)
* [Chatbox AI:https://chatboxai.app/](https://chatboxai.app/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

