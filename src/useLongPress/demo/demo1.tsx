/**
 * title: Default usage
 * desc: Please keep pressing button to show effects.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 请长按按钮查看效果。
 */

import { useLongPress, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [counter, setCounter] = createSignal(0)
  const [ref, setRef] = useRef<HTMLButtonElement>()

  useLongPress(() => setCounter((s) => s + 1), ref)

  return (
    <div>
      <button ref={setRef} type="button">
        Press me
      </button>
      <p>counter: {counter()}</p>
    </div>
  )
}
