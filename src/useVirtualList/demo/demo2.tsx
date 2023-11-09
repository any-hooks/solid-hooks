/**
 * title: Dynamic item height
 * desc: Specify item height dynamically.
 *
 * title.zh-CN: 动态元素高度
 * desc.zh-CN: 动态指定每个元素的高度
 */

import { useRef, useVirtualList } from '@any-hooks/solid'
import { createMemo, createSignal } from 'solid-js'

export default () => {
  const [container, setContainer] = useRef()
  const [wrapper, setWrapper] = useRef()
  const originalList = createMemo(() => Array.from(Array(99999).keys()))
  const [value, onChange] = createSignal(0)

  const [list, scrollTo] = useVirtualList(originalList, {
    containerTarget: container,
    wrapperTarget: wrapper,
    itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
    overscan: 10,
  })

  return (
    <div>
      <div style={{ 'text-align': 'right', 'margin-bottom': '16px' }}>
        <input
          style={{ width: '120px' }}
          placeholder="line number"
          type="number"
          value={value()}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          style={{ 'margin-left': '8px' }}
          type="button"
          onClick={() => scrollTo(Number(value()))}
        >
          scroll to
        </button>
      </div>
      <div ref={setContainer} style={{ height: '300px', overflow: 'auto' }}>
        <div ref={setWrapper}>
          {list().map((ele) => (
            <div
              style={{
                'height': `${ele.index % 2 === 0 ? 42 : 84}px`,
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'border': '1px solid #e8e8e8',
                'margin-bottom': '8px',
              }}
            >
              Row: {ele.data} size: {ele.index % 2 === 0 ? 'small' : 'large'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
