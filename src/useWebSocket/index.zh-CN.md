# useWebSocket

用于处理 WebSocket 的 Hook。

多个组件同时建立相同的 WebSocket 连接时, 会复用同一个 WebSocket 实例。

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

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
  onOpen?: (event: WebSocketEventMap['open'], ws: WebSocket) => void;
  onClose?: (event: WebSocketEventMap['close'], ws: WebSocket) => void;
  onMessage?: (message: WebSocketEventMap['message'], ws: WebSocket) => void;
  onError?: (event: WebSocketEventMap['error'], ws: WebSocket) => void;
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

| 参数      | 说明                 | 类型      | 默认值 |
| --------- | -------------------- | --------- | ------ |
| socketUrl | 必填，webSocket 地址 | `string`  | -      |
| options   | 可选，连接配置项     | `Options` | -      |

#### Options

| 参数              | 说明                   | 类型                                                                   | 默认值  |
| ----------------- | ---------------------- | ---------------------------------------------------------------------- | ------- |
| onOpen            | webSocket 连接成功回调 | `(event: WebSocketEventMap['open'], instance: WebSocket) => void`      | -       |
| onClose           | webSocket 关闭回调     | `(event: WebSocketEventMap['close'], instance: WebSocket) => void`     | -       |
| onMessage         | webSocket 收到消息回调 | `(message: WebSocketEventMap['message'], instance: WebSocket) => void` | -       |
| onError           | webSocket 错误回调     | `(event: WebSocketEventMap['error'], instance: WebSocket) => void`     | -       |
| reconnectLimit    | 重试次数               | `number`                                                               | `3`     |
| reconnectInterval | 重试时间间隔（ms）     | `number`                                                               | `3000`  |
| manual            | 手动启动连接           | `boolean`                                                              | `false` |
| protocols         | 子协议                 | `string` \| `string[]`                                                 | -       |

### Result

| 参数          | 说明                                                   | 类型                           |
| ------------- | ------------------------------------------------------ | ------------------------------ |
| latestMessage | 最新消息                                               | `Accessor<WebSocketEventMap['message'] \| undefined>` |
| sendMessage   | 发送消息函数                                           | `WebSocket['send']`            |
| disconnect    | 手动断开 webSocket 连接                                | `() => void`                   |
| connect       | 手动连接 webSocket，如果当前已有连接，则关闭后重新连接 | `() => void`                   |
| readyState    | 当前 webSocket 连接状态                                | `Accessor<ReadyState>`                   |
| webSocketIns  | webSocket 实例                                         | `() => WebSocket \| null`                    |
