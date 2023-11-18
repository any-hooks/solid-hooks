
# useThrottleSignal

A hook that deal with the throttled signal.

## Examples

### Default usage

>>> ./demo/demo1.tsx

## API

```typescript
const throttledValue = useThrottleSignal(
  value: any,
  options?: Options
);
```

### Params

| Property | Description                        | Type      | Default |
| -------- | ---------------------------------- | --------- | ------- |
| value    | Default value                      | `any`     | -       |
| options  | Config for the throttle behaviors. | `Options` | -       |

### Options

| Property   | Description                                               | Type      | Default |
| ---------- | --------------------------------------------------------- | --------- | ------- |
| wait       | The number of milliseconds to delay.                      | `number`  | `1000`  |
| noLeading  | Specify not invoking on the leading edge of the timeout.  | `boolean` | `true`  |
| noTrailing | Specify not invoking on the trailing edge of the timeout. | `boolean` | `true`  |
