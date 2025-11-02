# IFLOW.md

## 项目概述

这是一个基于 pnpm workspace 的 monorepo 项目，旨在管理和开发多个相关的 npm 包。项目使用 [changesets](https://github.com/changesets/changesets) 进行版本管理和发布。主要技术栈包括 React、TypeScript 和各种构建工具（如 Vite, Rollup, Gulp, Rslib, Tsup 等）。

## 目录结构

```bash
base-monorepo
├── docs # 组件文档目录
├── examples # 开发示例代码
├── packages # 包的开发目录
│   ├── check-version # 版本检查示例应用
│   ├── git-del-tags # Git 标签删除工具
│   ├── gulp # 基于 Gulp 的构建配置
│   ├── hooks # React Hooks 库
│   ├── rollup # Rollup 构建配置
│   ├── rslib # Rslib 构建配置
│   ├── tsup # Tsup 构建配置
│   ├── ui # UI 组件库
│   ├── utils # 工具函数库
│   ├── vite # Vite 构建配置
│   └── vitest # Vitest 测试配置
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

## 构建和运行

### 安装依赖

```bash
# 全局安装 pnpm
npm install pnpm -g

# 在根目录安装所有依赖
pnpm install
```

### 开发

```bash
# 并行启动所有包的开发模式
pnpm dev

# 监听模式下构建所有包
pnpm watch

# 构建所有包
pnpm build
```

### 文档

```bash
# 启动文档开发服务器
pnpm doc:dev

# 构建文档
pnpm doc:build
```

### 发布

项目使用 changesets 管理版本发布：

```bash
# 添加要发布的包的变更集
pnpm changeset add

# 更新包版本
pnpm changeset version

# 发布包
pnpm release
```

预发布模式：

```bash
# 进入 alpha 预发布模式
pnpm mode:alpha

# 进入 beta 预发布模式
pnpm mode:beta

# 进入 rc 预发布模式
pnpm mode:rc

# 退出预发布模式
pnpm exit:pre
```

正式版本发布：

```bash
# 发布正式版本
pnpm mode:release
```

## 开发规范

- 使用 pnpm 作为包管理器。
- 使用 husky 和 lint-staged 进行代码风格检查和格式化。
- 使用 commitizen 进行规范化的 commit message。
- Git commit 信息使用英语。
- 各个包使用 father、vite、gulp、rslib 或 tsup 等工具进行构建。
