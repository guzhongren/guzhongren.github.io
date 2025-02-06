# 定制你的DrawIO样式


## Why

有时候我们用 DrawIO [在线版](https://app.diagrams.net/)或者 VSCode 插件画图的时候，需要使用自己公司的配色和字体要求来做图；如果一个一个图形的选择，然后输入对应的样式值，这样很浪费时间；作为高效能人士，肯定需要将其形成模板存起来，使用的时候自动读取即可。所谓“一劳永逸”。

最近，写了一片博客，需要将博客里的图用公司的规范来做画，那么就得定制属于我们自己公司规范的样式。

## What

在研究了[https://app.diagrams.net/](https://app.diagrams.net/) 的配置说明后，发现其实定制很容易。只需要在配置中覆盖原有的样式即可。

而对于VS Code 的插件，拿[vscode-drawio](https://marketplace.visualstudio.com/items?itemName=eightHundreds.vscode-drawio)来说，只要在配置中键入自己的配置即可。

当然开始之前需要有自己的规范，如配色或字体等。

## How

### Web 版
#### 配置位置
- 应用-其他-配置
#### 配置信息

```json
{
  "customFonts": [
    "Noto Serif SC",
    "Bitter",
    "Arial",
    "Inter"
  ],
  "presetColors": [
    "none",
    "000000",
    "ffffff",
    "666666",
    "edf1f3",
    "003d4f",
    "f2617a",
    "cc850a",
    "6b9e78",
    "47a1ad",
    "634f7d"
  ],
  "customColorSchemes": [
    [
      {
        "fill": "#ffffff",
        "stroke": "#ffffff"
      },
      {
        "fill": "#003d4f",
        "stroke": "#003d4f"
      },
      {
        "fill": "#f2617a",
        "stroke": "#f2617a"
      },
      {
        "fill": "#cc850a",
        "stroke": "#cc850a"
      },
      {
        "fill": "#6b9e78",
        "stroke": "#6b9e78"
      },
      {
        "fill": "#47a1ad",
        "stroke": "#47a1ad"
      },
      {
        "fill": "#634f7d",
        "stroke": "#634f7d"
      },
      {
        "fill": "#000000",
        "stroke": "#000000"
      }
    ]
  ]
}
```

#### 效果
![web-style](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Tools/DrawIO/web-style.2z3v7akawpe0.webp)

### VS Code  插件版（vscode-drawio）

#### 配置信息

对于插件版本，我们可以将配置信息存储在全局（VS Code菜单-Code-Performances-Setting, 搜索 drawio, 点击任意`Edit in settings.json`）或者当前工程（.vscode/settings.json）,然后将如下配置粘贴进去。

```json
"hediet.vscode-drawio.presetColors": [
    "none",
    "000000",
    "ffffff",
    "666666",
    "edf1f3",
    "003d4f",
    "f2617a",
    "cc850a",
    "6b9e78",
    "47a1ad",
    "634f7d"
  ],
  "hediet.vscode-drawio.colorNames": {
    "000000": "Onyx black",
    "ffffff": "Talc white",
    "666666": "文字和背景3",
    "edf1f3": "Mist grey",
    "003d4f": "Wave blue",
    "f2617a": "Flamingo pink",
    "cc850a": "Turmeric yellow",
    "6b9e78": "Jade green",
    "47a1ad": "Sapphire blue",
    "634f7d": "Amethyst purple"
  },
  "hediet.vscode-drawio.customColorSchemes": [
    [
      { "fill": "#ffffff", "stroke": "#ffffff" },
      { "fill": "#003d4f", "stroke": "#003d4f" },
      { "fill": "#f2617a", "stroke": "#f2617a" },
      { "fill": "#cc850a", "stroke": "#cc850a" },
      { "fill": "#6b9e78", "stroke": "#6b9e78" },
      { "fill": "#47a1ad", "stroke": "#47a1ad" },
      { "fill": "#634f7d", "stroke": "#634f7d" },
      { "fill": "#000000", "stroke": "#000000" }
    ]
  ],
  "hediet.vscode-drawio.customFonts": [
    "Noto Serif SC",
    "Bitter",
    "Arial",
    "Inter"
  ],
```

#### 效果
![preset](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Tools/DrawIO/preset.58se8wl6ltg0.webp)

![font](https://cdn.staticaly.com/gh/guzhongren/data-hosting@main/Tools/DrawIO/font.69qxu1ldebg0.webp)

## 引用

* [博客: https://guzhongren.github.io/](https://guzhongren.github.io/)
* [diagrams.net: https://www.diagrams.net/doc/faq/configure-diagram-editor](https://www.diagrams.net/doc/faq/configure-diagram-editor)
* [vscode-drawio: https://marketplace.visualstudio.com/items?itemName=eightHundreds.vscode-drawio](https://marketplace.visualstudio.com/items?itemName=eightHundreds.vscode-drawio)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

