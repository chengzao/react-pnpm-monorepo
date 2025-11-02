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
│   ├── ui
│   └── ...
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

## 🆕 架构优化

### 依赖管理优化

- **版本独立性**: 各包可独立选择React、antd等依赖版本，避免强制统一
- **pnpm配置优化**: 支持peer dependency差异，允许版本灵活性
- **清理依赖**: 移除根级别的外部依赖，减少冲突

### ESLint现代化

- **版本升级**: 从 ESLint 8.x 升级到 9.x（flat config）
- **配置统一**: 使用统一的 `eslint.config.mjs` 替代分散配置
- **现代化规则**: 包含TypeScript、React Hooks、代码质量规则

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

## 代码检查

### ESLint (v9.x)

```bash
# 运行ESLint检查
npx eslint .

# 自动修复可修复的问题
npx eslint . --fix

# 检查特定文件
npx eslint src/
```

### 代码格式化

```bash
# 运行Prettier格式化
npx prettier --write .
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

## 发布命令

- 预发布模式

```bash
pnpm run exit:pre # 退出预发布版本模式. e.g: 0.0.1-alpha.1 | 0.0.1-beta.1 | 0.0.1-rc.1

pnpm run mode:alpha # alpha版本. e.g: 0.0.1-alpha.1

pnpm run mode:beta # beta版本. e.g: 0.0.1-alpha.1

pnpm run mode:rc # rc版本. e.g: 0.0.1-rc.1
```

- 正常包版本

```bash
pnpm run mode:release # 正式版本. e.g: 0.0.1
```

## OTHER

- verdaccio 快速搭建本地npm镜像测试
