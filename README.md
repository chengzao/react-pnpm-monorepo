Base monorepo

> pnpm workspace + changeset

## 前期准备

- [pnpm文档地址](https://pnpm.io/installation)
- [changeset文档地址](https://github.com/changesets/changesets)

## 目录结构

```bash
base-monorepo
├── docs # 组件文档目录
├── examples # 开发示例代码
├── packages # 包的开发目录
│   ├── ui
│   └── ...
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

## 如何开始

- 安装 `pnpm`

```bash
npm install pnpm -g
```

- 进入`根目录`安装依赖

```bash
pnpm install
```

## PNPM

> 更多使用命令去官网查看 [详细文档地址](https://pnpm.io/installation)

```bash
# 安装全局包
# -w : workspace（根路径）
# -D : devDependencies
pnpm install packageA -wD

# 对特定 packages目录下的 @learnbase/ui 安装包
pnpm add packageB --filter @learnbase/ui

# packages目录下包的互相引用
# 例如：examples下依赖packages下的 @learnbase/utils
# 进入examples目录下，执行如下
pnpm add @learnbase/utils

# 此时 package.json 下产生
"dependencies": {
  "@learnbase/utils": "workspace:^"
}
```

## 如何新建包

- 进入`packages`目录
- 使用(vite、rollup等工具)新建工程并初始化
- 修改package.json `"name": "@learnbase/xxx"` 字段
- package.json配置的[详细文档地址](https://docs.npmjs.com/cli/v10/configuring-npm/package-json/)

## 如何发包

当前采用的是 [changeset](https://github.com/changesets/changesets) 管理工具

- 正常发包

```bash
# step1 添加要发布的包
npx changeset add

# step2 更新包版本
npx changeset version

# step3 发布包
npx changeset publish
```

- 预发布包（进入预发布模式 - 发包 - 退出预发布模式）[Pre releases docs](https://github.com/changesets/changesets/blob/main/docs/prereleases.md)

```bash
# 进入 Pre releases , 发布测试版本
npx changeset pre enter alpha   # 发布 alpha 版本
npx changeset pre enter beta    # 发布 beta 版本
npx changeset pre enter rc      # 发布 rc 版本

npx changeset # 添加发布包
npx changeset version # 更新版本
npx changeset publish # 发布版本

# 退出 Pre releases 模式
npx changeset pre exit
```

- 退出预发布模式即可发布正常包版本

## OTHER

- verdaccio 快速搭建本地npm镜像测试
