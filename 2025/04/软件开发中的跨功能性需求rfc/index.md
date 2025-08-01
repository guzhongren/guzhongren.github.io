# 软件开发中的跨功能性需求（RFC）


## 引言

作为程序员的你，正在开发一款基于全球地图的某资源分布网站，你的产品会被各个国家的人使用，而每个国家都有不同的法律法规和文化习惯。你需要考虑到这些因素，以确保你的产品在全球范围内都能正常使用。比如有争议的边界不能让用户看到对自己国家不利的标记，那么你需要怎么做呢？这时候，你就需要考虑跨功能性需求了。

### 什么是跨功能性需求

跨功能性需求（Cross-Functional Requirements, CFRs）是指那些不直接与特定功能相关，但对整个系统的质量、性能和用户体验有重要影响的需求。例如，性能、安全性和可扩展性等。这些需求通常被称为“非功能性需求”，但它们对系统的成功至关重要。

### 其在软件开发中的重要性

跨功能性需求贯穿于软件开发的各个阶段，直接影响系统的稳定性、用户满意度和长期维护成本。例如，在一个实时通信应用中，低延迟（性能需求）和数据加密（安全性需求）是用户体验的核心。如果忽视这些需求，可能导致系统在高负载或恶意攻击下崩溃，甚至无法满足用户的基本期望。

## 跨功能性需求详细讨论

| 需求类别                                                     | 具体问题                                                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **可扩展性（Extensibility）**                                | 是否需要组件化？是否需要提供一个插件功能，由谁来实施？                                   |
| **可移植性（Portability）**                                  | 是否有迁移到另一个数据库产品或操作系统的必要性？                                         |
| **可安装性和可部署性（Installability & Deployment）**        | 需要提供什么样的基础设施？需要什么样的安装便利性？是否支持持续交付？如何回滚或升级版本？ |
| **兼容性（Compatibility）**                                  | 需要与哪些其他系统集成？需要遵循哪些行业标准？是否需要考虑现有数据格式？                 |
| **可集成性和互操作性（Integratability & Interoperability）** | 是否需要提供 API 或库供其他系统使用？版本管理和升级策略是什么？                          |
| **可复用性（Leveragability & Reuse）**                       | 是否能够复用企业现有组件/库，或者当前组件/库是否将被重用？                               |
| **可伸缩性（Scalability）**                                  | 如何根据不断变化的用户量来提高吞吐量？如何对此进行测试？                                 |
| **版本化和升级策略（Versioning and upgrades）**              | 版本化策略是什么？如何跟踪内部/外部的版本？有没有向后兼容的限制？                        |
| **可访问性（Accessibility）**                                | 是否支持有特殊需要的用户（如读屏）？                                                     |
| **本地化和国际化（Localisation & Internationalisation）**    | 是否支持多语言？日期/时间/货币的转换和翻译？                                             |
| **可用性和用户体验（Usability and user experience）**        | 用户体验对系统有多重要？是否有公司用户体验准则？是否支持多设备？                         |
| **分布性（Distributability）**                               | 系统是否能在特定区域使用？是否支持离线运行？如何同步信息？                               |
| **帮助与支持（Help & Support）**                             | 是否需要用户文档、教程或支持团队？是否需要计划培训？                                     |
| **可配置性（Configurability）**                              | 用户或管理员是否可以配置功能？如何进行配置管理？                                         |
| **支持性（Supportability）**                                 | 用户/操作支持的级别是什么？如何提供支持？                                                |
| **归档（Archiving）**                                        | 归档什么信息？何时归档？如何归档？谁可以访问归档信息？                                   |
| **可用性（Availability）**                                   | 是否有可用性目标？需要什么架构来满足这些要求？是否有高峰负载需求？                       |
| **容量（Capacity）**                                         | 是否有存储要求？高峰负载如何处理？系统需要处理的数据量和用户数量？                       |
| **连续性（Continuity）**                                     | 是否有灾难恢复计划？                                                                     |
| **数据完整性和一致性（Data Integrity and Consistency）**     | 是否需要数据校验、日志追踪或数据恢复机制？                                               |
| **可维护性（Maintainability）**                              | 最大可容忍停机时间是什么？是否有停机通知要求？错误页面如何处理？                         |
| **监控（Monitoring）**                                       | 应该衡量哪些业务/技术指标？如何监测？需要哪些警报？                                      |
| **多环境支持（Multiple Environment Support）**               | 需要多少环境？如何配置和管理这些环境？                                                   |
| **性能（Performance）**                                      | 吞吐量/响应时间要求是什么？是否需要性能测试？是否需要考虑异步场景？                      |
| **弹性和容错性（Resilience & Fault Tolerance）**             | 如果外部依赖失效，系统如何降级？                                                         |
| **可靠性（Reliability）**                                    | 不可靠的成本是什么？需要多少成本来保证可靠？                                             |
| **可审计性（Auditability）**                                 | 哪些操作需要被跟踪？是否有法律或监管要求？                                               |
| **认证（Authentication）**                                   | 如何鉴别用户身份？是否遵循标准或使用现有认证系统？                                       |
| **授权（Authorisation）**                                    | 哪些角色和权限是必要的？如何维护和应用权限？                                             |
| **法律合规性（Legal Compliance）**                           | 是否有数据/系统或软件交付过程的法律限制？                                                |
| **数据隐私（Data Privacy）**                                 | 哪些数据需要加密？哪些数据对用户和操作人员可见/隐藏？如何处理脱敏？                      |
| **安全性（Security）**                                       | 是否需要安全审计或渗透测试？企业的安全准则是什么？是否有 SSL 或 VPN 要求？               |

