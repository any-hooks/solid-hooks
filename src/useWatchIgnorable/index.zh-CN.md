# useWatchIgnorable

侦听响应式数据源。

在数据源变化时调用所给的回调函数, 并返回一个用于忽略侦听的包装函数

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

## API

```typescript
type IgnoreUpdateFn = (fn: () => any) => void

function useWatchIgnorable<S, Next extends Prev, Prev = Next>(
  deps: Accessor<S> | AccessorArray<S>,
  fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>,
  options?: OnOptions & { defer?: false },
): IgnoreUpdateFn

function useWatchIgnorable<S, Next extends Prev, Prev = Next>(
  deps: Accessor<S> | AccessorArray<S>,
  fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>,
  options: OnOptions | { defer: true },
): IgnoreUpdateFn
```

### Params

| 参数         | 说明         | 类型                              | 默认值 |
| ------------ | ------------ | --------------------------------- | ------ |
| deps         | 响应式数据源 | `Accessor<S> \| AccessorArray<S>` | -      |
| fn           | 回调函数     | `OnEffectFunction`                | -      |
| options      | 配置项       | `OnOptions`                       | -      |
