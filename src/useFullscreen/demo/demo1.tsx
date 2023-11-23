/**
 * title: Default usage
 * desc: Use ref to set elements that need full screen
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用 ref 设置需要全屏的元素
 */

import { useFullscreen, useRef } from '@any-hooks/solid'

export default () => {
  const [ref, setRef] = useRef()
  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }]
    = useFullscreen(ref)
  return (
    <div ref={setRef} style={{ background: 'white' }}>
      <div style={{ 'margin-bottom': '16px' }}>
        {isFullscreen() ? 'Fullscreen' : 'Not fullscreen'}
      </div>
      <div>
        <button type="button" onClick={enterFullscreen}>
          enterFullscreen
        </button>
        <button
          type="button"
          onClick={exitFullscreen}
          style={{ margin: '0 8px' }}
        >
          exitFullscreen
        </button>
        <button type="button" onClick={toggleFullscreen}>
          toggleFullscreen
        </button>
      </div>
    </div>
  )
}
