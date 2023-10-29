/**
 * title: Default usage
 * desc: Observe if the element is visible.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 监听元素是否在可见区域内
 */

import { useInViewport, useRef } from '@any-hooks/solid'

export default () => {
  const [ref, setRef] = useRef<HTMLElement>(null)
  const [inViewport] = useInViewport(ref)
  return (
    <div>
      <div
        style={{
          width: '300px',
          height: '300px',
          overflow: 'scroll',
          border: '1px solid',
        }}
      >
        scroll here
        <div style={{ height: '800px' }}>
          <div
            ref={setRef}
            style={{
              'border': '1px solid',
              'height': '100px',
              'width': '100px',
              'text-align': 'center',
              'margin-top': '80px',
            }}
          >
            observer dom
          </div>
        </div>
      </div>
      <div
        style={{
          'margin-top': '16px',
          'color': inViewport() ? '#87d068' : '#f50',
        }}
      >
        inViewport: {inViewport() ? 'visible' : 'hidden'}
      </div>
    </div>
  )
}
