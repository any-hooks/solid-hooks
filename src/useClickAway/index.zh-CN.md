# useClickAway

监听目标元素外的点击事件。

## 代码演示

### 基础用法

>>> ./demo/demo2.tsx

### 自定义 DOM

>>> ./demo/demo2.tsx

### 支持多个 DOM 对象

>>> ./demo/demo3.tsx

### 监听其它事件

>>> ./demo/demo4.tsx

### 支持多个事件

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

| 参数        | 说明                         | 类型                                       | 默认值  |
| ----------- | ---------------------------- | ------------------------------------------ | ------- |
| onClickAway | 触发函数                     | `(event: T) => void`                       | -       |
| target      | DOM 节点，支持数组           | `Target` \| `Target[]`                     | -       |
| eventName   | 指定需要监听的事件，支持数组 | `DocumentEventKey` \| `DocumentEventKey[]` | `click` |
