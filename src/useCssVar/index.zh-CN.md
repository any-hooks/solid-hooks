# useCssVar

操作CSS变量

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [variable, setVariable] = useCssVar(
  prop: string,
  target?: Target,
  options?: Options
)
```

### Params

| 参数    | 说明      | 类型      | 默认值 |
| ------- | --------- | --------- | ------ |
| prop    | CSS变量名 | `string`  | -      |
| target  | 目标元素  | `Target`  | -      |
| options | 配置项    | `Options` | -      |

### Options

| 参数         | 说明          | 类型      | 默认值  |
| ------------ | ------------- | --------- | ------- |
| initialValue | CSS变量初始值 | `string`  | -       |
| observer     | 是否监听      | `boolean` | `false` |

### Results

| 参数        | 说明          | 类型                      | 默认值 |
| ----------- | ------------- | ------------------------- | ------ |
| variable    | CSS变量值     | `Accessor<string>`        | -      |
| setVariable | 设置CSS变量值 | `(value: string) => void` | -      |
