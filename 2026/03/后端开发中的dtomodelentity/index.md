# 后端开发中的 DTO,Model,Entity


AI 发展的太猛了，人人都是程序员，程序员成了最容易被代替的职业。一个被程序员写出来的程序来代替程序员了。

## 可替代性

程序运行之所以高效，是因为有良好的架构，算法等方法论的有效性集成。如果程序都有非专业人员来写，可能会面临很多问题，比如写出来的程序效率低下，安全性差，维护困难等问题。

可用不等于可维护，可持续演进。

如果没有专业程序员，世界上的信息化将会在现有的基础上停滞不前，甚至可能会倒退。因为没有专业程序员来维护和改进现有的系统，可能会导致上层系统出现漏洞和安全问题，甚至可能会导致系统崩溃。

至于 AI 写出来的高效的二进制代码，我们大可不必担心，代码不是越接近原生越好，至少，代码也能被审计和阅读。

虽然 AI 发展很快，但架构层面的知识仍是所有高效架构的基础，比如在哪里使用 DTO，Model，Entity 等等。AI 可以帮助我们写代码，但它不能替代我们对架构的理解和设计能力。

## DTO,Model,Entity 的定义和区别

![DTO,Model,Entity](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/Arch/system-design/dto-model-entity.drawio.2rvon2d8qd.svg)

DTO,Model,Entity 在系统实现中有不同的左右，不能将 所有的数据定义都放在一个地方，而是在不同的地方要有不同的实现，然后在不同的层之间实现转换。

### DTO

DTO, Data Transfer Object，数据传输对象，是数据在多个层级之间传递时使用的对象。它通常是一个简单的对象，包含了需要传递的数据字段，没有业务逻辑和方法。DTO 的主要作用是为了减少层与层之间的耦合，提高系统的可维护性和可扩展性。

一般的 DTO 都是 POJO（Plain Old Java Object），即普通的 Java 对象，它包含数据字段和 getter/setter 方法，但不包含任何业务逻辑。

DTO 的主要作用是封装数据，并定义数据传输的格式，以便在多个层级之间传递。

一般，DTO 在 Controller 层和 Service 层之间传递数据，或者在 Listener 层和 Service 层之间传递数据。

`RequestDTO` 通常要实现一个 `from` 方法，将 `RequestBody` 转换成 `Model` 对象；`ReesponseDTO` 通常要实现一个 `to` 方法，将 Model 对象转换成 `ResponseDTO` 对象。

DTO 可用于接受下游系统传递来的数据，也可以向上游系统发送数据。

### Model

Model, 模型，是数据在系统内部流转的基本单元，它通常包含了业务数据，并提供对数据的操作方法。

Model，通常只在 Service 层流转，与上游系统或数据库打交道的时候，需要将其转换成 Entity 对象或者发往第三方的 DTO 对象。

### Entity

Entity, 实体，是数据在数据库中的存储单元，它通常包含了业务数据，并提供对数据的操作方法。Entity 通常是一个 ORM（Object-Relational Mapping）对象，它与数据库表结构一一对应，包含了数据字段和 getter/setter 方法，并且通常还包含了数据库操作的方法。

Entity，通常只在数据库打交道，由 Service 层转换成 Entity 对象进行数据库操作，或者将数据库查询出来的 Entity 对象转换成 Model 对象进行业务逻辑处理。


## 结论

AI 发展很快，但架构层面的知识仍是所有高效架构的基础，比如在哪里使用 DTO，Model，Entity 等等。AI 可以帮助我们写代码，但它不能替代我们对架构的理解和设计能力。

