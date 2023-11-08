# useWebSocket

A hook for WebSocket.

When multiple components establish the same WebSocket connection at the same time, they reuse the same WebSocket instance.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

interface Options {
  reconnectLimit?: number;
  reconnectInterval?: number;
  onOpen?: (event: WebSocketEventMap['open'], instance: WebSocket) => void;
  onClose?: (event: WebSocketEventMap['close'], instance: WebSocket) => void;
  onMessage?: (message: WebSocketEventMap['message'], instance: WebSocket) => void;
  onError?: (event: WebSocketEventMap['error'], instance: WebSocket) => void;
  protocols?: string | string[];
}

interface Result {
  latestMessage: Accessor<WebSocketEventMap['message'] | undefined>;
  sendMessage: WebSocket['send'];
  disconnect: () => void;
  connect: () => void;
  readyState: Accessor<ReadyState>;
  webSocketIns: () => WebSocket | null;
}

useWebSocket(socketUrl: string, options?: Options): Result;
```

### Params

| Property  | Description                    | Type      | Default |
| --------- | ------------------------------ | --------- | ------- |
| socketUrl | Required, webSocket url        | `string`  | -       |
| options   | connect the configuration item | `Options` | -       |

#### Options

| Options Property  | Description                        | Type                                                                   | Default |
| ----------------- | ---------------------------------- | ---------------------------------------------------------------------- | ------- |
| onOpen            | The webSocket connect callback     | `(event: WebSocketEventMap['open'], instance: WebSocket) => void`      | -       |
| onClose           | WebSocket close callback           | `(event: WebSocketEventMap['close'], instance: WebSocket) => void`     | -       |
| onMessage         | WebSocket receive message callback | `(message: WebSocketEventMap['message'], instance: WebSocket) => void` | -       |
| onError           | WebSocket error callback           | `(event: WebSocketEventMap['error'], instance: WebSocket) => void`     | -       |
| reconnectLimit    | Retry times                        | `number`                                                               | `3`     |
| reconnectInterval | Retry interval(ms)                 | `number`                                                               | `3000`  |
| manual            | Manually starts connection         | `boolean`                                                              | `false` |
| protocols         | Sub protocols                      | `string` \| `string[]`                                                 | -       |

### Result

| Options Property | Description                                                                            | Type                           |
| ---------------- | -------------------------------------------------------------------------------------- | ------------------------------ |
| latestMessage    | Latest message                                                                         | `Accessor<WebSocketEventMap['message'] \| undefined>` |
| sendMessage      | Send message function                                                                  | `WebSocket['send']`            |
| disconnect       | Disconnect webSocket manually                                                          | `() => void`                   |
| connect          | Connect webSocket manually. If already connected, close the current one and reconnect. | `() => void`                   |
| readyState       | Current webSocket connection status                                                    | `Accessor<ReadyState>`                   |
| webSocketIns     | WebSocket instance                                                                     | `() => WebSocket \| null`                    |
