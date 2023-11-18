
# useThrottleSignal

用来处理节流值的 Hook。

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

## API

```typescript
const [state, setThrottleState, setState] = useThrottleSignal(
  value: any,
  options?: Options
);
```

### Params

| 参数    | 说明           | 类型      | 默认值 |
| ------- | -------------- | --------- | ------ |
| value   | 默认值         | `any`     | -      |
| options | 配置节流的行为 | `Options` | -      |

### Options

| 参数       | 说明                       | 类型      | 默认值  |
| ---------- | -------------------------- | --------- | ------- |
| wait       | 等待时间，单位为毫秒       | `number`  | `1000`  |
| noLeading  | 是否不在延迟开始前调用函数 | `boolean` | `false` |
| noTrailing | 是否不在延迟开始后调用函数 | `boolean` | `false` |
