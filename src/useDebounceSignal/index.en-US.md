
# useDebounce

A hook that deal with the debounced signal.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setDebounceState, setState] = useDebounceSignal(
  value: any,
  options?: Options
);
```

### Params

| Property | Description                        | Type      | Default |
| -------- | ---------------------------------- | --------- | ------- |
| value    | The value to debounce.             | `any`     | -       |
| options  | Config for the debounce behaviors. | `Options` | -       |

### Options

| Property | Description                                          | Type      | Default |
| -------- | ---------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to delay.                 | `number`  | `1000`  |
| atBegin  | Specify invoking on the leading edge of the timeout. | `boolean` | -       |