## 跨功能性需求的挑战

### 难以量化和验证

跨功能性需求的定义通常较为模糊。例如：
- 性能需求可能以“系统应快速响应”描述，但“快速”缺乏具体标准。
- 安全性需求可能以“系统应安全”描述，但安全的程度难以量化。

#### 解决方法
- 使用具体的指标定义需求，例如“响应时间小于 200 毫秒”。
- 借助工具（如 JMeter）进行性能测试，或使用安全扫描工具（如 OWASP ZAP）验证安全性。

### 与功能性需求的冲突

跨功能性需求可能与功能性需求发生冲突。例如：
- 为了提高性能，可能需要简化某些功能。
- 为了增强安全性，可能会增加用户操作的复杂性。

#### 实例：权衡性能与安全性
某在线支付系统在设计时，为了提高性能，采用了分布式架构；但为了保证安全性，又引入了多层加密和双因子认证。


## 如何发现跨功能性需求

![CFR](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/Software-Engineering/CFR/crf.1e8tg7u4l3.webp)

跨功能需求影响着软件的整个生命周期，在项目交付过程中，可以根据软件产品的目标和特点，从以下几个视角来收集和确定跨功能需求：



- **研发团队视角**，关注软件研发过程中的跨功能特性，包括软件架构设计相关的一些特性，如可扩展性、可移植性、可伸缩性、兼容性等。
- **用户视角**，关注软件使用过程中的跨功能特性，关注用户体验，如设备兼容性、可访问性、可配置性等。
- **运维团队视角**，关注软件维护过程中的跨功能特性，包括基础设施运营维护、数据维护、故障恢复相关的一些特性，如性能、可用性、容量、监控、熔断降级策略等。
- **安全审计团队视角**，关注软件全生命周期的安全相关的跨功能特性，大部分企业有专门的安全审计部门，会对软件产品的安全提出很多需求，如可审计性，法律合规性，数据隐私性。


## 解决方案与实践

### 需求优先级的设定

通过与利益相关者协商，明确跨功能性需求的优先级。例如：
- 使用 MoSCoW 方法（Must, Should, Could, Won't）分类需求。
- 在项目初期定义关键性能指标（KPIs）和安全目标。

