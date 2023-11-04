# useScrollLock

Lock scrolling of the element.

## Examples

### Basic Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [isLocked, setLock] = useScrollLock(
  target: Element | Document | (() => Element),
  initialValue?: boolean,
);
```

### Params

| Property     | Description      | Type                                         | Default      |
| ------------ | ---------------- | -------------------------------------------- | ------------ |
| target       | DOM element      | `Element` \| `Document` \| `(() => Element)` | `document`   |
| initialValue | Controls whether to lock the scroll | `boolean`                 | `false`      |

### Result

| Property | Description                              | Type                        |
| -------- | ---------------------------------------- | --------------------------- |
| isLocked | Whether the scroll element is locked     | `Accessor<boolean>`         |
| setLock  | Set whether to lock scrolling            | `(lock: boolean) => void`   |
