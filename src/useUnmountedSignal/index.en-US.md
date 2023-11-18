
# useUnmountedSignal

A Hook can be used to get whether the component is unmounted.

## Examples

### Default Usage

>>> ./demo/demo1.tsx

## API

```typescript
const unmounted: Accessor<boolean> = useUnmountedSignal();
```

### Result

| Property   | Description                        | Type                   |
| ---------- | ---------------------------------- | ---------------------- |
| unmountRef | Whether the component is unmounted | `Accessor<boolean>` |
