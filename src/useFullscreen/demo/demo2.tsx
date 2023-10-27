/**
 * title: Image full screen
 *
 * title.zh-CN: 图片全屏
 */

import { useFullscreen } from '@any-hooks/solid'
import img from './demo.jpg'

export default () => {
  const [, { enterFullscreen }] = useFullscreen(() =>
    document.getElementById('fullscreen-img'),
  )
  return (
    <div style={{ background: 'white' }}>
      <div style={{ 'margin-bottom': '16px' }}>
        <img id="fullscreen-img" src={img} style={{ width: '320px' }} alt="" />
      </div>
      <button type="button" onClick={enterFullscreen}>
        enterFullscreen
      </button>
    </div>
  )
}
