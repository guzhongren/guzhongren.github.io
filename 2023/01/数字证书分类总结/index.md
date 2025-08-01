# 数字证书分类总结


## 数字证书定义

数字证书就是互联网通讯中标志通讯各方身份信息的一串数字，数字证书由经国家工信部认证的权威机构——CA 机构发行，是身份认证机构盖在数字身份证上的一个章或印(或者说加在数字身份证上的一个签名)，人们可以在网上用它来识别对方的身份。

### 作用

- 信息的保密性
- 交易者身份的确定性
- 不可否认性
- 不可修改性

## 常见标准

### 符合 PKI ITU-T X509 标准，传统标准（.DER .PEM .CER .CRT）

X509 是数字证书的基本规范，而 P7 和 P12 则是两个实现规范，P7 用于数字信封，P12 则是带有私钥的证书实现规范。

基本的证书格式，只包含公钥。
x509 证书由用户公共密钥和用户标识符组成。此外还包括

- 版本号
- 证书序列号
- CA 标识符
- 签名算法标识
- 签发者名称
- 证书有效期等信息。

### 符合 PKCS#7 加密消息语法标准(.P7B .P7C .SPC .P7R)

Public Key Cryptography Standards #7

一般主要用来做数字信封。
一般把证书分成两个文件，一个公钥、一个私钥，有 PEM 和 DER 两种编码方式

- PEM 比较多见，是纯文本的，一般用于分发公钥，看到的是一串可见的字符串，通常以.crt，.cer，.key 为文件后缀
- DER 是二进制编码

### 符合 PKCS#10 证书请求标准(.p10)

证书请求语法

### 符合 PKCS#12 个人信息交换标准（.pfx \*.p12）

Public Key Cryptography Standards #12

一种文件**打包格式**，为存储和发布用户和服务器私钥、公钥和证书指定了一个可移植的格式，是一种**二进制**格式，通常以**.pfx**或**.p12**为文件后缀名。
使用 OpenSSL 的 pkcs12 命令可以创建、解析和读取这些文件。
P12 是把证书压成一个文件，**xxx.pfx** 。主要是考虑分发证书，私钥是要绝对保密的，不能随便以文本方式散播。所以 P7 格式不适合分发。.pfx 中可以加密码保护，所以更安全。

## Covert

数字证书格式之间是可以相互转换的，只是需要在特定的转换过程中，使用特定的参数，比如有的转换需要私钥， 有的转换需要密码。

![Digital-Cert](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/Security/Degital-Cert.3y4w8ewfimc0.webp)

## SSL 证书分类

### DV SSL 证书（域名型）

只验证域名所有权，在浏览器中显示锁形标志；

#### 适用

- 个人网站或者小微企业使用

#### 优点

- 申请容易 - 颁发快 - 价格较低

#### 缺点

- 证书中无法显示企业信息 - 安全性较差

### OV SSL 证书（企业型）

验证域名所有权以及申请的主体身份的合法性

#### 适用

中小型企业、企事业单位官网使用

#### 优点

- 安全性较高，可点击浏览器小锁标志查看证书信息

### EV SSL 证书（增强型）

Extended Validation（EV）证书是目前高信任级别的 SSL 证书

#### 适用

- 大型商业网站或者是对网站安全有较高要求的公司。可在绿色地址栏显示公司名称

### 优点

- 证书颁发机构对此的审核比较严格

## 根据域名分类

![Domain](https://www.wosign.com/column/images/ssl_20211231_1.png)

### 单域名证书

这类证书只保护一个域名，这些域名形如www.abc.com；bcd.com；a.store.cn等; 默认是可以保护不带 www 的主域名，但是当你为其他前缀的子域名申请证书时，则只能保护当前子域名，不能保护不带前缀的主域名。

### 多域名证书

这种类型的证书可以同时保护多个域名，例如：同时保护www.abc.com、bcd.com；a.store.cn等; 不同品牌的多域名证书默认保护的域名数量不一样。

### 通配符证书

通配符证书可以保护一个域名下的同级子域名，并且不限制子域名的数量。例如：这类证书可以保护 free.abc.com，也可以保护 bbs.abc.com，也就是说他可以保护 abc.com 这个域名下的所有同级子域名

### 代码签名证书（Code Signing Certificates）

为软件开发者提供代码软件数字签名的认证服务。通过对代码的数字签名可以减少软件下载时弹出的安全警告、保证代码不被恶意篡改、使厂商信息对下载用户公开可见等效果，从而建立良好的软件品牌信誉度。
查看[腾讯 CSC](https://cloud.tencent.com/product/csc) 一看便知。

## CA

要被别人信任，那么就得有个可靠的证书颁发机构。以下是一些比较著名的证书颁发机构。

- [Digicert (收购 #Symantec )](https://www.digicert.com/)
- [中国金融认证中心(CFCA)](https://www.cfca.com.cn/)
- [GeoTrust](https://www.geotrust.com/)
- ...

## 引用

- [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
- [http://www.youdzone.com/signature.html](http://www.youdzone.com/signature.html)
- [https://www.chinassl.net/ssltools/convert-ssl.html](https://www.chinassl.net/ssltools/convert-ssl.html)
- [https://www.wosign.com/column/ssl_20211231.htm](https://www.wosign.com/column/ssl_20211231.htm)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

---

![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)





![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)

> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

