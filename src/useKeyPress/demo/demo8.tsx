/**
 * title: Get the trigger key
 * desc: Multiple shortcuts are registered by a hook, each corresponding to a different logic.
 *
 * title.zh-CN: 获取触发的按键
 * desc.zh-CN: 单个 hook 注册多个快捷键，每个快捷键对应不同逻辑。
 */

import { useKeyPress } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal<number>(0)

  const keyCallbackMap: Record<string, () => void> = {
    'w': () => {
      setCount(prev => prev + 1)
    },
    's': () => {
      setCount(prev => prev - 1)
    },
    'shift.c': () => {
      setCount(0)
    },
  }

  useKeyPress(['w', 's', 'shift.c'], (_, key) => {
    keyCallbackMap[key]()
  })

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>1. Press [w] to increase</div>
      <div>2. Press [s] to decrease</div>
      <div>3. Press [shift.c] to reset</div>
      <p>
        counter:
        {' '}
        <span style={{ color: '#f00' }}>{count()}</span>
      </p>
    </div>
  )
}
