/**
 * title: Default usage
 * desc: ThrottledValue will change every 500ms.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: ThrottledValue 每隔 500ms 变化一次。
 */

import { useThrottleSignal } from '@any-hooks/solid'

export default () => {
  const [state, setState] = useThrottleSignal('Hello', { wait: 500 })

  return (
    <div>
      <input
        value={state()}
        onInput={(e) => setState(e.target.value)}
        placeholder="Typed value"
        style={{ width: '280px' }}
      />
      <p style={{ 'margin-top': '16px' }}>ThrottledValue: {state()}</p>
    </div>
  )
}
