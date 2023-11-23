/**
 * title: Basic usage
 * desc: Set css variable.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 设置 CSS 变量
 */

import { useCssVar, useRef } from '@any-hooks/solid'

export default () => {
  const [ref, setRef] = useRef()
  const [color, setColor] = useCssVar('--c-color', ref)

  return (
    <div>
      <div
        ref={setRef}
        style={{ 'color': 'var(--c-color)', 'margin-bottom': '16px' }}
      >
        Text CSS Variable :
        {' '}
        {color()}
      </div>
      <button
        type="button"
        onClick={() => setColor('red')}
        style={{ 'margin-right': '16px' }}
      >
        Change color to Red
      </button>
      <button type="button" onClick={() => setColor('blue')}>
        Change color to Blue
      </button>
    </div>
  )
}
