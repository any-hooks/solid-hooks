/**
 * title: Default usage
 * desc: Establishing a WebSocket connection
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 建立 WebSocket 连接
 */

import { useWatch, useWebSocket } from '@any-hooks/solid'
import { For, createSignal } from 'solid-js'

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export default () => {
  const [messageHistory, setHistory] = createSignal<any[]>([])

  const { readyState, sendMessage, latestMessage, disconnect, connect }
    = useWebSocket('wss://ws.postman-echo.com/raw')

  useWatch(latestMessage, (message) => {
    setHistory(history => [...history, message])
  })

  return (
    <div>
      {/* send message */}
      <button
        onClick={() => sendMessage(`${Date.now()}`)}
        disabled={readyState() !== ReadyState.Open}
        style={{ 'margin-right': '8px' }}
      >
        ✉️ send
      </button>
      {/* disconnect */}
      <button
        onClick={() => disconnect()}
        disabled={readyState() !== ReadyState.Open}
        style={{ 'margin-right': '8px' }}
      >
        ❌ disconnect
      </button>
      {/* connect */}
      <button
        onClick={() => connect()}
        disabled={readyState() === ReadyState.Open}
      >
        {readyState() === ReadyState.Connecting ? 'connecting' : '📞 connect'}
      </button>
      <div style={{ 'margin-top': '8px' }}>
        readyState:
        {readyState()}
      </div>
      <div style={{ 'margin-top': '8px' }}>
        <p>received message: </p>
        <For each={messageHistory()}>
          {message => (
            <p style={{ 'word-wrap': 'break-word' }}>{message?.data}</p>
          )}
        </For>
      </div>
    </div>
  )
}
