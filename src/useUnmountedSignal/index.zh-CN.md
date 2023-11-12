# useUnmountedSignal

获取当前组件是否已经卸载的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const unmounted: Accessor<boolean> = useUnmountedSignal();
```

### Result

| 参数       | 说明             | 类型                   |
| ---------- | ---------------- | ---------------------- |
| unmounted | 组件是否已经卸载 | `Accessor<boolean>` |
