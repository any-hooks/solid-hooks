/**
 * title: Basic usage
 * desc: Watches reactive data sources and invokes a callback function when the sources change.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 侦听响应式数据源，并在数据源变化时调用所给的回调函数。
 */

import { useWatch } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [state, setState] = createSignal('foo')

  useWatch(
    state,
    (currentState) => {
      console.log(`state: ${currentState}`)
    },
    { defer: true },
  )

  return (
    <div>
      <p>Effects：{state()}</p>
      <button
        type="button"
        onClick={() => setState('bar')}
        style={{ 'margin-right': '16px' }}
      >
        Set bar
      </button>
      <button type="button" onClick={() => setState('baz')}>
        Set baz
      </button>
    </div>
  )
}
