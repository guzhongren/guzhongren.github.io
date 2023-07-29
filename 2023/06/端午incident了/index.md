# 端午Incident了


## 前言


现在，我们作为Ops 维护这一个新加坡的项目，项目还是比较复杂的。端午前一天00：00 上线了很多hotfix, 而这里面就隐藏了2个bug。

## 回顾

技术层面，有两个bug，一个Job运行时，数据库CPU 拉满，一个少了Redis 初始化，导致从Event Hub 发送过来的数据无法处理。

业务层面, 数据库CPU 拉满，导致业务数据无法处理；另一个Redis 初始化失败，影响到所有用户数据同步及奖励转换的问题。

### 数据库CPU 拉满

```sql
select * from "table" where columnName='value'
```

新的代码修改是根据数据库某一列去查找对应的数据，然而Dev 对于这一列并没有添加索引，导致在Job 运行，Job 运行时间过长，通过数据库指标的dashboard 查看，数据库CPU 爆满,进而对该Job 的代码重新review， 发现时数据库查询没有加索引的问题。

发现有问题后，我们开始分析是否可以回滚该服务；但是发现该服务还涉及到其他hotfix, 如果这个service rollback，那么还有其他2个service 也需要回滚，影响面比较大。最终，我们的解决方案是，hotfix 依旧上线，但是涉及的Daily Job 从任务中删除，并且在第二天晚上定时任务执行的时候再次确认是否又执行了。


是不是感觉不应该出现这样的问题？

是的, 但为什么还是出现了这样的事故呢？个人认为原因很简单:

* 在low env 没有足够的数据对新的代码更改做充分的压力测试，只是完成的对应的功能
* Review 时没有发现该问题，不可否认，这完全是Reveiwer 的经验问题

### Redis 没有初始化

## 收获

* 在数据库中查询，基本都需要考虑加索引
* 在出现Incident 时，全员应该随时支持，所谓Standby 

## 总结


## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)

## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

