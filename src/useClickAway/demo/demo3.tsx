/**
 * title: Support multiple DOM
 * desc: Support pass multiple DOM elements.
 *
 * title.zh-CN: 支持多个 DOM 对象
 * desc.zh-CN: 支持传入多个目标对象。
 */

import { useClickAway, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [counter, setCounter] = createSignal(0)
  const [ref1, setRef1] = useRef()
  const [ref2, setRef2] = useRef()
  useClickAway(() => {
    setCounter((s) => s + 1)
  }, [ref1, ref2])

  return (
    <div>
      <button type="button" ref={setRef1}>
        box1
      </button>
      <button type="button" ref={setRef2} style={{ 'margin-left': '16px' }}>
        box2
      </button>
      <p>counter: {counter()}</p>
    </div>
  )
}
