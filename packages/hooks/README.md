# @repo/hooks

共享的 React Hooks。

## 使用示例

```tsx
import { useScroll } from "@repo/hooks";

function MyComponent() {
  const scrollY = useScroll();
  return <div>当前滚动位置: {scrollY}px</div>;
}
```

