# 基于Strapi开发Headless CMS的基建入门

## 简介

在现代电商和企业网站中，内容需要频繁变更。理想的系统应支持后台灵活编辑内容，前端自动渲染，无需频繁重构和部署。以电商为例，产品信息、价格、描述等常常调整，页面布局也需随时优化。对于缺乏开发经验的运营人员，易用的 CMS 能极大提升效率和响应速度。

## Strapi简介

{{< admonition tip "Tips" true >}}
[Strapi](https://strapi.io/) 是一个 API 级低代码内容管理系统（Headless CMS）。
{{< /admonition >}}

Strapi 是开源、灵活的 Headless CMS，支持多数据库和多前端框架。它提供内容建模、权限管理、插件扩展等能力，适合各种规模项目。前后端分离架构让前端可用 React/Vue/Angular 等技术开发，后端通过 Strapi API 提供数据，提升开发效率、降低维护成本。

主要特性包括：
- **开源**，可自由使用和定制
- **灵活内容建模**，支持多数据类型和关系
- **自动生成 RESTful/GraphQL API**
- **插件机制**，可扩展功能和集成第三方服务
- **多数据库支持**（MongoDB、PostgreSQL、MySQL 等）
- **权限管理**，细粒度控制访问
- **多语言内容管理**
- **活跃社区与丰富文档**

## 主要流程

![dev-with-strapi](https://cdn.jsdelivr.net/gh/guzhongren/picx-images-hosting@master/How-to/Strapi/dev-with-strapi.2ks52vmd6j.webp)

1. 设计内容模型（Content Types/Components）
    - 使用内容类型构建器（Content-Type Builder）将页面的内容抽象出来，形成如 Design Token 级别的组件，和可复用的中度复杂的组件。
2. 创建网站结构及内容
    - 构建网站结构，可通过组合之前创建的各种组件来形成结构。
    - 创建网站的具体内容，如文章、产品、用户等，并使他们关联起来，比如博客需要有作者、分类、标签等。
3. 配置 API 权限与插件
    - 配置 API 的权限，决定哪些用户可以访问、修改、删除内容，一般情况会将所有的内容以只读的方式暴露给前端。
4. 通过 API 管理和获取内容
   - 前端通过 Strapi 提供的 RESTful， StrapiClient 或 GraphQL API 获取内容。
5. 前端动态渲染内容
    - 前端根据内容类型和结构动态渲染页面。

## 主要概念

### Content Types Builder
内容类型构建器是 Strapi 的核心，可视化创建和管理内容类型。支持灵活定义字段、数据类型、验证规则，便于内容建模和结构调整。

### Components
组件实现内容结构复用。可将常用结构（如作者信息、SEO 配置等）封装为组件，在多个内容类型中引用，支持嵌套组合，提升建模灵活性。

### Single Types
单一类型（Single Type）适合全站唯一内容，如“关于我们”、“站点设置”等。每种单一类型仅有一个条目，结构可自定义，便于集中管理全局内容。

### Collections
集合类型（Collection Type）用于管理多条同类内容，如文章、产品、用户等。每个集合类型可包含多个字段和组件，是内容批量管理和 API 构建的基础。

### Dynamic Zones
动态区域（Dynamic Zone）允许在单字段中组合多种组件，实现内容结构高度自定义。适用于富文本、页面构建器等场景，支持多类型组件共存和嵌套。

### API
Strapi 自动为每个内容类型生成 RESTful 或 GraphQL API，支持内容的增删改查，便于前后端分离和多端接入。

### Plugins
插件用于扩展 Strapi 功能，如权限管理、内容版本控制、第三方集成等。官方和社区插件丰富，也支持自定义开发。

## 进阶

使用Strapi API 时有时需要对请求参数进行预处理，比如验证、转换等。可以通过中间件（Middleware）来实现。

### 将请求参数置于 [Strapi Middleware](https://docs.strapi.io/cms/backend-customization/middlewares) 中

如果要获取一个 Global Page的内容，普通情况下，我们会把查询参数放在URL 的query中，比如：

```
http://localhost:1337/api/global?populate[header][populate][0]=navItems&populate[footer][populate][0]=socialLinks.Link
```

通常情况呢，这个 url 的请求参数一般不会改变，每次都要返回Global Page 的所有内容，那么我们就可以把这个请求参数放在中间件中，避免每次都要在 URL 中传递。我们在请求时直接使用url `http://localhost:1337/api/global` 即可，而不用带query参数。
这样做的好处是：
1. 代码可读性更高
2. 减少了 URL 的复杂度
3. 方便后期维护和修改

可通过中间件（Middleware）统一处理请求参数。基本步骤：
1. 可使用 [strapi generate:middleware](https://docs.strapi.io/cms/cli#strapi-generate) 命令生成中间件
    ```sh
    pnpm run strapi generate

    > my-strapi-project@0.1.0 strapi ~/01.Personal/tmp/my-strapi-project
    > strapi "generate"

    ? Strapi Generators middleware - Generate a middleware for an API
    ? Middleware name global-page-populate
    ? Where do you want to add this middleware? Add middleware to an existing API
    ? Which API is this for? global
    ✔  ++ /api/global/middlewares/global-page-populate.ts
    ```
2. 定义中间件函数并处理 `ctx.query`
   ```ts
    import type { Core } from '@strapi/strapi';

    const populate = {
      header: {
        populate: ["navItems"]
      },
      banner: true,
      footer: {
        populate: ["logo", "navItems", "socialLinks"]
      }
    }
    // 获取 dynamic zone 的内容
    // const populate = {
    //   blocks: {
    //     on: {
    //       "blocks.hero": {
    //         populate: {
    //           links: true,
    //           image: {
    //             fields: ["url", "name"]
    //           }
    //         },
    //       },
    //       "blocks.heading-section": {
    //         populate: '*',
    //       }
    //     }
    //   }
    // }

    export default (config, { strapi }: { strapi: Core.Strapi }) => {
      return async (ctx, next) => {
        ctx.query.populate = populate;
        strapi.log.info('In global-page-populate middleware.');
        await next();
      };
    };
   ```
3. 在 `src/api/global/routes/global.ts` 注册中间件
    ```ts
      import { factories } from '@strapi/strapi';

      export default factories.createCoreRouter('api::global.global', {
        config: {
          find: {
            middlewares: ['api::global.global-page-populate'],
          },
        }
      });
    ```
4. 使用API 请求测试等工具测试
    ```sh
    curl 'http://localhost:1337/api/global'
    # 应该返回Global Page 的所有内容
    ```

### 前端动态渲染 Dynamic Zone 组件
前端可根据后端返回的 Dynamic Zone 数据动态渲染组件，为代码如下：
  ```tsx
  ...
  const componentMap: Record<ComponentType, any> = {
    "blocks.hero": Hero,
    "blocks.heading-section": HeadingSection,
    "blocks.card-grid": CardGrid,
    "blocks.content-with-image": ContentWithImage,
    "blocks.faqs": Faqs,
    "blocks.person-card": PersonCard,
    "blocks.markdown": Markdown,
    "blocks.featured-articles": FeaturedArticles,
    "blocks.newsletter": Newsletter,
  };
  ...
   {
      blocksFromAPI.map((block: BlockData) => {
        const Component = componentMap[block.__component];
        return Component ? <Component data={block} /> : null;
      })
    }
  ```

## 总结
Strapi 是一个强大的 Headless CMS，适合快速构建和管理内容驱动的应用。通过灵活的内容建模、API 生成和插件扩展，Strapi 能满足各种项目需求。本文介绍了 Strapi 的基本概念、主要流程和进阶用法，希望能帮助你快速上手。

## 引用

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [Strapi 官方文档](https://strapi.io/documentation/developer-docs/latest/getting-started/introduction.html)
* [Strapi interactive query builder](https://docs.strapi.io/cms/api/rest/interactive-query-builder)
* [Strapi Middleware](https://docs.strapi.io/cms/backend-customization/middlewares)
## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@master/20210819/wechat.ae9zxgscqcg.png)

