# 整合资源为其他端提供统一资源


## 引子

有些时候，软件开发过程中没有将系统功能，且分开从而将系统拆分为多个子系统，或者在自身系统开发过程中有必须要依赖的外部服务，那么对外提供服务的时候就得让所有的子服务都得随时候命，
排列起来就像古代战场的对战状态一样了。

![apps.png](https://i.loli.net/2020/05/23/bnOYrJMiSzqhKVL.png)

## 存在的问题

对于这种情况存在什么问题呢？ 想象一个场景，作为老板或者业务对接方，我要集成和之前一样的系统，我要对接这么多接口么？如果对接方看到这么多的系统接口要对接，他肯定就放弃治疗了。

总结一下存在的问题。

* 对接系统接口较多，还可能对接很多个域名
* 作为对接方，系统接口出了问题，我得看是哪个系统出问题了，还得去找对应的对接方
* 不同的接口，可能存在不同的甩锅行为
* 乱，新人很难很快上手
* 多则乱，乱则要花很多钱

## 解决方案

对于上面提到的各种问题，我们有什么解决方案呢？

最近，微服务的概念比较流行， 我们想想一下前端微服务是怎么组合的？是不是将很多个子页面服务都集成在一个一面中，最终这个页面为用户服务。让这个页面作为对接点。结合上面的图，我们可以设计如下图的方案， 抽离一个中间层，我们暂时可以称之为 `Platform`，
让所有的资源都从`Platform`进和出，将要集成的各种服务屏蔽在`Platform`后面，对于对接方，他永远只知道一个`Platform`， 这样集成起来就好多了。

![apps-platform.png](https://i.loli.net/2020/05/23/EbGaLkr5g6sHxpK.png)

## Coding

方案也有了，那么接下来就是撸起袖子加油干的时候了。

因为 `Platform` 会是一个后端的工程，其对外提供各种接口和资源；最近`Deno`比较🔥，为了尝试`真香定律`， 我们就拿它来实践一下。

### 业务

对于后端请求另一个后端接口，将请求的结果再返回给请求者，这个很容易实现， 我们就不实现了；那么我们来做一个不同的操作。

#### 业务流程

* 某个后端提供前端资源， 这个资源是由这个后端服务团队维护，且这个服务需要在前端使用

在此， 我们将这个后端资源暂时抽象为`jquery.js`, 提供 jquery.js 服务的团队就是被我们 Platform 屏蔽起来的服务团队， 对我们本次实践来说就是某一个提供 Jquery 的 CDN 服务商。

具体的 [Code](https://github.com/ByteWars/forwardJS) 在此，如有需要可随时查看。在实现过程中也有两种方案，

资源请求的前端页面代码如下，**重点就是 `script`标签中`src`的获取是一个 `GET`请求！**

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="http://localhost:8000/custom/domain/jquery.js"></script>
</head>

```

##### 方案 1

```Typescript
// handlers/fetchJquery.ts

export const redirect = async ({ response }: { response: Response }) => {
  response.redirect(jqueryUrl)
}

```

这种方案是将资源的请求转发到 jquery 的资源服务地址上，让浏览器自动 302 跳转到该地址，进行资源获取。

##### 方案 2

```Typescript
// handlers/fetchJquery.ts

export const getContent = async ({ response }: { response: Response }) => {
  response.body = await fetchResponse(jqueryUrl);
};

// services/fetchResource.ts
export default async (url: string) => {
  return fetch(url).then((res) => res.body);
};

```

这种方案是将资源请求到服务器，然后将资源再返回给前端。

## 总结

对于这两种方案，更加推荐第一种；第一种方案将资源的路径返回给前端然后由浏览器做跳转并将资源请求回来， 而第二种需要将资源请求回来，如果该资源的请求量比较大，那么就得做缓存，相比于第一种，第二种 Platform 在后期维护也不好，而且压力会在 Platform 和被屏蔽的服务那里，多了不必要的麻烦。

## 引用

* [1. 博客：https://guzhongren.github.io/](https://guzhongren.github.io/)
* [2. 图床：https://sm.ms/](https://sm.ms/)
* [3.ForwardJS](https://github.com/ByteWars/forwardJS)
* [4. 了不起的 Deno 实战教程](https://mp.weixin.qq.com/s/J4A5EYL7Kk8cx_X7Kh36Iw)

----
![微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)

