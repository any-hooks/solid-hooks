/**
 * title: Support DOM
 * desc: Support pass in a DOM element or function.
 *
 * title.zh-CN: 支持传入 DOM
 * desc.zh-CN: 支持直接传入 DOM 对象或 function。
 */

import { useClickAway } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [counter, setCounter] = createSignal(0)

  useClickAway(
    () => {
      setCounter(s => s + 1)
    },
    () => document.getElementById('use-click-away-button'),
  )

  return (
    <div>
      <button type="button" id="use-click-away-button">
        box
      </button>
      <p>
        counter:
        {counter()}
      </p>
    </div>
  )
}
