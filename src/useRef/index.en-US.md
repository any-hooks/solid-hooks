# useRef

Bind and get DOM elements

## Examples

### Basic Usage

>>> ./demo/demo1.tsx

### Advanced Usage

>>> ./demo/demo2.tsx

## API

```typescript
const [ref, setRef] = useRef(initialValue?: Element | Element[] | null);
```

### Params

| Property     | Description                                   | Type                     | Default  |
| -------------| --------------------------------------------- | ------------------------ | ------- |
| initialValue | Optional, if it is a DOM array, pass in an empty array as the default value | `Element` \| `Element[]`    | -      |

### Result

| Property   | Description      | Type                                    |
| ---------- | -----------------| --------------------------------------- |
| ref        | DOM element      | `Accessor<Element>`                     |
| setRef     | bind DOM element | `(el: Element, index?: number) => void` |
