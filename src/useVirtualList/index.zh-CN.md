# useVirtualList

提供虚拟化列表能力的 Hook，用于解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题。

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

### 动态元素高度

>>> ./demo/demo2.tsx

## API

```typescript
const [list, scrollTo] = useVirtualList<T>(
  originalList: Accessor<T[]> | T[],
  options: {
    containerTarget: (() => Element) | Element,
    wrapperTarget: (() => Element) | Element,
    itemHeight: number | ((index: number, data: T) => number),
    overscan?: number,
  }
);
```

### Params

| 参数         | 说明                 | 类型                     | 默认值 |
| ------------ | -------------------- | ------------------------ | ------ |
| originalList | 包含大量数据的列表。 | `Accessor<T[]>` \| `T[]` | `[]`   |
| options      | 配置项               | `Options`                | -      |

### Options

| 参数            | 说明                                                   | 类型                                  | 默认值 |
| --------------- | ------------------------------------------------------ | ----------------------------------- | ------ |
| containerTarget | 外面容器，支持 DOM 节点或者 Ref 对象                   | `() => Element` \| `Element`                           | -      |
| wrapperTarget   | 内部容器，支持 DOM 节点或者 Ref 对象                   | `() => Element` \| `Element`                           | -      |
| itemHeight      | 行高度，静态高度可以直接写入像素值，动态高度可传入函数 | `number` \| `((index: number, data: T) => number)`                | -      |
| overscan        | 视区上、下额外展示的 DOM 节点数量                      | `number`                            | `5`    |

### Result

| 参数     | 说明                   | 类型                                     |
| -------- | ---------------------- | ---------------------------------------- |
| list     | 当前需要展示的列表内容 | `Accessor<{ data: T, index: number }[]>` |
| scrollTo | 快速滚动到指定 index   | `(index: number) => void`                |
