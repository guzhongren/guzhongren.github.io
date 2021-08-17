---
title: "About"
date: 2020-02-23T15:57:54+08:00
draft: false
author: "谷中仁"
authorLink: "https://guzhongren.github.io"
description: "About me"
license: ""
featuredImage: ""
---

## 简单的自我介绍

哈喽， 大家好， 我是谷中仁， 一枚地理信息系统专业（2015年毕业）的[农名工](http://www.mohrss.gov.cn/SYrlzyhshbzb/jiuye/gzdt/202108/t20210816_420736.html) (开发者)， [freeCodeCamp 西安社区](https://github.com/freeCodeCamp-XiAn)组织者, 开源爱好者；目前是 [Thoughtworks](https://www.Thoughtworks.com/) 的一名 Senior Consultant;

- 2015.03 ~ 2016.10 Esri (中国) 信息技术有限公司西安分公司  售前，售后，技术支持
- 2016.10 ~ 2017.07 图智信息技术有限公司  前端工程师
- 2017.10 ~ 2019.01 西安山脉科技股份有限公司  高级 GIS 开发工程师，前端架构师
- 2019.01 ～ 特沃克软件技术（西安）有限公司  高级咨询师

## 作品

## 技术栈

### 前端

```json
{{</* echarts */>}}
{
    title: {
        text: '前端能力图谱',
        subtext: '取值范围0～5: 0 Do not want to Learn; 1 Want to learn; 2 Practiced some; 3 Can do it; \n 4 Scretching for leadership; 5 Practiced leader.',
        left: 'center',
        align: 'right'
    },
    tooltip: {},
    legend: {
        data: ['期望值', '实际值'],
        left: 10
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [{ name: 'JavaScript', max: 5},
                    { name: 'HTML', max: 5},
                    { name: 'CSS', max: 5},
                    { name: 'Less', max: 5},
                    { name: 'Sass', max: 5},
                    { name: 'TypeScript', max: 5},
                    { name: 'React', max: 5},
                    { name: 'Redux', max: 5},
                    { name: 'Vue', max: 5},
                    { name: 'Vuex', max: 5},
                    { name: 'Angular', max: 5},
                    { name: 'Svelte', max: 5},
                    { name: 'RxJS', max: 5},
                    { name: 'Webpack', max: 5},
                    { name: 'Rollup', max: 5},
                    { name: 'Parcel', max: 5}],
    },
    series: [{
        name: 'Padding(期望-实际)',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            {
                value: [5,5,5,5,5,4,4,4,4,4,3,4,4,4,4,4],
                name: '期望值'
            },
            {
                value: [4,4,4,4,3,3,4,3,3,2,2,1,3,3,3,3],
                name: '实际值'
            }
        ]
    }]
}
{{< /echarts >}}
```
## 关于社区

2018 年 8 月份与韩亦乐一起组织 FCC 西安社区的第一次前端大会，并在 12 月由我和另外几位小伙伴一起负责西安社区建设和运营。

社区运营实行轮流制。每年会举办一些前端，后端技术会议，当然也有一些线下 10 多人人的 Workshop。社区也提供招聘宣传，会议合作等服务，如有需求，可以通过 e-mail, 微信等方式联系我。

## 关于......

> 来日方长，慢慢道来...


GPG KeyID: [D18AEC180356622D](https://github.com/guzhongren.gpg)

----
![谷哥说-微信公众号](/images/wechat/扫码_搜索联合传播样式-标准色版.png)
