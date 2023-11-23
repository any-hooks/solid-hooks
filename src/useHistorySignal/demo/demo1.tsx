/**
 * title: Basic Usage
 * desc:  track the change history of a Signal
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 追踪信号的变化历史
 */

import { useHistorySignal } from '@any-hooks/solid'
import { For, createSignal } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal<number>(0)
  const { undo, redo, history, canRedo, canUndo } = useHistorySignal(count, {
    setSource: source => setCount(source),
  })
  const inc = () => setCount(count => count + 1)
  const dec = () => setCount(count => count - 1)

  return (
    <div>
      <p style={{ 'margin-bottom': '16px' }}>
        count:
        {count()}
      </p>
      <button type="button" onClick={inc} style={{ 'margin-right': '16px' }}>
        inc
      </button>
      <button type="button" onClick={dec} style={{ 'margin-right': '16px' }}>
        dec
      </button>
      <button
        type="button"
        onClick={undo}
        disabled={!canUndo()}
        style={{ 'margin-right': '16px' }}
      >
        undo
      </button>
      <button
        type="button"
        onClick={redo}
        disabled={!canRedo()}
        style={{ 'margin-right': '16px' }}
      >
        redo
      </button>
      <p style={{ 'margin-top': '16px' }}>History: </p>
      <For each={history()}>{record => <p>{JSON.stringify(record)}</p>}</For>
    </div>
  )
}
