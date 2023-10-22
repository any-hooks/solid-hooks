/**
 * title: Default usage
 * desc: Please click button or outside of button to show effects.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 请点击按钮或按钮外查看效果。
 */

import { useClickAway, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [counter, setCounter] = createSignal(0)
  const [ref, setRef] = useRef<HTMLButtonElement>()
  useClickAway(() => {
    setCounter((s) => s + 1)
  }, ref)

  return (
    <div>
      <button ref={setRef} type="button">
        box
      </button>
      <p>counter: {counter()}</p>
    </div>
  )
}
