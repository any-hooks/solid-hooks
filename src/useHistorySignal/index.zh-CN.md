# useHistorySignal

跟踪信号的更改历史，提供撤消和重做功能。

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

### 手动提交

>>> ./demo/demo2.tsx

## API

```typescript
function useHistorySignal<Raw>(source: Accessor<Raw>, options?: Options): Result<Raw>
```

## Params

| 参数    | 说明     | 类型                          | 默认值 |
| ------- | -------- | ----------------------------- | ------ |
| source  | 数据源   | `Accessor<Raw>`               | -      |
| options | 设置     | `Options`                     | -      |

### Options\<Raw\>

| 参数      | 说明                                            | 类型                        | 默认值  |
| --------- | ----------------------------------------------- | --------------------------- | ------- |
| capacity  | 保留的历史记录的最大数量。默认为无限制。        | `number`                    | -       |
| manual    | 是否手动跟踪变更历史（手动调用 `commit()`）     | `boolean`                   | `false` |
| clone     | 克隆快照：`JSON.parse(JSON.stringify(value))`。 | `boolean \| (x: Raw)=> Raw` | `false` |
| dump      | 将数据序列化到历史记录中                   | `(v: Raw) => Serialized` | `(x: Raw) => x` |
| parse     | 从历史记录中反序列化数据            | `(v: Serialized) => Raw` | `(x: Serialized) => x` |
| setSource | 设置数据源, __必选__。                          | `Setter<Raw>`               | -       |

### Result\<Raw\>

| 参数      | 说明                                            | 类型                        |
| --------- | ----------------------------------------------- | --------------------------- |
| source    | 数据源                                          | `Accessor<Raw>`             |
| last      | 最新的历史点                                    | `Accessor<Record<Raw>>`     |
| history   | 用于撤消的历史记录数组，最新的放在第一位        | `Accessor<Record<Raw>[]>`   |
| canUndo   | 是否可以撤销最新的变更                          | `Accessor<boolean>`         |
| canRedo   | 是否可以重做最新的变更                          | `Accessor<boolean>`         |
| undoStack | 撤销栈                                          | `Accessor<Record<Raw>[]>`   |
| redoStack | 重做栈                                          | `Accessor<Record<Raw>[]>`   |
| undo      | 撤销最新的变更                                  | `() => void`                |
| redo      | 重做最新的变更                                  | `() => void`                |
| commit    | 手动提交最新的变更                              | `() => void`                |
| reset     | 重置数据源到最新的变更                          | `() => void`                |
| clear     | 清空历史记录                                    | `() => void`                |

#### Record\<Raw\>

| 参数      | 说明                                            | 类型                        |
| --------- | ----------------------------------------------- | --------------------------- |
| snapshot  | 变更快照                                        | `Raw`                       |
| timestamp | 变更时间                                        | `number`                    |
