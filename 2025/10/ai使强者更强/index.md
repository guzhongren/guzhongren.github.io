# AI 使强者更强

> 工作固然重要，但没有什么值得你为此失去完整的人生。

这是今天看到一篇公众号文章[《AI 时代，编程语言选型更难也更重要：Go、Rust、Python、TypeScript 谁该上场？》](https://www.infoq.cn/article/2mcpfRO4ocBWJG7jb6HF)上写的。自从 7 年前加入 Thougthworks 好像就从来没加过班一样的。周末可以正常休息，还可以打球，而且从来不出差。感恩公司。

## 强者恒强

这几年 AI 越来越普及，大到大型项目工程，小到小学生解题，AI 在以各种各样的方式“侵入”了我们生活的方方面面。在 AI 发展初期，很多人认为 AI 第一个能代替的行业是程序员，但直到现在，程序员依旧是这个世界上很难被代替的职业，抛开低迷的经济，各位专业的程序员依旧在自己的岗位上“发光发热”，并没有收到 AI 太大的冲击，相反，AI 正在助力程序员变得更强，更快，更可靠。

一个被广泛报道的案例是[Instant karma: Employer who replaced his tech team with AI tries to hire new developers on LinkedIn. Here's what happened next](https://economictimes.indiatimes.com/magazines/panache/instant-karma-employer-who-replaced-his-tech-team-with-ai-asks-for-new-developers-on-linkedin-heres-what-happened-next/articleshow/116625826.cms?from=mdr)，一位名叫 Wes Winder 的加拿大软件开发者在 Reddit 和 LinkedIn 上称自己已用 AI 工具取代了整个开发团队。然而，这一决定很快就事与愿违，几个月后他就在 LinkedIn 上发布招聘信息，重新招聘开发人员，引发了网友的嘲笑。这起事件被《经济时报》等媒体报道，并被视为用 AI 完全取代人类开发者的一个反面案例。

程序员到目前为止，甚至未来很长一段时间，依旧是很难被取代的。但 AI 使高级程序员更高级这一点也越来越突出。

我使用 AI 来编程，不管是做 SRE Agent 还是为业务代码实现需求，或者为业务代码实现单元测试，甚至使用 MCP 为开源项目写，修复 E2E 测试都有不少的经验，AI 在其中加速了我实现我的想法；
- 比如在实现 SRE Agent 的时候，我需要将我的 Agent 集成到 Slack 中以 Bot 的形式与用户交互，这里需要创建一个 Slack bot，如果是我以前的开发方式，肯定使去看官方的开发文档，然后跟着文档一步一步的尝试，但在有 AI 之后，我可以直接告诉 AI 我的整体诉求，让后告诉他需要注意的点，最后再强调一下方案的可行性及答案的详细程度，AI 在思考片刻后，就会给出答案，并且附带参考链接。
- 再比如，我在为项目写 E2E 时，Playwright 脚本报了一个奇怪的错误，我有点不了解，并且我也不想去了解，我直接可以给出大致如下的 Prompt:

    > 请运行 E2E 测试脚本使用 @Playwright MCP 修复xxx.e2e.ts中错误。

如此简单，AI 会自动启动浏览器，并且打开浏览器控制台，在运行出错后，AI 收集信息，然后分析，给出解决方案并实施，不到 2 分钟，一个棘手的问题就被 AI 修复了，回过头来，我再让 AI 帮我总结一下刚才的问题，我只需要做适当的理解，在下次发生相同问题的时候，我就可以快速修复了。

- 还有，我最近在做一个数据迁移的项目，设计到了我不熟悉的语言 Ruby, 作为一个 JavaScript/TypeScript、Java、Rust 写顺手，没写过 Ruby 语言的程序员来说，Ruby 真的是有点抽象，而且我们需要在短时间内完成开发工作，在这种情况下，我们肯定没有时间去学 Ruby 基础语法，但好在，我们有其他语言的基础，况且还有 AI；我大致读了代码，找到要加代码的位置，然后告诉 AI 我的需求，GitHub Copilot 就自动帮我完成了。但是他只是完成了你的最简单的需求，你需要对工程模式，代码格式等等负责，比如让他对方法中的 if else 进行重构。


在基于 AI 开发的新项目中，有经验的程序员在解决复杂的业务/技术问题的时候往往具有更好的思维方式和更快的解决速度。

## 弱者疾速

