import { useBroadcastChannel } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [message, setMessage] = createSignal('')
  const { isSupported, data, postMessage } = useBroadcastChannel('channel-name')

  return (
    <div>
      <p>
        {isSupported()
          ? 'Please open this page in at least two tabs'
          : 'Your Browser not support BroadcastChannel'}
      </p>
      <p>
        message:
        {JSON.stringify(data() || '')}
      </p>
      <div>
        <input type="text" onInput={e => setMessage(e.target.value)} />
        <button
          style={{ 'margin-left': '16px' }}
          onClick={() => postMessage(message())}
        >
          Send
        </button>
      </div>
    </div>
  )
}
