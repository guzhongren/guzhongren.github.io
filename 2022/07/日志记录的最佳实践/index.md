# 日志记录的最佳实践

## 简介

日志（Log）是由系统在运行过程中产生的结构化或者非结构化的文字信息。通常情况，可以将其视为应用程序对某个事件（Event）的记录。日志通常可以帮助我们发现一些微服务架构系统的非预期或突发的行为。
Logging作为 Observability的重要组成部分，在我们的系统开发、维护中起到无法替代的作用。

<img src='https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Software-Engineering/Observability/01.Pillars-of-Observability.drawio.5ewrap798t40.webp' alt='Pillars of Observability' style="clear: both; display: block; margin: auto;" />

## 日志的重要性

要理解为什么日志在产品或者系统中扮演着重要的角色，我们必须了解它的价值。至少到现在，日志被应用最广泛的是**报警**、**故障排除**和**业务数据可视化**。

### 报警
日志可以作为我们业务系统监控的重要数据来源；成熟的产品系统都有报警系统，如果系统中出现超过某个已定义的某个指标的问题，日志系统会自动将报警信息发送到通知平台，On-call 的人就可以根据报警信息定位解决问题了。
 <img src='https://grafana.com/static/img/logs/logs-prometheus-alterting.svg' alt='Alert with logs' style="clear: both; display: block; margin: auto;" />
### 故障排除
这种情况非常普遍；想象一下你最近负责开发维护的系统被他人发现有问题，在你梳理完思路之后第一件事是干什么？ 肯定是查看系统信息验证自己的假设是否成立， 这里打印在服务器上的日志就是最好的辅助信息。而作为程序员的我们，日志是我们最熟悉不过的解决问题的利器。
<img src='https://grafana.com/static/img/logs/logs-effective-debugging.gif' alt='Debug with logs' style="clear: both; display: block; margin: auto;" />
### 业务数据可视化
很多公司可以利用存储在自己数据库里的生产环境的日志，结合相应的工具可以对业务进行业务数据可视化。这里最典型的代表是 Grafana 和 SumoLogic。
<img src='https://images.contentful.com/aw6mkmszlj4x/4aSWLe82Z68yjdprQJHnLu/436403e98a0f28af4f38a6da948a84bc/fitbithealthmonitor.png' alt='Grafana - Fitbit Health MonitorDebug with logs' style="clear: both; display: block; margin: auto;"/>

<img src='https://help.sumologic.com/@api/deki/files/7186/Slack_File_And_App_Audit.png?revision=1' alt='SumoLogic - Slack File And App Audit' style="clear: both; display: block; margin: auto;" />

## 怎么做
### 模版化
为了更好的支持上面的各种情况，我们需要对我们的日志格式进行梳理，按照一定的规范来写日志，而不是随便写一句废话。
<img src='https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Software-Engineering/Observability/Logging/logging.25uhyh14zi2o.webp' alt='Logging Format' style="clear: both; display: block; margin: auto;" />
- 基础版本
	- 对于日志，**时间**，**日志级别**，和**日志信息**最为重要，所以一个合格的日志应该至少包含这些信息。
- 高级版本
	- 在基础版的基础上，加入线程名，方法名，类名，方法对应的行数；
	- **线程名**： 多数应用的用户都不是单一的，对于单实例的服务对同一个接口很多用户访问应用会将在不同的线程中执行，这时如果要区分对应用户的业务流程，那么通过线程名是最好的。
	- **主机名**：现在的应用大都部署在 Cloud 中都是多实例的，所以在单节点的基础上，日志在多实例上就需要实例级别的区分，而主机名是最好的区分方式。
	- **方法名**： 打印了日志的方法名，方便区分相同日志的出处。
	- **类名**： 打印了日志的类名，方便快速定位业务流程。
	- **行数**：打印了日志的行数，方便快速定位日志的具体位置。
### 格式化

为了提高日志的可读性，我们可以对日志进行修饰。

