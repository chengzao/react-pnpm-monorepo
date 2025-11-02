# Alibaba Cloud Tongyi Lingma VSCode Plugin Git Commit Rule

## Rule Type

Always

## Rule Content

When working on the Alibaba Cloud Tongyi Lingma VSCode plugin, all git commits must follow the Conventional Commits specification with the specific scope `alibaba-cloud.tongyi-lingma`.

## Guidelines

1. All commit messages must be in English
2. Use the following format: `<type>(alibaba-cloud.tongyi-lingma): <description>`
3. Types include but are not limited to:
   - feat: A new feature
   - fix: A bug fix
   - chore: Routine tasks, maintenance, and updates
   - docs: Documentation changes
   - style: Code style changes (white-space, formatting, missing semi-colons, etc)
   - refactor: Code refactoring
   - perf: Performance improvements
   - test: Adding or modifying tests

## Examples

Good examples:

- feat(alibaba-cloud.tongyi-lingma): add new completion provider
- fix(alibaba-cloud.tongyi-lingma): resolve authentication issue
- chore(alibaba-cloud.tongyi-lingma): update dependencies
- docs(alibaba-cloud.tongyi-lingma): improve installation guide

Bad examples:

- update plugin (missing type and scope)
- feat: add new feature (missing scope)
- fix(plugin): fix bug (wrong scope name)
