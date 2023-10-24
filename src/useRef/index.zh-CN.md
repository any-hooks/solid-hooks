# useRef

获取并绑定 DOM 元素

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 进阶用法

<code src="./demo/demo2.tsx" />

## API

```typescript
const [ref, setRef] = useRef(initialValue?: Element | Element[] | null);
```

### Params

| 参数         | 说明                                          | 类型                     | 默认值  |
| -------------| --------------------------------------------- | ------------------------ | ------- |
| initialValue | 可选, 如果是DOM数组，需传入空数组作为默认值 | `Element` \| `Element[]`    | -      |

### Result

| 参数   | 说明          | 类型                                    |
| ------ | --------------| --------------------------------------- |
| ref    | DOM 元素      | `Accessor<Element>`                     |
| setRef | 绑定 DOM 元素 | `(el: Element, index?: number) => void` |
