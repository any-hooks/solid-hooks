/**
 * title: Page full screen
 *
 * title.zh-CN: 页面全屏
 */

import { useFullscreen, useRef } from '@any-hooks/solid'

export default () => {
  const [ref, setRef] = useRef()
  const [isFullscreen, { toggleFullscreen, enterFullscreen, exitFullscreen }]
    = useFullscreen(ref, {
      pageFullscreen: true,
    })

  return (
    <div style={{ background: 'white' }}>
      <div ref={setRef} style={{ background: '#4B6BCD', padding: '12px' }}>
        <div style={{ 'margin-bottom': '16px' }}>
          {isFullscreen() ? 'Fullscreen' : 'Not fullscreen'}
        </div>
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
