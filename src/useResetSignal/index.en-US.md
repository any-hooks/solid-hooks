
# useResetSignal

useResetSignal works similar to `createSignal`, it provides a `reset` method

## Examples

### Default Usage

>>> ./demo/demo1.tsx

## API

```typescript
const [state, setState, resetState] = useResetSignal<S>(
  initialState: S | (() => S),
): [Accessor<S>, Setter<S>, () => void]
```
