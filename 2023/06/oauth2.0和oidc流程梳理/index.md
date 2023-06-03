# OAuth2.0和OIDC流程梳理


## 场景

在日常生活中，有许多使用OAuth 2.0或OIDC的案例。例如，小明使用团建费用在京东商城购买了许多零食，他希望使用第三方软件开发票来报销这部分费用。以下是小明、小票软件和京东商家开放平台之间的对话流程：

小明：“你好，小票软件。我在Google浏览器上需要访问你来处理我在京东商城店铺的订单信息，以生成发票。”

小票软件：“好的，小明，我需要你授权。现在我将引导你前往京东商家开放平台，在那里你可以给我授权。”

京东商家开放平台：“你好，小明。我收到了小票软件的跳转请求，已准备好一个授权页面。请登录并确认后，点击授权按钮即可。”

小明：“好的，京东商家开放平台。我已看到授权页面，并点击了授权按钮。”

京东商家开放平台：“你好，小票软件。我已收到小明的授权请求，现在将为你生成授权码（code）。我会通过浏览器重定向到你的回调URL地址。”

小票软件：“好的，京东商家开放平台。我已从浏览器中获取到授权码，现在将使用该授权码向你请求访问令牌（access_token）。请提供访问令牌给我。”

京东商家开放平台：“好的，小票软件，访问令牌已发送给你。”

小票软件：“太好了，现在我可以使用访问令牌来获取小明店铺的订单信息，并生成发票。”

小明：“我已能够看到我的订单，现在可以开始打印发票了。

在以下的流程中，大家可以使用如**极客时间**使用**微信**登录的流程，或者某业务系统使用**Keycloak**登录的方式来理解整个技术流转过程。

## OAuth2.0

### 4 种授权许可类型

OAuth2.0 有4种授权许可类型，分别是**授权码许可(Authorization Code)**， **资源拥有者凭据许可(Resource Owner Password Credential)**, **客户端凭据许可(Client Credential)**和**隐式许可（Implicit）**。

以下是一些进行对应类型的发送请求的伪代码

#### 授权码许可(Authorization Code)

授权码许可是OAuth 2.0中最常用的许可类型。它的流程如下：

小票软件将用户重定向到京东商家开放平台的授权页面。
用户在授权页面登录并点击授权按钮。
京东商家开放平台生成一个授权码，并通过重定向将用户带回小票软件指定的回调URL。
小票软件从回调URL中获取授权码。
小票软件使用授权码向京东商家开放平台请求访问令牌。
京东商家开放平台验证授权码并颁发访问令牌给小票软件。
小票软件使用访问令牌来获取小明店铺的订单信息，并生成发票。

```java
String grantType = request.getParameter("grant_type");
if("authorization_code".equals(grantType)){  }

```

#### 资源拥有者凭据许可(Resource Owner Password Credential)

资源拥有者凭据许可是一种直接使用用户名和密码进行认证的许可类型。该许可类型要求客户端直接获取用户的凭据，并使用这些凭据向授权服务器进行身份验证。

```java
Map<String, String> params = new HashMap<String, String>();
params.put("grant_type","password");
```

#### 客户端凭据许可(Client Credential)

客户端凭据许可适用于没有资源拥有者参与的情况下，客户端直接与授权服务器进行身份验证并获取访问令牌。

```java
Map<String, String> params = new HashMap<String, String>();
params.put("grant_type","client_credentials");
params.put("app_id","APPIDTEST");
params.put("app_secret","APPSECRETTEST");
String accessToken = HttpURLClient.doPost(oauthURl,HttpURLClient.mapToStr(params));”
```

#### 隐式许可（Implicit)

隐式许可是一种在浏览器中直接向授权服务器请求访问令牌的许可类型。这种许可类型通常用于单页应用程序或移动应用程序，因为它们无法安全地保持客户端凭据。

```java
Map<String, String> params = new HashMap<String, String>();
params.put("response_type","token");
params.put("app_id","APPIDTEST");
String toOauthUrl = URLParamsUtil.appendParams(oauthUrl,params);
```

### Authorization Code 的实现分类

Authorization Code的实现主要分为两类：无服务器实现（使用PKCE）和有服务器实现。

无服务器实现使用PKCE（Proof Key for Code Exchange by OAuth Public Clients）来增加安全性，但应用较少。

有服务器实现广泛使用且更安全。

### Authorization Code 实现的流程图

![OAuth 2.0 Flow](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Security/OAuth/OAuth2.0-Flow.67h7qmku8ak0.svg)

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

![OIDC Flow](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Security/OAuth/OIDC-flow.6le76zwbokc0.svg)

## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [SSO 单点登录和 OAuth2.0 的区别和理解:https://mp.weixin.qq.com/s/4A6_n-5n10Vax67EbBMSCA](https://mp.weixin.qq.com/s/4A6_n-5n10Vax67EbBMSCA)

## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

