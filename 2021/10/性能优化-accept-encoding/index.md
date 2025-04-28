# 性能优化 Accept-Encoding


## 以前的网页请求

{{< mermaid >}}
sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: Can you send me a page?
    Server-->>Browser: Ok（100Kb）
    Browser->>Server: So large?
    Server-->>Browser: Yes
{{< /mermaid >}}

## 人类总是在追求快，更快

随着带宽和基础设施的快速发展，网页显示速度也有迫切需求，随之，就出现了各种各样加速显示网页的技术。

{{< admonition type=tip title="HTTP compression" open=true >}}
**HTTP compression** is a capability that can be built into web servers and web clients to improve transfer speed and bandwidth utilization.  --wikipedia
{{< /admonition >}}

{{< admonition type=tip title="Content Negotiation" open=true >}}

In HTTP, content negotiation is the mechanism that is used for serving different representations of a resource to the same URI to help the user agent specify which representation is best suited for the user (for example, which document language, which image format, or which content encoding).

在 HTTP 协议中，内容协商是这样一种机制，通过为同一 URI 指向的资源提供不同的展现形式，可以使用户代理选择与用户需求相适应的最佳匹配（例如，文档使用的自然语言，图片的格式，或者内容编码形式）。
{{< /admonition >}}

## 内容协商的基本原则

> 一份特定的文件称为一项资源。当客户端获取资源的时候，会使用其对应的 URL 发送请求。服务器通过这个 URL 来选择它指向的资源的某一变体——每一个变体称为一种展现形式——然后将这个选定的展现形式返回给客户端。整个资源，连同它的各种展现形式，共享一个特定的 URL 。当一项资源被访问的时候，特定展现形式的选取是通过内容协商机制来决定的，并且客户端和服务器端之间存在多种协商方式。

