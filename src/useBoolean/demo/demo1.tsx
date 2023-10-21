/**
 * title: Basic usage
 * desc: Toggle boolean, default value can be set optionally.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 切换 boolean，可以接收默认值。
 */

import { useBoolean } from '@any-hooks/solid'

export default () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true)

  return (
    <div>
      <p>Effects：{JSON.stringify(state())}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setFalse} style={{ margin: '0 16px' }}>
          Set false
        </button>
        <button type="button" onClick={setTrue}>
          Set true
        </button>
      </p>
    </div>
  )
}
