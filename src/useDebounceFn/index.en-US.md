# useDebounceFn

A hook that deal with the debounced function.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const {
  run,
  cancel,
  flush
} = useDebounceFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### Params

| Property | Description                        | Type                      | Default |
| -------- | ---------------------------------- | ------------------------- | ------- |
| fn       | The function to debounce.          | `(...args: any[]) => any` | -       |
| options  | Config for the debounce behaviors. | `Options`                 | -       |

### Options

| Property | Description                                          | Type      | Default |
| -------- | ---------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to delay.                 | `number`  | `1000`  |
| atBegin  | Specify invoking on the leading edge of the timeout. | `boolean` | -       |

### Result

| Property | Description                                            | Type                      |
| -------- | ------------------------------------------------------ | ------------------------- |
| run      | invoke and pass parameters to fn.                      | `(...args: any[]) => any` |
| cancel   | Cancel the invocation of currently debounced function. | `() => void`              |
| flush    | Immediately invoke currently debounced function.       | `() => void`              |
