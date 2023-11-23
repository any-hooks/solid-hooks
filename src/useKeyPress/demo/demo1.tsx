/**
 * title: Basic usage
 * desc: Supported keyCode and alias in keyboard events, pressing ArrowUp or ArrowDown to show effect.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 支持键盘事件中的 keyCode 和别名，请按 ArrowUp 或 ArrowDown 键进行演示。
 */

import { useKeyPress } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [counter, setCounter] = createSignal(0)

  useKeyPress('uparrow', () => {
    setCounter(s => s + 1)
  })

  // keyCode value for ArrowDown
  useKeyPress(40, () => {
    setCounter(s => s - 1)
  })

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>1. Press ArrowUp by key to increase</div>
      <div>2. Press ArrowDown by keyCode to decrease</div>
      <div>
        counter:
        {' '}
        <span style={{ color: '#f00' }}>{counter()}</span>
      </div>
    </div>
  )
}
