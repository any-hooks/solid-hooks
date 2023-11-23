/**
 * title: Listen keydown
 * desc: Press any key to preview.
 *
 * title.zh-CN: 监听 keydown 事件
 * desc.zh-CN: 按下键盘查看效果。
 */

import { useEventListener } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [value, setValue] = createSignal('')

  useEventListener('keydown', (ev) => {
    setValue(ev.code)
  })

  return (
    <p>
      Your press key is
      {value()}
    </p>
  )
}
