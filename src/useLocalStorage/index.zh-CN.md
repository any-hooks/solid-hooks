
# useLocalStorage

将状态存储在 localStorage 中的 Hook 。

## 代码演示

### 将 state 存储在 localStorage 中

>>> ./demo/demo1.tsx

### 存储复杂类型数据

>>> ./demo/demo2.tsx

### 自定义序列化和反序列化函数

>>> ./demo/demo3.tsx

## API

如果想从 localStorage 中删除这条数据，可以使用 `setState()` 或 `setState(undefined)` 。

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

| 参数     | 说明                   | 类型                            |
| -------- | ---------------------- | ------------------------------- |
| state    | 本地 `localStorage` 值 | `Accessor<T>`                   |
| setState | 设置 `localStorage` 值 | `Setter<T>`                     |

### Options

| 参数         | 说明               | 类型                       | 默认值                        |
| ------------ | ------------------ | -------------------------- | ----------------------------- |
| defaultValue | 默认值             | `any \| (() => any)`       | -                             |
| serializer   | 自定义序列化方法   | `(value: any) => string`   | `JSON.stringify`              |
| deserializer | 自定义反序列化方法 | `(value: string) => any`   | `JSON.parse`                  |
| onError      | 错误回调函数       | `(error: unknown) => void` | `(e) => { console.error(e) }` |
| observer     | 监听变化           | `boolean`                  | `false`                       |

## 备注

useLocalStorage 在往 localStorage 写入数据前，会先调用一次 `serializer`，在读取数据之后，会先调用一次 `deserializer`。
