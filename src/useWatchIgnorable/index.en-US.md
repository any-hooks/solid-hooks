# useWatchIgnorable

Watches for changes in the dependencies.

Calls the provided function when the dependencies change, and return a wrapper function to ignore the listening.

## Examples

### Basic Usage

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

| Property     | Description           | Type                              | Default |
| ------------ | --------------------- | --------------------------------- | ------- |
| deps         | reactive data sources | `Accessor<S> \| AccessorArray<S>` | -       |
| fn           | callback              | `OnEffectFunction`                | -       |
| options      | options               | `OnOptions`                       | -       |
