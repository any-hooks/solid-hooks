/**
 * title: Basic usage
 * desc: Use ref to set element that needs monitoring.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用 ref 设置需要监听的元素。
 */

import { useHover, useRef } from '@any-hooks/solid'

export default () => {
  const [ref, setRef] = useRef()
  const isHovering = useHover(ref)

  return <div ref={setRef}>{isHovering() ? 'hover' : 'leaveHover'}</div>
}
