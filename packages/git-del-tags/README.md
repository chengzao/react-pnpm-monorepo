# 🧹 git-del-tags

> 一款跨平台 Node.js CLI 工具，用于安全地批量删除 Git 标签（本地 + 远程）

---

## 🚀 功能特性

- ✅ 支持 `--dry-run` 模式（仅预览）
- ✅ 支持 `--remote-only` / `--local-only`
- ✅ 并行删除远程标签（可通过 `--concurrency` 限制）
- ✅ 兼容 macOS / Linux / Windows
- ✅ 交互式确认，避免误删

---

## 📦 安装

```bash
npm install -g git-del-tags
```

## 用法示例

```bash
# 删除本地 + 远程标签
git-del-tags "main_2025_10_28_v*"

# Dry-run 预览
git-del-tags "main_2025_10_28_v*" --dry-run

# 仅删除远程
git-del-tags "main_2025_10_28_v*" --remote-only

# 仅删除本地
git-del-tags "main_2025_10_28_v*" --local-only

# 控制并行删除数（默认5）
git-del-tags "main_2025_10_28_v*" --concurrency=10
```
