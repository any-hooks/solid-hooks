# useLocalStorage

A Hook that store state into localStorage.

## Examples

### Store state into localStorage

>>> ./demo/demo1.tsx

### Store complex types of data

>>> ./demo/demo2.tsx

### Custom serialization and deserialization functions

>>> ./demo/demo3.tsx

## API

If you want to delete this record from localStorage, you can use `setState()` or `setState(undefined)`.

```typescript
interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: unknown) => void;
  watch?: boolean
}

const [state, setState] = useLocalStorage<T>(
  key: string,
  options: Options<T>
): [Accessor<T>, (value?: Setter<T>) => void];
```

### Result

| Property | Description                 | Type                            |
| -------- | --------------------------- | ------------------------------- |
| state    | Local `localStorage` value  | `Accessor<T>`                   |
| setState | Update `localStorage` value | `Setter<T>`                     |

### Options

| Property     | Description                   | Type                       | Default                       |
| ------------ | ----------------------------- | -------------------------- | ----------------------------- |
| defaultValue | Default value                 | `any \| (() => any)`       | -                             |
| serializer   | Custom serialization method   | `(value: any) => string`   | `JSON.stringify`              |
| deserializer | Custom deserialization method | `(value: string) => any`   | `JSON.parse`                  |
| onError      | On error callback             | `(error: unknown) => void` | `(e) => { console.error(e) }` |
| observer     | Watch changes                 | `boolean`                  | `false`                       |

## Remark

useLocalStorageState will call `serializer` before write data to localStorage, and call `deserializer` once after read data.
