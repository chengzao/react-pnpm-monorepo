# AGENTS.md

此文件为在此代码库中工作的 AI 助手提供指导。

## 构建和开发命令

- **单包开发**: 每个包内的 `dev` 命令只能在对应包目录内运行（不能从根目录运行）
- **强制包管理**: `preinstall` 脚本强制使用 pnpm，使用 npm/yarn 会失败

## 关键构建差异

- **rslib 包**: 使用 `@rslib/core` 构建，配置在 `rslib.config.ts`
- **rollup 包**: 传统 rollup 构建，`prepublishOnly` 依赖 `pnpm build`
- **vite 包**: 使用 `rimraf dist` 清理构建目录
- **ui 包**: 使用 father 构建，特殊插件处理 less/sass

## 测试环境

- **vitest 包**: 独立测试环境，使用 `@vitest/browser` 和 playwright
- **单包测试**: 通过各包的 `test` 脚本运行，不是从根目录统一运行
- **tsup 包**: 测试文件在 `test` 目录，不是 `__tests__`

## 包结构和导出模式

- **组件导出**: 主入口文件统一使用命名导出和默认导出混合模式
- **包命名**: scope 包使用 `@learnbase/` 前缀，私有包使用 `antd4-style` 等
- **类型声明**: TypeScript 配置差异较大，每个包有独立的 `tsconfig.json`

## 样式处理

- **rollup 包**: 使用 `rollup-plugin-less` 和 `rollup-plugin-postcss` 处理样式
- **vite 包**: 特殊插件 `vite-plugin-css-injected-by-js` 和 `vite-plugin-lib-inject-css`
- **主题系统**: antd5 集成，需要特殊的样式注入处理

## 版本发布流程

- **changeset 集成**: 使用 `@changesets/cli` 管理版本发布
- **模式发布**: 支持 alpha/beta/rc/release 多种发布模式
- **commit 规范**: 强制使用 conventional commits (通过 husky + commitlint)

## 开发工具

- **lint-staged**: 提交时自动运行 prettier 和 eslint
- **husky**: git hooks 管理，提交时触发规范检查
- **pnpm workspace**: 包间依赖通过 workspace 协议管理

# Agents Rules

This document describes the rules for various AI agents working with this monorepo.

## Alibaba Cloud Tongyi Lingma VSCode Plugin

When generating commit messages for changes related to the Alibaba Cloud Tongyi Lingma VSCode plugin, use the scope `alibaba-cloud.tongyi-lingma`.

Example commit messages:

- `feat(alibaba-cloud.tongyi-lingma): add new feature`
- `fix(alibaba-cloud.tongyi-lingma): resolve issue with code completion`
- `docs(alibaba-cloud.tongyi-lingma): update usage documentation`

These commit messages must follow the Conventional Commits specification and must not include markdown code block indicators.
