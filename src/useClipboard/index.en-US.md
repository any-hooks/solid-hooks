# useClipboard

Reactive Clipboard API. Provides the ability to respond to clipboard commands (cut, copy, and paste) as well as to asynchronously read from and write to the system clipboard. Access to the contents of the clipboard is gated behind the Permissions API. Without user permission, reading or altering the clipboard contents is not permitted.

## Example

### Basic Usage

<code src="./demo/demo1.tsx" />

### Advanced Usage

<code src="./demo/demo2.tsx" />

## API

```typescript
const { copy, copied, text, isSupported } = useClipboard(options?: Options);
```

### Result

| Property    | Description                           | Type                              |
| ----------- | ------------------------------------- | --------------------------------- |
| copy        | copy text                             | `(text: string) => Promise<void>` |
| copied      | Whether the replication is successful | `Accessor<boolean>`               |
| text        | Copied text                           | `Accessor<string \| undefined>`   |
| isSupported | Whether replication is supported      | `Accessor<boolean>`               |

### Options

| Property     | Description                        | Type       | Default   |
| ------------ | ---------------------------------- | ---------- | --------- |
| source       | default text                       | `string`   | -         |
| read         | Whether to listen to the clipboard | `boolean`  | `false`   |
| legacy       | Whether to use an older API        | `boolean`  | `false`   |
| copiedDuring | Replication state duration         | `number`   | `1500`    |

### Remarks

Set `legacy: true` to keep the ability to copy if Clipboard API is not available. It will handle copy with execCommand as fallback.
