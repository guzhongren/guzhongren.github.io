# Tech Debt


## 缘由

做软件开发，不可避免的事就是用户需求的变化或者细化，和业务的不断迭代，那么对于开发者而言，最重要的事什么呢？我想有一条非常重要：及时将系统中存在的各种 bug，或者遗留问题快速解决。

比如前后端中的软件依赖升级，避免远端大版本升级导致项目需要进行大更改的问题；将系统中原有由 JDBC 实现的 Repository 层由 JPA 实现，提升开发效率，避免手写 SQL 的问题，且可以加快开发效率；再或者项目刚开始，将所有的功能都集中在一个项目中，随着项目的不断扩张，需要将系统的部分功能拆分出来作为一个单独的服务，实现服务的独立发布，部署；并且可以被其他服务消费，减轻原有服务的职责。

## Tech debt 是什么

如上描述，在开发中我们会有各种各样的问题存在，在一个迭代里，一方面要实现客户价值，另一方面不能放入太多的技术债卡，所以哪些遗留问题不会被立即解决掉，那么随着时间的流失，遗留问题就会原来越多。

这是优先考虑快速交付而不是完美代码的结果。

`Tech debt`: 团队为了加快交付速度而降低了代码或者架构层面的良好设计，或者对已有系统缺少更好的设计或测试。

## 常用方案及设计

明白了什么是 Tech Debt，那么肯定有一些业界的 Best Practice 可以参考，下面列出我设计的方案。

步骤：

* 收集
* 分析
* 形成功能卡

### Tech debt 收集

|Id|Problem description|Difficulty[easy, hard]|Importance[low, high]|Service involved|Related resource|
|--|--|--|--|--|--|
|1|Upgrade dependences|easy|high|||
|||||||

#### 说明

* Problem description: 阐明问题原因，及导致的结果
* Difficulty: 解决该问题的困难程度
* Importance: 解决该问题后带来的价值
* Service involved: 问题所涉及的服务
* Related resource: 解决该问题可用的资源

根据上面的表格，组织会议，让大家填写自己所能想到的所有的技术债，然后对每一条技术债进行说明，对齐认识。然后对每一条从 Difficulty 和 Importance 角度进行投票。

#### 分析

在投票完成后需要对所有条目进行梳理分类，可以按照下面的表格进行分类。

```shell
   ^
  I|      View result immediately       |     Split & Plan
  m|                                    |
  p|                                    |
  o|                                    |
  r|                                    |
  t|                                    |
  a|                                    |
  n|                                    |
  c|                                    |
  e|                                    |
   |                                    |
   ------------------------------------------------------------------------------>
   |                                    |
   |      Fix it if have spare time     |     Let it go
   ------------------------------------------------------------------------------>
                                                                      Difficulty
```

说明：

* 横轴：从左到右 Difficulty 由简到难；
* 纵轴：从下到上 Importance 由低到高；
* `Fix it if have spare time`: 有时间就修复；
*	`View result immediately`: 立即处理，因为简单且重要；
*	`Split & Plan`: 问题困难并且比较重要，需要拆分并安排进迭代；
*	`Let it go`： 问题简单但是实现比较困难，有记录就行，如果有时间再实现即可。

## 产出是什么

对于分析后的问题，按照其所在的不同区域的重要程度，一般需要将`Fix it if have spare time`, `View result immediately`和`Split & Plan`这三个区域的问题梳理为卡（业务卡，技术卡或者 Bug 卡），分在不同的迭代去做。

## 模板

介于此制作了一个可以复用的模板。
[Tech debt: https://www.figma.com/file/7EzjLtMRXKcaJrGEmudLwC/%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1?node-id=181%3A4](https://www.figma.com/file/7EzjLtMRXKcaJrGEmudLwC/%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1?node-id=181%3A4)

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)

* [Technical Debt:https://www.productplan.com/glossary/technical-debt/](https://www.productplan.com/glossary/technical-debt/)
* [Tech debt: https://www.figma.com/file/7EzjLtMRXKcaJrGEmudLwC/%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1?node-id=181%3A4](https://www.figma.com/file/7EzjLtMRXKcaJrGEmudLwC/%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1?node-id=181%3A4)
## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

