# Vibe Coding：提升 Code Review 体验的 VSCode 插件


## 痛点

在日常的 Code Review 过程中，我们经常需要记录审查过程中发现的问题和建议。目前常见的做法主要有两种：

1. 让他人代为记录，可能是通过 Todolist 或纸质形式的文字记录
2. 自己手动记录，通常使用各种笔记工具，如 Raycast Note

这两种方式都存在信息丢失的风险，可能由于时间推移或其他因素导致记录不完整或遗失。最理想的方式是建立一套自己的记录系统，使得回顾时能够一目了然地看到当时的审查意见。

## 解决方案

针对这一需求，我开发了一个 VSCode 插件来专门记录 Code Review 过程中的反馈。这个项目使用了最近非常热门的 Vibe Coding 技术...

![Code Review Comments](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/plugins/code-review-comments/code-review-comments.6bhdgqda0w.gif)

## 实现细节

### 系统提示词设计

以上展示的功能就是通过 Vibe Coding 技术实现的。所有代码都是由 AI 自动生成，使用了 [Gemini CLI](https://www.npmjs.com/package/@google/gemini-cli) 工具。

在开始开发前，我创建了一个 gemini.md 文件，在其中详细描述了项目需求：

- 系统角色定义：为 AI 设定一个专业的角色定位
- 系统目标：明确说明这个系统要解决的问题
- 技术栈选择：指定使用的开发技术
- 功能需求：详细列出系统需要实现的功能
- 系统特性：进一步细化系统的功能特性
- 开发要求：如每次完成功能后需要自行编译检查等
- 其他约束条件

这样设置后，每次启动 gemini cli 时，工具会默认读取该文件，大大节省了重复输入提示词的时间。

示例提示词：

```md
<system>
你是一个专业且资深的 VSCode 插件开发者；请对每次的更改都做编译检查。
</system>

<user>
这是一个用于记录 code review 过程中产生的 comment 的插件，这样可以很方便在 code review 后对提交的代码进行更改，功能类似 GitHub PR 的 comment。

在修复 bug 或者开发新功能的时候，尽量不要让我给你提供除了提示词以外的其他内容。

requirements：
- 使用 TypeScript 编写的 VSCode 插件
- 需要使用 VSCode 的 API 来实现功能
- 遵循 VS Code 插件开发的最佳实践

features:
- 只有在用户创建 comment 时才会记录到本地文件中
- 需要使用 VSCode 自己的 working tree diff，而不是执行 git diff 命令
- 记录的 comment 需要在 VSCode 的侧边栏中显示，可以对某个 comment 进行操作，如删除、标记为已完成、更改 comment 内容等
- 数据存储在本地文件中，格式为 YAML，文件名为 diff-comments.yaml
- 记录的 comment 需要包含文件名、行号、comment 内容、git hash、git parent hash、创建时间等；排序按照未完成、已完成且倒序排列
- 当用户在侧边栏中点击某个 comment 时，右侧应出现添加 comment 时的 diff view，且跳转到对应的文件和行号
- 当用户在 diff view 添加 comment 时，插件会自动记录当前的 git hash 和时间戳，且在 diff view 右侧文件的行号前面（可以添加 debug icon 的位置）显示一个小图标，表示有 comment 记录；鼠标移动到这个小图标上时，会显示 comment 的内容摘要

</user>
```

### 有效的 Prompt 工程

Vibe Coding 的核心在于与 AI 工具进行持续的对话，通过精心设计的提示词让 AI 实现我们的需求。在实现过程中会遇到各种问题，这时需要详细描述场景，并尽可能提供错误日志，让 AI 能够准确分析并提出解决方案。

在具体实现过程中，某些功能可能存在多种实现方案，AI 可能会选择不合适的方案导致需求无法实现。例如，在实现 diff view 时，如何获取当前文件的 git commit hash？Gemini 最初建议在程序运行时执行 `git log ...` 命令，但对于有合并 PR 的 Commit 来说，获取正确的 git commit hash 很复杂，因为 `git log` 命令会返回所有父 Commit 的 hash，而不是当前 Commit 的 hash。这样获取到的 commit hash 在做 diff view 显示时就会找不到对应的 commit。如果不深入了解 VSCode 的 git diff 实现机制，很容易陷入这个误区。

## 总结

- 强大的 Vibe Coding 和大模型技术主要用于提升效率，而非替代程序员。工具只是让产出更快，但准确性仍需人工关注。
- 再好的工具也需要开发者对相关技术有充分了解，需要给 AI 提供尽可能准确的实现方案，使其能更好地理解和生成代码。
- 使用 Vibe Coding，我们可以更快地获得产品原型，同时也能更快地学习我们不熟悉的知识和技能。
- 但所有生成的代码都需要良好且可维护的架构设计，而不是流水账式的代码堆砌。

## 引用

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Gemini CLI: https://www.npmjs.com/package/@google/gemini-cli](https://www.npmjs.com/package/@google/gemini-cli)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

