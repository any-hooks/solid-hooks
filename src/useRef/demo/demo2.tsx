/**
 * title: Basic usage
 * desc: Bind and get DOM element list
 *
 * title.zh-CN: 进阶用法
 * desc.zh-CN: 绑定并获取 DOM 元素 列表
 */

import { useRef } from '@any-hooks/solid'
import { For, createSignal, onMount } from 'solid-js'

export default () => {
  const [ref, setRef] = useRef<HTMLElement[]>([])
  const [text, setText] = createSignal('')
  const list = ['list-1', 'list-2', 'list-3']

  onMount(() => {
    setText(
      ref()
        .map((r) => r.textContent)
        .join(', '),
    )
    console.log(ref())
  })

  return (
    <div>
      <p>bind DOM element content: [ {text()} ]</p>
      <For each={list}>
        {(item, index) => <div ref={(el) => setRef(el, index())}>{item}</div>}
      </For>
    </div>
  )
}
