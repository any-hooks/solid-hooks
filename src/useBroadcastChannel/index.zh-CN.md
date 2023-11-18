# useBroadcastChannel

响应式 [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel).

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx

## API

```typescript
const {
  isSupported,data, error,
  postMessage, close,
} = useBroadcastChannel(channelName, options)
```

## Params

| 参数        | 说明           | 类型      | 默认值 |
| ----------- | -------------- | --------- | ------ |
| channelName | 必填，频道名称 | `string`  | -      |
| options     | 配置           | `Options` | -      |

### Options

| 参数           | 说明                                   | 类型                        | 默认值 |
| -------------- | -------------------------------------- | --------------------------- | ------ |
| onMessage      | 当频道收到一条消息时触发               | `(e: MessageEvent) => void` | -      |
| onMessageError | 当频道收到一条无法反序列化的消息时触发 | `(e: MessageEvent) => void` | -      |

## Result

| 参数        | 说明                        | 类型                              |
| ----------- | --------------------------- | --------------------------------- |
| isSupported | 是否支持 `BroadcastChannel` | `Accessor<boolean>`               |
| data        | 当前接受的最新消息数据      | `Accessor<any>`                   |
| error       | 消息错误信息                | `Accessor<MessageEvent \| null>`  |
| channel     | `BroadcastChannel` 实例     | `() => BroadcastChannel \| null ` |
| postMessage | 发送消息                    | ` (data: any) => void`            |
| close       | 关闭当前频道                | `() => void`                      |
