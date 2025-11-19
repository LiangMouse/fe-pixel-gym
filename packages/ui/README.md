# @repo/ui

共享的 UI 组件库，基于 Shadcn/ui 风格构建。

## 组件

### Button
```tsx
import { Button } from "@repo/ui/button";

<Button variant="default">点击我</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/card";

<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
  </CardHeader>
  <CardContent>内容</CardContent>
</Card>
```

## 工具函数

### cn (className 合并)
```tsx
import { cn } from "@repo/ui/lib/utils";

<div className={cn("base-class", condition && "conditional-class")} />
```

## 样式

在你的应用中导入基础样式：
```tsx
import "@repo/ui/styles";
```

