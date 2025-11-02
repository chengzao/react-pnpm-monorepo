Base monorepo

> pnpm workspace + changeset

## 同步更新说明（2025-11）

- 根级 ESLint/Prettier 清理与策略变更
  - 已移除根级 lint-staged 配置与相关依赖，参见 [json.devDependencies()](package.json:39) 与此前的 [json.lint-staged()](package.json:25)
  - 已删除根级 [.prettierrc.js](.prettierrc.js:1) 与 [.prettierignore](.prettierignore:1)
  - 清理 [.npmrc](.npmrc:4) 未知项目键：enable-pre-post-scripts / auto-install-peers，避免 npm warn

- Husky 钩子调整
  - [sh.pre-commit](.husky/pre-commit:1) 改为直通（pass-through），不再在根级运行 lint-staged
  - [sh.commit-msg](.husky/commit-msg:1) 使用 pnpm 执行 commitlint：pnpm exec commitlint --edit "$1"

- 子包 ESLint（Flat Config）示例
  - 示例包新增 [js.eslint.config()](example/eslint.config.mjs:1)，启用 TS/React/Hooks/Refresh，放宽部分严格类型规则以适配现有代码
  - 在示例包执行校验：[json.scripts.lint()](example/package.json:9)

- React 依赖策略统一
  - 库包以 peerDependencies 声明宿主依赖版本，避免将运行时框架打入产物
  - [json.peerDependencies()](packages/rslib/package.json:34)：react >=18, react-dom >=18；开发期类型依赖使用 [json.devDependencies.@types-react](packages/rslib/package.json:26) 与 [json.devDependencies.@types-react-dom](packages/rslib/package.json:27)
  - [json.peerDependencies()](packages/ui/package.json:40)：react >=18, react-dom >=18；开发期类型依赖使用 [json.devDependencies.@types-react](packages/ui/package.json:27) 与 [json.devDependencies.@types-react-dom](packages/ui/package.json:27)

- 构建提示
  - rslib 构建已验证通过，见 [json.scripts.build()](packages/rslib/package.json:16)
  - ui 构建失败与 React 依赖无关，源于 Father 插件 API 变化（[ts.loader-less-plugin.ts()](packages/ui/plugin/loader-less-plugin.ts:4) 的 addLoader 不可用），需按当前 father 版本适配或临时移除自定义 loader 验证基础链路

### 迁移使用指引

- 安装依赖（在根目录）
```bash
pnpm install
```

- 在示例包执行 ESLint
```bash
pnpm --filter ./example run lint
```

- 如需在其它子包启用 ESLint，请在该子包新增 eslint.config.mjs（Flat Config），并在其 package.json 增加 lint 脚本
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
