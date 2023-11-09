/**
 * title: Default usage
 * desc: render 100,000 items in a list.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 渲染大量数据
 */

import { useRef, useVirtualList } from '@any-hooks/solid'
import { createMemo } from 'solid-js'

export default () => {
  const [container, setContainer] = useRef()
  const [wrapper, setWrapper] = useRef()
  const originalList = createMemo(() => Array.from(Array(99999).keys()))

  const [list] = useVirtualList(originalList, {
    containerTarget: container,
    wrapperTarget: wrapper,
    itemHeight: 60,
    overscan: 10,
  })

  return (
    <>
      <div
        ref={setContainer}
        style={{ height: '300px', overflow: 'auto', border: '1px solid' }}
      >
        <div ref={setWrapper}>
          {list().map((ele) => (
            <div
              style={{
                'height': '52px',
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'border': '1px solid #e8e8e8',
                'margin-bottom': '8[x',
              }}
            >
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
