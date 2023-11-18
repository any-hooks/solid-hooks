# useClickAway

Listen for click events outside the target element.

## Examples

### Default usage

>>> ./demo/demo1.tsx

### Custom DOM

>>> ./demo/demo2.tsx

### Support multiple DOM

>>> ./demo/demo3.tsx

### Listen for other events

>>> ./demo/demo4.tsx

### Support multiple events

>>> ./demo/demo5.tsx

## API

```typescript
type Target = Element | (() => Element);
type DocumentEventKey = keyof DocumentEventMap;

useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: Target | Target[],
  eventName?: DocumentEventKey | DocumentEventKey[]
);
```

### Params

| Property    | Description                                 | Type                                       | Default |
| ----------- | ------------------------------------------- | ------------------------------------------ | ------- |
| onClickAway | Trigger Function                            | `(event: T) => void`                       | -       |
| target      | DOM elements, support array          | `Target` \| `Target[]`                     | -       |
| eventName   | Set the event to be listened, support array | `DocumentEventKey` \| `DocumentEventKey[]` | `click` |
