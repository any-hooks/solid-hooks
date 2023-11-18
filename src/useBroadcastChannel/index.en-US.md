# useBroadcastChannel

Reactive [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel).

## Example

### Basic Usage

>>> ./demo/demo1.tsx

## API

```typescript
const {
  isSupported,data, error,
  postMessage, close,
} = useBroadcastChannel(channelName, options)
```

## Params

| Property    | Description            | Type      | Default |
| ----------- | ---------------------- | --------- | ------ |
| channelName | Required, channel name | `string`  | -      |
| options     | option                 | `Options` | -      |

### Options

| Property       | Description                                              | Type                        | Default |
| -------------- | -------------------------------------------------------- | --------------------------- | ------ |
| onMessage      | Fired when a message arrives on the channel.             | `(e: MessageEvent) => void` | -      |
| onMessageError | Fired when a message arrives that can't be deserialized. | `(e: MessageEvent) => void` | -      |

## Result

| Property    | 说明                                        | 类型                              |
| ----------- | ------------------------------------------- | --------------------------------- |
| isSupported | Support or not `BroadcastChannel`           | `Accessor<boolean>`               |
| data        | The latest message data currently received. | `Accessor<any>`                   |
| error       | Channel error message                       | `Accessor<MessageEvent \| null>`  |
| channel     | `BroadcastChannel` Instance                 | `() => BroadcastChannel \| null ` |
| postMessage | post message                                | ` (data: any) => void`            |
| close       | close current channel                       | `() => void`                      |
