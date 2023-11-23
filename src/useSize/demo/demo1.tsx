/**
 * title: Basic usage
 * desc: useSize can receive element
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useSize 可以接收 element
 */

import { useRef, useSize } from '@any-hooks/solid'

export default () => {
  const [ref, setRef] = useRef()
  const size = useSize(ref)
  return (
    <div ref={setRef}>
      <p>Try to resize the preview window </p>
      <p>
        width:
        {' '}
        {size()?.width}
        px, height:
        {' '}
        {size()?.height}
        px
      </p>
    </div>
  )
}
