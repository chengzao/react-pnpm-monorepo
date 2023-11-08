---
group: 如何使用
order: 2
title: 开发组件
---

<Alert type="error">
  WARNING: 请勿在开发文档中写入与<span style="color: red;">业务相关联的数据</span>，因为目前该页面是面向网络开发，<span style="color: red;">不是私有网络</span>。
</Alert>

## 项目介绍

该项目使用 `pnpm` 的 `workspace` 来管理工作区间。项目 ui 基于 <a href="https://ant.design/" target="_blank">antd v5</a> 版本

```bash
bossjob-monorepo
├── website # 组件文档目录
├── example # 开发示例代码
├── packages # 包的开发目录
│   ├── ui
│   └── ...
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

## 开发流程

推荐使用 `pnpm` 安装依赖. [点击阅读pnpm文档](https://pnpm.io/)

<InstallDependencies npm='$ npm install pnpm -g' yarn='$ yarn global add pnpm'></InstallDependencies>

然后克隆代码仓库 [bossjob-monorepo](https://github.com/YOLOTECHNOLOGY/bossjob-monorepo)

```bash
# https
git clone https://github.com/YOLOTECHNOLOGY/bossjob-monorepo.git
# ssh
git clone git@github.com:YOLOTECHNOLOGY/bossjob-monorepo.git
```

安装依赖: <InstallDependencies pnpm='$ pnpm install'></InstallDependencies>

## 如何开发组件

步骤1: 启动服务开发组件 (文件内容变动会自动打包)

```bash
$ cd packages/ui
$ pnpm dev
```

步骤2: 启动服务可以看组件效果

```bash
$ cd example
$ pnpm dev
```

## 新增组件文档

步骤1: 启动服务开发组件 (文件内容变动会自动打包)

```bash
$ cd packages/ui
$ pnpm dev
```

步骤2: 启动服务可以看组件效果, 建议在 `website/docs/components` 中新增即可

```bash
$ cd website
$ pnpm dev
```
