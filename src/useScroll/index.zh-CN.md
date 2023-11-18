# useScroll

监听元素的滚动位置。

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

### 监测整页的滚动

>>> ./demo/demo2.tsx

### 控制滚动状态的监听

>>> ./demo/demo3.tsx

## API

```typescript
const position = useScroll(target, shouldUpdate);
```

### Params

| 参数         | 说明                 | 类型                                         | 默认值       |
| ------------ | -------------------- | -------------------------------------------- | ------------ |
| target       | DOM 节点             | `Element` \| `Document` \| `(() => Element)` | `document`   |
| shouldUpdate | 控制是否更新滚动信息 | `({ top: number, left: number }) => boolean` | `() => true` |

### Result

| 参数     | 说明                   | 类型                                         |
| -------- | ---------------------- | -------------------------------------------- |
| position | 滚动容器当前的滚动位置 | `{ left: number, top: number } \| undefined` |
