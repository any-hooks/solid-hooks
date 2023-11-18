# useWatch

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

## API

```typescript
function useWatch<S, Next extends Prev, Prev = Next>(
  deps: Accessor<S> | AccessorArray<S>,
  fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>,
  options?: OnOptions & { defer?: false },
): void

function useWatch<S, Next extends Prev, Prev = Next>(
  deps: Accessor<S> | AccessorArray<S>,
  fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>,
  options: OnOptions | { defer: true },
): void
```

### Params

| 参数         | 说明         | 类型                              | 默认值 |
| ------------ | ------------ | --------------------------------- | ------ |
| deps         | 响应式数据源 | `Accessor<S> \| AccessorArray<S>` | -      |
| fn           | 回调函数     | `OnEffectFunction`                | -      |
| options      | 配置项       | `OnOptions`                       | -      |
