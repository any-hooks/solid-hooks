
# useResetSignal

提供重置 state 方法的 Hooks，用法与 `createSignal` 基本一致。

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

## API

```typescript
const [state, setState, resetState] = useResetSignal<S>(
  initialState: S | (() => S),
): [Accessor<S>, Setter<S>, () => void]
```
