/**
 * title: Default usage
 * desc: DebouncedValue will change after the input ends 500ms.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: DebouncedValue 只会在输入结束 500ms 后变化。
 */

import { useDebounceSignal } from '@any-hooks/solid'

export default () => {
  const [state, setState] = useDebounceSignal('Hello', { wait: 500 })

  return (
    <div>
      <input
        value={state()}
        onInput={(e) => setState(e.target.value)}
        placeholder="Typed value"
        style={{ width: '280px' }}
      />
      <p style={{ 'margin-top': '16px' }}>DebouncedValue: {state()}</p>
    </div>
  )
}
