/**
 * title: Mouse position relative to the element
 * desc: By passing in the target element, you can get the position of the mouse relative to the element.
 *
 * title.zh-CN: 获取鼠标相对于元素的位置
 * desc.zh-CN: 通过传入目标元素，可以获取鼠标相对于元素的位置。
 */

import { useMouse, useRef } from '@any-hooks/solid'

export default () => {
  const [ref, setRef] = useRef()
  const mouse = useMouse(ref)

  return (
    <>
      <div
        ref={setRef}
        style={{
          'width': '200px',
          'height': '200px',
          'background-color': 'gray',
          'color': 'white',
          'line-height': '200px',
          'text-align': 'center',
        }}
      >
        element
      </div>
      <div>
        <p>
          Mouse In Element - x: {mouse().elementX}, y: {mouse().elementY}
        </p>
        <p>
          Element Position - x: {mouse().elementPosX}, y: {mouse().elementPosY}
        </p>
        <p>
          Element Dimensions - width: {mouse().elementW}, height:{' '}
          {mouse().elementH}
        </p>
      </div>
    </>
  )
}
