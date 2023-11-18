# useScroll

Get the scroll position of an element.

## Examples

### Basic Usage

>>> ./demo/demo1.tsx

### Detect Whole Page Scroll

>>> ./demo/demo2.tsx

### Control listen on scroll status

>>> ./demo/demo3.tsx

## API

```typescript
const position = useScroll(target, shouldUpdate);
```

### Params

| Property     | Description             | Type                                                                        | Default      |
| ------------ | ----------------------- | --------------------------------------------------------------------------- | ------------ |
| target       | DOM element             | `Element` \| `Document` \| `(() => Element)`  | `document`   |
| shouldUpdate | Whether update position | `({ top: number, left: number }) => boolean`              | `() => true` |

### Result

| Property | Description                                 | Type                                         |
| -------- | ------------------------------------------- | -------------------------------------------- |
| position | The current scroll position of the element. | `{ left: number, top: number } \| undefined` |
