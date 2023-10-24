/**
 * title: Basic usage
 * desc: Bind and get DOM element
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 绑定并获取 DOM 元素
 *
 */

import { useRef } from '@any-hooks/solid'
import { createSignal, onMount } from 'solid-js'

export default () => {
  const [ref, setRef] = useRef<HTMLElement>()
  const [text, setText] = createSignal('')

  onMount(() => {
    const el = ref()
    setText(el?.tagName || '')
    console.log(el)
  })

  return (
    <div>
      <p>bind DOM element: {text()}</p>
      <div ref={setRef}>DOM Element</div>
    </div>
  )
}