![Content Negotiation Principle](https://mdn.mozillademos.org/files/13789/HTTPNego.png)

### 内容协商类别

{{< mermaid >}}
graph LR;
    C{内容协商分类}
    C -->|标准方式| D[客户端设置特定的 HTTP 首部又称为服务端驱动型内容协商机制或者主动协商机制]
    C -->|备选方案| E[服务器返回 300 MultipleChoices 或者 406 Not Acceptable HTTP 状态码又称为代理驱动型协商机制或者响应式协商机制]
{{< /mermaid >}}

随着时间的推移，也有其他一些内容协商的提案被提出来，比如透明内容协商以及 Alternates 首部。但是它们都没有获得人们的认可从而被遗弃。

### 服务端驱动型内容协商机制流程

{{< mermaid >}}
sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: Can you send me a page?[Accept-Encoding: br]
    Server-->>Browser: Ok（20Kb）[Content-Encoding: br]
    Browser->>Server: So fast!
    Server-->>Browser: Yes
{{< /mermaid >}}

当客户端携带消息头（header）发送请求给服务端后，服务端使用消息头里的指定的可接受的压缩方式，自己通过内部特定的算法，找出最佳的压缩方案，然后将数据压缩并返回给客户端。

![HTTPNegoServer](https://mdn.mozillademos.org/files/13791/HTTPNegoServer.png)

#### 用于启动服务端驱动型内容协商标准消息头

{{< mermaid >}}
graph LR;
    C{内容协商分类}
    C -->|Accept| D[该首部的值由浏览器或其他类型的用户代理确定并且会由于上下文环境的不同而不同]
    C -->|Accept-Charset| E[用于告知服务器该客户代理可以理解何种形式的字符编码]
    C -->| Accept-Encoding| F[明确说明了接收端可以接受的内容编码形式所支持的压缩算法]
    C -->| Accept-Language| G[用来提示用户期望获得的自然语言的优先顺序]
{{< /mermaid >}}

这些消息头都是可以带有 Q 因子的清单；比如

|Item|Example|Note|
|--|--|--|
|Accept||在获取 HTML 页面、图片文件、视频文件或者是脚本文件的时候，无论是通过在地址栏中输入资源地址来获取还是通过`<img>`、`<video>` 或 `<audio>` 元素引用都是不一样的。浏览器可以自由使用它们认为最为合适的首部值；|
|Accept-Charset|`ISO-8859-1,utf-8;q=0.7,*;q=0.7`|如今 UTF-8 编码已经得到了广泛的支持，成为首选的字符编码类型，为了通过减少基于配置信息的信息熵来更好地保护隐私信息， 大多数浏览器会将 Accept-Charset 首部移除：Internet Explorer 8、Safari 5、Opera 11 以及 Firefox 10 都已经不再发送该首部。|
|Accept-Encoding| `br, gzip;q=0.8`|将 HTTP 消息进行压缩是一种最重要的提升 Web 站点性能的方法。该方法会减小所要传输的数据量的大小，节省可用带宽。浏览器总是会发送该首部，服务器则应该配置为接受它，并且采用一定的压缩方案。|
|Accept-Language|`de, en;q=0.7`|用户代理的图形界面上所采用的语言通常可以用来设置为默认值，但是大多数浏览器允许设置不同优先级的语言选项。|

某些情况下，服务器会使用 [Vary](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Vary) 消息头来说明实际上哪些消息头被用作内容协商的参考依据（确切来说是与之相关的响应消息头），这样可以使 [缓存](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) 的运作更有效。

#### Vary 响应首部

前面列举的 Accept-* 形式的首部都是由客户端 (Web Client) 给服务端的，[Vary](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Vary) 首部是由服务器在响应 (Response) 中发送的。它标示了服务器在服务端驱动型内容协商阶段所使用的首部清单。这个首部是必要的，它是可以用来通知缓存服务器决策的依据，这样它可以进行复现，使得缓存服务器在预防将错误内容提供给用户方面发挥作用。

{{< admonition type=tip title="Vary" open=true >}}
- 如果 Response 中 Vary 的值是'*'， 那么意味着在服务端驱动型内容协商过程中同时采纳了未在首部中传递的信息来选择合适的内容。
- 并且 Vary 的值是区分大消息的。
{{< /admonition >}}

### 代理驱动型内容协商机制

![代理驱动型内容协商机制](https://mdn.mozillademos.org/files/13795/HTTPNego3.png)

服务端驱动型内容协商机制由于一些缺点而为人诟病——它在**规模化**方面存在问题。在协商机制中，每一个特性需要对应一个首部。如果想要使用屏幕大小、分辨率或者其他方面的特性，就需要创建一个新的首部。而且在每一次请求中都必须发送这些首部。在首部很少的时候，这并不是问题，但是随着数量的增多，消息体的体积会导致性能的下降。带有精确信息的首部发送的越多，信息熵就会越大，也就准许了更多 HTTP 指纹识别行为，以及与此相关的**隐私问题**的发生。

从 HTTP 协议制定之初，该协议就准许另外一种协商机制：代理驱动型内容协商机制，或称为响应式协商机制。_在这种协商机制中，当面临不明确的请求时，服务器会返回一个页面，其中包含了可供选择的资源的链接。资源呈现给用户，由用户做出选择。_

不幸的是，HTTP 标准没有明确指定提供**可选资源链接的页面的格式**，这一点阻碍了将这一过程无痛自动化。除了退回至服务端驱动型内容协商机制外，这种自动化方法几乎无一例外都是通过**脚本技术**来完成的，尤其是 JavaScript 重定向技术：在检测了协商的条件之后，脚本会触发重定向动作。另外一个问题是，为了获得实际的资源，需要**额外发送一次请求**，**减慢了将资源呈现给用户的速度**。

## Accept-Encoding

HTTP Request Header 中的 `Accept-Encoding` 会将客户端（e.g. 浏览器）能够理解的内容编码方式（通常是某种压缩算法）通知给服务端。通过内容协商的方式，服务端会选择一个客户端提议的方式，使用并在响应头 Content-Encoding 中通知客户端该选择。

### 压缩的好处

http 压缩对纯文本可以压缩至原内容的 40%, 从而节省了 60%的数据传输。

实例：访问我的博客网站，可以看到是进过 gzip 压缩的，原始大小为 34kB, 经过压缩后为 7.3kB，只有原先的 21%，在带宽上有很大的性能提升。

文件大小

![gzip](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/gzip.5ibqmeja92c0.png)

gzip 压缩

![accept-encoding](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/accept-encoding.6zr4vfosvjk0.png)

### Gzip 的缺点

JPEG 这类文件用 gzip 压缩的不够好。

### Gzip 是如何压缩的

简单来说， Gzip 压缩是在一个文本文件中找出类似的字符串， 并临时替换他们，使整个文件变小。这种形式的压缩对 Web 来说非常适合， 因为 HTML 和 CSS 文件通常包含大量的重复的字符串，例如空格，标签。

### 语法

```http request header
Accept-Encoding: gzip
Accept-Encoding: compress
Accept-Encoding: deflate
Accept-Encoding: br
Accept-Encoding: identity
Accept-Encoding: *

// Multiple algorithms, weighted with the quality value syntax:
Accept-Encoding: deflate, gzip;q=1.0, *;q=0.5

```

|Accept-Encoding type|Note|
|--|--|
|gzip|表示采用 [Lempel-Ziv coding (LZ77)](http://en.wikipedia.org/wiki/LZ77_and_LZ78#LZ77) 压缩算法，以及 32 位 CRC 校验的编码方式。gzip 是 GNU zip 的缩写，是 GNU 自由软件的文件压缩程序，也用来表示 gzip 文件格式。**浏览器支持的比较好**。|
|compress|采用 [Lempel-Ziv-Welch (LZW)](http://en.wikipedia.org/wiki/LZW) 压缩算法。|
|deflate|采用 [zlib](http://en.wikipedia.org/wiki/Zlib) 结构和 [deflate](http://en.wikipedia.org/wiki/DEFLATE) 压缩算法。使用 LZ77 算法于哈夫曼编码（Huffman Coding）的一种无损压缩算法|
|br|表示采用 [Brotli](https://en.wikipedia.org/wiki/Brotli) 算法的编码方式。|
|identity|用于指代自身（例如：未经过压缩和修改）。除非特别指明，这个标记始终可以被接受。|
|*|匹配其他任意未在该请求头字段中列出的编码方式。假如该请求头字段不存在的话，这个值是默认值。它并不代表任意算法都支持，而仅仅表示算法之间无优先次序。|
|;q= （权重系数）|值代表优先顺序，用相对 [权重系数](https://developer.mozilla.org/en-US/docs/Glossary/Quality_values) 表示，又称为质量价值。|

### 示例

```http request header
Accept-Encoding: gzip

Accept-Encoding: gzip, compress, br

Accept-Encoding: br;q=1.0, gzip;q=0.8, *;q=0.1
```
### 浏览器兼容性

![caniuse](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/caniuse.com_mdn-http_headers_accept-encoding.6p6klanhkcw0.png)

## 最佳实践

对于 Accept-Encoding, 这个除了是后端请求，其他的只能由浏览器来自行设定，建议使用最新的浏览器即可。

对于 content-encoding 这个 header 只能由服务器来指定。针对不同的环境如 Nginx, Apache Tomcat 和 IIS 等，都有不同的配置，这里以 Nginx 为例，在 Nginx 的 *.conf 文件中加入如下代码即可。

```diff
[root@linux /]# vim /usr/local/nginx/conf.d/www.conf
server {
  listen 80;
  server_name www.endvv.com endvv.com;
  root html/bk;
  index index.php index.html;
  access_log /usr/local/nginx/logs/www.log ;
  include /usr/local/nginx/php/www.conf;
  include /usr/local/nginx/wjt/typecho.conf;
+ gzip on;
+ gzip_buffers 4 16k;
+ gzip_comp_level 6;
+ gzip_vary on;
+ gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)
* [HTTP compression](https://en.wikipedia.org/wiki/HTTP_compression#cite_note-1)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此 [文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig) 进行校验： `gpg --verify PayForGuzhongren.svg.sig`

