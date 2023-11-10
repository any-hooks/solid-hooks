# useHistorySignal

Track the change history of a signal, provides undo and redo functionality

## Examples

### Basic Usage

<code src="./demo/demo1.tsx" />

### Manual Commit

<code src="./demo/demo2.tsx" />

## API

```typescript
function useHistorySignal<Raw>(signal: Accessor<Raw>, options?: Options): Result<Raw>
```

## Params

| Property | Description | Type                          | Default |
| -------- | ----------- | ----------------------------- | ------- |
| source   | Data source | `Accessor<Raw>`               | -       |
| options  | Options     | `Options`                     | -       |

### Options\<Raw\>

| Property  | Description                                                  | Type            | Default |
| --------- | ------------------------------------------------------------ | --------------- | ------- |
| capacity  | Maximum number of history to be kept. Default to unlimited.  | `number`        | -       |
| manual    | Manually track the change history（manual call `commit()`）  | `boolean`       | `false` |
| clone     | Clone when taking a snapshot, shortcut for dump：`JSON.parse(JSON.stringify(value))`。 | `boolean \| (x: Raw)=> Raw` | `false` |
| dump      | Serialize data into the history             | `(v: Raw) => Serialized` | `(x: Raw) => x` |
| parse     | Deserialize data from the history    | `(v: Serialized) => Raw` | `(x: Serialized) => x` |
| setSource | set data source, __Required__。                              | `Setter<Raw>`   | -       |

### Result\<Raw\>

| Property      | Description                                              | Type                        |
| --------- | ------------------------------------------------------------ | --------------------------- |
| source    | Bypassed tracking signal from the argument                   | `Accessor<Raw>`             |
| last      | Last history point, source can be different if paused        | `Accessor<Record<Raw>>`     |
| history   | An array of history records for undo, newest comes to first. | `Accessor<Record<Raw>[]>`   |
| canUndo   | A Signal representing if undo is possible                    | `Accessor<boolean>`         |
| canRedo   | A Signal representing if redo is possible                    | `Accessor<boolean>`         |
| undoStack | Records array for undo                                       | `Accessor<Record<Raw>[]>`   |
| redoStack | Records array for redo                                       | `Accessor<Record<Raw>[]>`   |
| undo      | Undo changes                                                 | `() => void`                |
| redo      | Redo changes                                                 | `() => void`                |
| commit    | Create a new history record                                  | `() => void`                |
| reset     | Reset Signal's value with latest history                     | `() => void`                |
| clear     | Clear all the history                                        | `() => void`                |

#### Record\<Raw\>

| Property      | Description                                 | Type                        |
| --------- | ----------------------------------------------- | --------------------------- |
| snapshot  | snapshot of the change                          | `Raw`                       |
| timestamp | timestamp of the change                         | `number`                    |
