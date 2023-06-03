# OAuth2.0和OIDC流程梳理


## 场景

日常生活中，我们有很多使用OAuth 或者OIDC 的案例。比如在某串串分店消费完了，使用第三方软件开发票这事。


小明为团队同事在京东上买了很多零食，因为这部分算团建的费用，是可以报销的，然后小明找到了小票软件来打印他在京东商城里的发票。

小明：“你好，小票软件。我正在 Google 浏览器上面，需要访问你来帮我处理我在京东商城店铺的订单信息来生成发票。”
小票软件：“好的，小明，我需要你给我授权。现在我把你引导到京东商家开放平台上，你在那里给我授权吧。”
京东商家开放平台：“你好，小明。我收到了小票软件跳转过来的请求，现在已经准备好了一个授权页面。你登录并确认后，点击授权页面上面的授权按钮即可。”
小明：“好的，京东商家开放平台。我看到了这个授权页面，已经点授权按钮啦”
京东商家开放平台：“你好，小票软件。我收到了小明的授权，现在要给你生成一个授权码 code 值，我通过浏览器重定向到你的回调 URL 地址上面了。”
小票软件：“好的，京东商家开放平台。我现在从浏览器上拿到了授权码，现在就用这个授权码来请求你，请给我一个访问令牌 access_token 吧。”
京东商家开放平台：“好的，小票软件，访问令牌已经发送给你了。”
小票软件：“太好了，我现在就可以使用访问令牌来获取小明店铺的订单信息生成发票了。”
小明：“我已经能够看到我的订单了，现在就开始打印发票了。”

在以下的流程中，大家可以使用如**极客时间**使用**微信**登录的流程，或者某业务系统使用**Keycloak**登录的方式来理解整个技术流转过程。

## OAuth2.0

### 4 种授权许可类型

OAuth2.0 有4种授权许可类型，分别是**授权码许可(Authorization Code)**， **资源拥有者凭据许可(Resource Owner Password Credential)**, **客户端凭据许可(Client Credential)**和**隐式许可（Implicit）**。

以下是一些进行对应类型的发送请求的伪代码

#### 授权码许可(Authorization Code)

```java
String grantType = request.getParameter("grant_type");
if("authorization_code".equals(grantType)){  }

```

#### 资源拥有者凭据许可(Resource Owner Password Credential)

```java
Map<String, String> params = new HashMap<String, String>();
params.put("grant_type","password");
```

#### 客户端凭据许可(Client Credential)

```java
Map<String, String> params = new HashMap<String, String>();
params.put("grant_type","client_credentials");
params.put("app_id","APPIDTEST");
params.put("app_secret","APPSECRETTEST");
String accessToken = HttpURLClient.doPost(oauthURl,HttpURLClient.mapToStr(params));”
```

#### 隐式许可（Implicit）

```java
Map<String, String> params = new HashMap<String, String>();
params.put("response_type","token");
params.put("app_id","APPIDTEST");
String toOauthUrl = URLParamsUtil.appendParams(oauthUrl,params);
```

### Authorization Code 的实现分类

Authorization Code 的实现主要分为2类，一类是无服务器的，使用**PKCE(Proof Key for Code Exchange by OAuth Public Clients)**来实现，使用不广泛；另一类是有服务器的实现，使用广泛且安全。


### Authorization Code 实现的流程图

[OAuth 2.0 Flow](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Security/OAuth/OAuth2.0-Flow.4asvrgzo0ni0.svg)

## OIDC

OAuth2.0 是一种授权协议，而不是身份认证协议。OIDC 才是身份认证协议，而且是基于 OAuth 2.0 来执行用户身份认证的互通协议。更概括地说，OIDC 就是直接基于 OAuth 2.0 构建的身份认证框架协议。

### 其3个角色与OAuth2.0的4个角色的对应关系

以下是OIDC 种的三个角色：
- EU（End User），代表最终用户
- RP（Relying Party），代表认证服务的依赖方，就是上面我提到的第三方软件
- OP（OpenID Provider），代表提供身份认证服务方

OAuth 2.0 的 4 个角色和 OIDC 的 3 个角色之间的对应关系

- 资源拥有者 -> EU
- 第三方软件-> RP
- 授权服务 + 受保护资源-> OP

### OIDC 种的ID_TOKEN

OIDC 种有一个非常重要，从认证服务器下发的一个字段，就是OIDC, 其存储了一些非常有用的信息

- iss，令牌的颁发者，其值就是身份认证服务（OP）的 URL
- sub，令牌的主题，其值是一个能够代表最终用户（EU）的全局唯一标识符
- aud，令牌的目标受众，其值是三方软件（RP）的 app_id
- exp，令牌的到期时间戳，所有的 ID 令牌都会有一个过期时间
- iat，颁发令牌的时间戳

### OIDC 的流程图

[OIDC Flow](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Security/OAuth/OIDC-flow.5y5jucry3000.svg)

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

