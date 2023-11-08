---
group:
  title: 如何使用
  order: 2
title: 发布版本
order: 3
---

<Alert type="info">
  推荐使用 changeset 管理发布包. <a href="https://github.com/changesets/changesets" target="_blank">点击阅读changeset文档</a>
</Alert>

## Changeset <Badge type="success">推荐</Badge>

- 版本号控制 参考 [Semantic Versioning](https://semver.org/)

```bash
major # 大版本
minor # 小版本
patch # 打补丁修复BUG
```

- 正常发包 (`0.0.1`)

```bash
# step1 添加要发布的包
npx changeset add

# step2 更新包版本
npx changeset version

# step3 发布包
npx changeset publish
```

- 预发布包 `0.0.3-alpha.1`（`alpha | beta | rc`）[Read Pre Version Doc](https://github.com/changesets/changesets/blob/main/docs/prereleases.md)

```bash
# 进入 Pre releases , 发布测试版本
npx changeset pre enter alpha   # 发布 alpha 版本
npx changeset pre enter beta    # 发布 beta 版本
npx changeset pre enter rc      # 发布 rc 版本

npx changeset add # 添加发布包
npx changeset version # 更新版本
npx changeset publish # 发布版本

# 退出 Pre releases 模式
npx changeset pre exit
```

- 进入预发布模式后,如果中途添加错了一些信息。可以在 `.changeset/pre.json`文件中修改相关信息，修改完后就即可发布

- 退出预发布模式即可发布正常包版本

## GitHub Actions

### 发布包

- 触发规则：`packages` 目录下 `package.json` 中 `version` 有变化，并且推送到 `main` 分支会自动发布

- 具体配置在项目根目录下 `.github/workflows/release.yml`

### 发布文档

- 修改`website` 目录文档，并且推送到 `develop` 分支会自动发布

- 具体配置在项目根目录下 `.github/workflows/gh-pages.yml`

## 其他工具

待补充
