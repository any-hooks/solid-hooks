# useDebounceSignal

用来处理防抖值的 Hook。

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

## API

```typescript
const [state, setDebounceState, setState] = useDebounceSignal(
  value: any,
  options?: Options
);
```

### Params

| 参数    | 说明           | 类型      | 默认值 |
| ------- | -------------- | --------- | ------ |
| value   | 默认值         | `any`     | -      |
| options | 配置防抖的行为 | `Options` | -      |

### Options

| 参数     | 说明                     | 类型      | 默认值  |
| -------- | ------------------------ | --------- | ------- |
| wait     | 超时时间，单位为毫秒     | `number`  | `1000`  |
| atBegin  | 是否在延迟开始前调用函数 | `boolean` | `false` |