#### 实例：敏捷开发中的需求优先级
某团队在敏捷开发中，每个迭代周期都会评估跨功能性需求的优先级，并在冲刺计划中分配资源。

### 跨团队协作的重要性

跨功能性需求通常涉及多个团队的协作。例如：
- 开发团队需要与运维团队合作，确保系统的可扩展性。
- 安全团队需要与开发团队合作，进行代码审查和漏洞修复。

#### 实例：DevSecOps 实践
某企业通过 DevSecOps 实践，将安全性集成到开发和运维流程中，确保跨功能性需求在整个生命周期内得到满足。

## 案例分析

### 实际项目中的跨功能性需求处理

在某大型电商平台的开发中，性能和安全性是两个关键的跨功能性需求。通过以下措施，成功满足了这些需求：

1. **性能优化**：
   - 使用 Redis 缓存机制减少数据库查询。
   - 部署 Nginx 负载均衡器分发流量。

2. **安全性增强**：
   - 引入 Web 应用防火墙（WAF）防止常见攻击（如 SQL 注入）。
   - 定期进行渗透测试，发现并修复漏洞。

> 来源：[Redis 官方文档](https://redis.io/documentation)
> 来源：[Nginx 官方文档](https://nginx.org/en/docs/)

### 性能

性能需求通常包括以下几个方面：

1. **响应时间**：用户操作后系统的响应速度。例如，搜索引擎的响应时间通常需要在几百毫秒内完成。
2. **吞吐量**：系统在单位时间内能够处理的请求数量。例如，支付网关需要支持每秒数千笔交易。
3. **资源利用率**：系统在运行时对 CPU、内存和网络等资源的使用效率。

#### 实例：高性能电商平台
某电商平台在促销活动期间，通过以下措施优化性能：
- 使用 Redis 缓存热门商品数据，减少数据库查询压力。
- 部署 CDN（内容分发网络）加速静态资源加载。

> 来源：[Redis 官方文档](https://redis.io/documentation)

### 可扩展性

可扩展性需求确保系统能够随着用户数量或数据量的增长而扩展。主要包括：
1. **水平扩展**：通过增加更多服务器来提升系统能力。
2. **垂直扩展**：通过升级硬件资源（如 CPU 和内存）来提升性能。

#### 实例：分布式数据库
某社交媒体平台采用分布式数据库（如 MongoDB）来存储用户数据，支持动态扩展以应对用户增长。

> 来源：[MongoDB 官方文档](https://www.mongodb.com/docs/)

### 安全性

安全性需求包括以下几个方面：
1. **数据加密**：保护敏感数据在传输和存储中的安全性。
2. **身份验证**：确保只有授权用户能够访问系统。
3. **权限管理**：限制用户对系统资源的访问范围。

#### 实例：OAuth 2.0
某金融应用通过 OAuth 2.0 实现第三方登录，同时保护用户的敏感信息。

> 来源：[OAuth 2.0 规范](https://oauth.net/2/)

## 总结

回到开头的问题，如何处理全球地图资源分布网站的跨功能性需求？可以通过以下步骤：
1. **需求收集**：与各国法律法规专家沟通，了解不同国家的要求，比如使用不同国家官方支持的地图地址。
2. **需求优先级**：使用 MoSCoW 方法确定哪些需求是必须的，哪些是可选的， 这里就是国界。
3. **跨团队协作**：与开发、运维和安全团队密切合作，确保需求在设计和实现中得到满足, 最好实现配置即代码。
4. **测试与验证**：在不同国家的环境中进行测试，确保系统符合各国的法律法规。

当然还有一种最简单的方法，只提供卫星影像地图，不提供边界图层。

### 关键点回顾与未来展望

跨功能性需求是软件开发中不可忽视的一部分。通过合理的需求优先级设定和跨团队协作，可以有效应对这些挑战。未来，随着技术的进步，跨功能性需求的管理将更加智能化和自动化。

## 引用

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Redis 官方文档](https://redis.io/documentation)
* [Nginx 官方文档](https://nginx.org/en/docs/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

