/**
 * title: Custom DOM
 * desc: By default, listen for events on the window. You can also pass in a DOM to set listen area. such as the common listening for input box events.
 *
 * title.zh-CN: 自定义 DOM
 * desc.zh-CN: 默认监听挂载在 window 上的事件，你也可以传入 DOM 指定监听区域。如常见的监听输入框事件，支持多种 DOM 指定方式。
 */

import { useKeyPress, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [inputRef, setInputRef] = useRef<HTMLElement>()

  const [text, setText] = createSignal('')
  const [textRef, setTextRef] = createSignal('')
  const [textSync, setTextSync] = createSignal('')
  useKeyPress(
    'enter',
    (event: any) => {
      const { value } = event.target
      setText(value)
    },
    {
      events: ['keyup'],
      target: () => document.getElementById('input'),
    },
  )

  useKeyPress(
    'enter',
    (event: any) => {
      const { value } = event.target
      setTextRef(value)
    },
    {
      target: inputRef,
    },
  )

  // Make sure the DOM exists
  useKeyPress(
    () => true,
    (event: any) => {
      const { value } = event.target
      setTextSync(value)
    },
    {
      events: ['keyup'],
      target: document.getElementById('input2'),
    },
  )

  return (
    <div>
      <div>
        <p>Input and pressing enter: {text()}</p>
        <input
          id="input"
          style={{ 'width': '300px', 'margin-right': '24px' }}
        />
      </div>
      <div style={{ 'margin-top': '24px' }}>
        <p>Input and pressing enter: {textRef()}</p>
        <input
          ref={setInputRef}
          style={{ 'width': '300px', 'margin-right': '24px' }}
        />
      </div>
      <div style={{ 'margin-top': '24px' }}>
        <p>Input after enter change: {textSync()}</p>
        <input
          id="input2"
          style={{ 'width': '300px', 'margin-right': '24px' }}
        />
      </div>
    </div>
  )
}
