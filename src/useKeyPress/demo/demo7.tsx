/**
 * title: Exact match
 * desc: Enable exact matching by setting `exactMatch`. For example, press [shift + c], will not trigger [c].
 *
 * title.zh-CN: 精确匹配
 * desc.zh-CN: 通过配置 `exactMatch`, 开启精确匹配。比如按 [shift + c] ，不会触发 [c]。
 */

import { useKeyPress } from '@any-hooks/solid'
import { createSignal } from 'solid-js'
import CheckOutlined from '~/components/Icons/CheckOutlined'

export default () => {
  const [state, setState] = createSignal<number>()

  useKeyPress(['shift.c'], () => {
    setState(1)
  })

  useKeyPress(
    ['c'],
    () => {
      setState(2)
    },
    {
      exactMatch: true,
    },
  )

  return (
    <div>
      <p>Try pressing the following: </p>
      <div>
        1. Modifier key [shift.c]:
        {' '}
        {state() === 1 && <CheckOutlined style={{ color: '#f00' }} />}
      </div>
      <div>
        2. Modifier key [c]:
        {' '}
        {state() === 2 && <CheckOutlined style={{ color: '#f00' }} />}
      </div>
    </div>
  )
}
