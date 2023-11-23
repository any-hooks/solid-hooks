/**
 * title: Default usage
 * desc: Click the button to preview.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 点击按钮查看效果。
 */

import { useEventListener, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [value, setValue] = createSignal(0)
  const [ref, setRef] = useRef()

  useEventListener(
    'click',
    () => {
      setValue(value() + 1)
    },
    { target: ref },
  )

  return (
    <button ref={setRef} type="button">
      You click
      {' '}
      {value()}
      {' '}
      times
    </button>
  )
}
