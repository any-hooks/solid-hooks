/**
 * title: Basic usage
 * desc: Default value is boolean，alike useBoolean.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import { useToggle } from '@any-hooks/solid'

export default () => {
  const [state, { setLeft, setRight, toggle }] = useToggle()
  return (
    <div>
      <p>
        Effects：
        {JSON.stringify(state())}
      </p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setLeft} style={{ margin: '0 16px' }}>
          Toggle Left
        </button>
        <button type="button" onClick={setRight}>
          Toggle Right
        </button>
      </p>
    </div>
  )
}
