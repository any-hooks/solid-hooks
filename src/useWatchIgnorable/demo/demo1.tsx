/**
 * title: Basic usage
 * desc: Watches reactive data sources and invokes a callback function when the sources change, and return a wrapper function to ignore the listening
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 侦听响应式数据源，在数据源变化时调用所给的回调函数, 并返回一个用于忽略侦听的包装函数
 */

import { useWatchIgnorable } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal(0)
  const [doubleCount, setDoubleCount] = createSignal(0)

  const ignoreUpdate = useWatchIgnorable(count, () =>
    setDoubleCount(count() * 2))
  const inc = () => setCount(count() + 1)
  const ignoreInc = () => ignoreUpdate(inc)

  return (
    <div>
      <p>
        Count:
        {count()}
      </p>
      <p style={{ 'margin-bottom': '16px' }}>
        DoubleCount:
        {doubleCount()}
      </p>
      <button type="button" onClick={inc} style={{ 'margin-right': '16px' }}>
        inc
      </button>
      <button type="button" onClick={ignoreInc}>
        ignore inc
      </button>
    </div>
  )
}
