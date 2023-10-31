/**
 * title: Advanced usage
 * desc: Modify the delay to realize the timer interval change and pause.
 *
 * title.zh-CN: 进阶使用
 * desc.zh-CN: 动态修改 delay 以实现定时器间隔变化与暂停。
 */

import { useInterval } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal(0)
  const [interval, setInterval] = createSignal<number | undefined>(1000)

  const { clear, start } = useInterval(() => {
    setCount(count() + 1)
  }, interval)

  return (
    <div>
      <p> count: {count()} </p>
      <p style={{ 'margin-top': '16px' }}> interval: {interval()} </p>
      <button
        onClick={() => setInterval((t) => (t ? t + 1000 : 1000))}
        style={{ 'margin-right': '8px' }}
      >
        interval + 1000
      </button>
      <button
        style={{ 'margin-right': '8px' }}
        onClick={() => {
          setInterval(1000)
          start()
        }}
      >
        reset interval
      </button>
      <button onClick={clear}>clear</button>
    </div>
  )
}
