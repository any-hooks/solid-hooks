/**
 * title: Basic usage
 * desc: After the movement threshold is exceeded, the long press event will not be triggered
 *
 * title.zh-CN: 超出移动阈值
 * desc.zh-CN: 超出移动阈值之后，长按事件将不会触发
 */
import { useLongPress, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [pressCounter, setPressCounter] = createSignal(0)

  const [ref, setRef] = useRef<HTMLButtonElement>()

  useLongPress(() => setPressCounter(s => s + 1), ref, {
    moveThreshold: { x: 30 },
  })

  return (
    <div>
      <button ref={setRef} type="button">
        Press me
      </button>
      <p>
        counter:
        {pressCounter()}
      </p>
    </div>
  )
}
