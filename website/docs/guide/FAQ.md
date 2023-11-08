---
group: 如何使用
order: 4
title: FAQ问答
---

## 1.关于项目

使用的是 <a href="https://pnpm.io/" target="_blank">pnpm</a> v8版本 的 workspace 管理多项目； <a href="https://github.com/changesets/changesets" target="_blank">changeset</a> 管理发布包版本；

其中一些组件基于 <a href="https://ant.design/" target="_blank">Antd v5</a> 版本二次开发，后续可以替换为其他的。

## 2.样式隔离

目前使用的是`css-in-js`的方式，采用的是 <a href="https://emotion.sh/docs/introduction" target="_blank">Emotion</a>。

## 3.关于打包

目前在 `packages` 目录下的打包工具，是不限制的。如果有更好的可以替换

需要注意的是打包产物最好保持与现有结构一致，最好生成 `cjs` 与 `esm` 目录,
有 `umd` 格式也可以。

```bash
dist
├── cjs
│   ├── Skills
│   │   ├── index.d.ts # 非必须
│   │   └── index.js
│   ├── index.d.ts # 非必须
│   └── index.js
└── esm
    ├── Skills
    │   ├── index.d.ts # 非必须
    │   └── index.js
    ├── index.d.ts # 非必须
    └── index.js
```

如果生成的是包含 `cjs` 与 `ES Modules` 格式的文件，但是目录不完全一致，可以更改相应包目录下的
`package.json`文件中的配置

```json
{
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/esm/index.d.ts",
  ...
}
```

## 4.关于文档库

项目文档基于 <a href="https://d.umijs.org/" target="_blank">dumi2</a> ，使用的是theme为<a href="https://github.com/KuangPF/dumi-theme-antd" target="_blank">dumi-theme-antd</a> 。

如开发中遇到一些问题请参考以上提供的文档。

## 5.轻量级私有仓库

- 1. 安装 <a href="https://verdaccio.org/" target="_blank">verdaccio</a>: 快速搭建基于 Node.js 的轻量级私有仓库，可用于本地发包测试

<InstallDependencies npm='$ npm install --global verdaccio' yarn='$ yarn global add verdaccio'></InstallDependencies>

- 2. 命令行使用

```bash
$ verdaccio
```

## 6.commit提交

1. Install commitizen globally, if you have not already.

```bash
npm install -g commitizen
```

2. Install your preferred commitizen adapter globally (for example cz-conventional-changelog).

```bash
npm install -g cz-conventional-changelog
```

3. Create a .czrc file in your home directory, with path referring to the preferred, globally-installed, commitizen adapter

```bash
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

4. You are all set! Now cd into any git repository and use `git cz` instead of git commit, and you will find the commitizen prompt.

```bash
git cz
# or
npx cz
```
