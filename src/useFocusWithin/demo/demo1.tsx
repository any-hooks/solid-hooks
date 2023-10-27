/**
 * title: Basic usage
 * desc: Use useRef to set area that needs monitoring. The focus can be switched by click the outside with the mouse, or using keys such as `tab` on the keyboard.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用 useRef 设置需要监听的区域。可以通过鼠标点击外部区域，或者使用键盘的 `tab` 等按键来切换焦点。
 */

import { useFocusWithin, useRef } from '@any-hooks/solid'

export default () => {
  const [ref, setRef] = useRef()
  const isFocusWithin = useFocusWithin(ref, {
    onFocus: () => {
      console.info('focus')
    },
    onBlur: () => {
      console.info('blur')
    },
  })
  return (
    <div>
      <div
        ref={setRef}
        style={{
          'padding': '16px',
          'background-color': isFocusWithin() ? 'red' : '',
          'border': '1px solid gray',
        }}
      >
        <label style={{ display: 'block' }}>
          First Name: <input />
        </label>
        <label style={{ 'display': 'block', 'margin-top': '16px' }}>
          Last Name: <input />
        </label>
      </div>
      <p>isFocusWithin: {JSON.stringify(isFocusWithin())}</p>
    </div>
  )
}
