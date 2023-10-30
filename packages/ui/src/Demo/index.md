---
title: Demo
order: 1
group:
  title: Demo
  order: 1
demo:
  cols: 3
toc: content
---

# Demo

Locale : zh-CN

This is an example component.

```jsx
import { Demo } from '@bossjobmatt/ui';

export default () => <Demo title="hello" />;
```

## Badge

### Info Badge <Badge>info</Badge>

### Warning Badge <Badge type="warning">warning</Badge>

### Error Badge <Badge type="error">error</Badge>

### Success Badge <Badge type="success">success</Badge>

## Container 拓展语法

:::info{title=自定义标题}
这是一条普通信息
:::

:::success
这是一条成功信息
:::

:::warning
这是一条警告信息
:::

:::error
这是一条错误信息
:::