- 对日志级别、主机名和线程名前后加**中括号**；
- 对方法名所在的类名和行号加括号，并在类名与行号中间用**冒号**隔开；
- 在行号和日志信息中间加入一个**横线**来分割；
- 对于日志信息也可以进行特定的格式化
  - 对于常规的请求（Request）、响应（Response）或者其他业务日志，可以在自定义信息和参数之间用**下划线**分割；多个参数之间用**逗号**分隔，当然参数也是可选的；
  - 对于错误信息格式化，也可以按照 **Key：Value** 的形式进行组织。

### 链式追踪

记录下了日志，如果只是一行行简单的文字说明，那是没有太大意义的。在复杂系统或业务操作频繁的系统中，会产生非常多的日志，在这种情况下，我们就得花时间去过滤出相关的日志。
解决上面问题的最好办法是日志的**链式追踪**；简单说就是，在每条日志中加入业务系统中的一个或者多个**唯一**的 ID，这样在定位业务问题的时候可以通过这些唯一的 ID 和 其他条件（e.g. 时间）快速过滤出相关的日志。

### 按需记录日志

#### 日志级别

<img src='https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Software-Engineering/Observability/Logging/Log-level.1p6czhkrcnr4.webp' alt='Log Level' style="clear: both; display: block; margin: auto;" />

日志的输出都是分级别的，不同的场景需要打印不同级别的日志；以下是几个比较重要的日志级别。

- **Debug**: 记录技术细节，和一些帮助理解系统运行的日志;
- **Info**: 记录业务信息的日志;
- **Warn**: 非紧急且可控的可接受的错误信息;
- **Error**: 非期望的错误或者系统表现，通常是由系统bug或者环境问题导致。

同时不是所有的日志都需要记录，我们要做到按需记录。下表是推荐在不同的环境选择不同的日志级别。
| Environment | Log Leave |
|---|---|
| Dev | Debug |
| Test | Debug |
| UAT | Info |
| Prod | Info |

#### 日志位置

有了日志级别，日志打印的位置也需要明确。一般情况下：
- 其他系统调用自有系统时需要在收到请求和完成请求时各打印一次日志；
- 自有系统调用第三方系统的接口前和收到返回信息后各打印一次日志；
- 在系统任何有异常的地方需要打印日志；

还有一种特殊情况是，像消息传递之类的系统，为了节省日志存储和减少查看干扰，大多时候我们不需要在收到消息后直接打印该消息，一般建议在收到消息后，如果系统处理有异常，在异常中将原始消息打印。
## 工具推荐
不同的编程语言有不同的日志工具；比较著名的是 Apache 的 [Log4j](https://logging.apache.org/log4j), Log4j是高度可配置的，并可通过在运行时的外部文件配置。它根据记录的优先级别，并提供机制以指示记录信息到许多的目的地，诸如：数据库，文件，控制台，UNIX系统日志等；而且 log4j 已经被移植到了其他编程语言中了，如 Python 中的 [logging](https://docs.python.org/3/library/logging.html), NodeJS 中的[log4js](https://www.npmjs.com/package/log4js), Rust 中的[log4rs](https://crates.io/crates/log4rs)。
## 注意点

- 避免打印或记录任何敏感信息，包括但不限于各种PII，PCI信息，一定要记得遵守当地的各种法律法规，如中国的《个人信息保护法》（PILI）, 欧洲的一般数据保护条例GDPR等
- 按需选择合适的日志级别和日志位置
- ......
## 总结
好的日志不仅可以为程序开发提供便利，为故障排除提供最重要的辅助信息，更可以为业务或基础设施提供优化建议或数据统计。

## 引用

- [THE TOP 25 GRAFANA DASHBOARD EXAMPLES](https://logit.io/blog/post/the-top-21-grafana-dashboards-and-visualisations)
- [Grafana lab](https://grafana.com/)
- [SumoLogic](https://www.sumologic.com/)
- [Log4j](https://logging.apache.org/log4j)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

