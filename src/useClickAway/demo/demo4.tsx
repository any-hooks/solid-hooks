/**
 * title: Listen to other events
 * desc: By setting eventName, you can specify the event to be listened, Try click the right mouse.
 *
 * title.zh-CN: 监听其它事件
 * desc.zh-CN: 通过设置 eventName，可以指定需要监听的事件，试试点击鼠标右键。
 */

import { useClickAway, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [counter, setCounter] = createSignal(0)
  const [ref, setRef] = useRef<HTMLButtonElement>()
  useClickAway(
    () => {
      setCounter((s) => s + 1)
    },
    ref,
    'contextmenu',
  )

  return (
    <div>
      <button ref={setRef} type="button">
        box
      </button>
      <p>counter: {counter()}</p>
    </div>
  )
}
