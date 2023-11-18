# useSize

A hook that observes size change of an element.

## Examples

### Default usage

>>> ./demo/demo1.tsx

### Pass in the DOM element

>>> ./demo/demo2.tsx

## API

```typescript
const size = useSize(target);
```

### Params

| Property | Description | Type                           | Default |
| -------- | ----------  | ------------------------------ | ------- |
| target   | DOM element | `Element` \| `(() => Element)` | -       |

### Result

| Property | Description         | Type                                             | Default                                                                   |
| -------- | ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------- |
| size     | Size of the element | `Accessor<{ width: number, height: number } \| undefined>` | `{ width: target.clientWidth, height: target.clientHeight } \| undefined` |
