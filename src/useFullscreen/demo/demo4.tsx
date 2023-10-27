/**
 * title: Coexist with other full screen operations
 * desc: The element's full screen may be modified by other scripts, don't worry, we can work with them.
 *
 * title.zh-CN: 与其它全屏操作共存
 * desc.zh-CN: 元素的全屏情况可能被其它脚本修改，不用担心，我们可以与它们共存。
 */

import { useFullscreen, useRef } from '@any-hooks/solid'

function vanillaToggleFullscreen(element: HTMLElement) {
  const isFullscreen = !!document.fullscreenElement

  if (isFullscreen) {
    document.exitFullscreen()
  } else {
    element.requestFullscreen()
  }
}

export default () => {
  const [ref, setRef] = useRef<HTMLElement>()
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref)

  return (
    <div ref={setRef} style={{ background: 'white' }}>
      <div style={{ 'margin-bottom': '16px' }}>
        {isFullscreen() ? 'Fullscreen' : 'Not fullscreen'}
      </div>
      <div>
        <button style={{ 'margin-right': '8px' }} onClick={toggleFullscreen}>
          hooks toggleFullscreen
        </button>
        <button onClick={() => vanillaToggleFullscreen(ref())}>
          vanilla toggleFullscreen
        </button>
      </div>
    </div>
  )
}
