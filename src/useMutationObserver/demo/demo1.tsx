/**
 * title: Basic usage
 *
 * title.zh-CN: 基础用法
 */

import { useMutationObserver, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [width, setWidth] = createSignal(200)
  const [count, setCount] = createSignal(0)

  const [ref, setRef] = useRef<HTMLDivElement>()

  useMutationObserver(
    (mutationsList) => {
      mutationsList.forEach(() => setCount(c => c + 1))
    },
    ref,
    { attributes: true },
  )

  return (
    <div>
      <div
        ref={setRef}
        style={{
          'width': `${width()}px`,
          'padding': '12px',
          'border': '1px solid #000',
          'margin-bottom': '8px',
        }}
      >
        current width：
        {width()}
      </div>
      <button onClick={() => setWidth(w => w + 10)}>widening</button>
      <p>
        Mutation count
        {count()}
      </p>
    </div>
  )
}
