/**
 * title: Advanced usage
 * desc: Modify the delay to realize the timer timeout change and pause.
 *
 * title.zh-CN: 进阶使用
 * desc.zh-CN: 动态修改 delay 以实现定时器间隔变化与暂停。
 */

import { useTimeout } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal(0)
  const [delay, setDelay] = createSignal<number | undefined>(1000)

  const clear = useTimeout(() => {
    setCount(count() + 1)
  }, delay)

  return (
    <div>
      <p>
        {' '}
        count:
        {count()}
      </p>
      <p style={{ 'margin-top': '16px' }}>
        {' '}
        Delay:
        {delay()}
      </p>
      <button
        onClick={() => setDelay(t => (t ? t + 1000 : 1000))}
        style={{ 'margin-right': '8px' }}
      >
        Delay + 1000
      </button>
      <button
        style={{ 'margin-right': '8px' }}
        onClick={() => {
          setDelay(1000)
        }}
      >
        reset Delay
      </button>
      <button onClick={clear}>clear</button>
    </div>
  )
}
