# useWatch

Watches one or more reactive data sources and invokes a callback function when the sources change.

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

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

| Property     | Description           | Type                              | Default |
| ------------ | --------------------- | --------------------------------- | ------ |
| deps         | reactive data sources | `Accessor<S> \| AccessorArray<S>` | -      |
| fn           | callback              | `OnEffectFunction`                | -      |
| options      | options               | `OnOptions`                       | -      |
