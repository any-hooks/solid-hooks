/**
 * title: SetState can receive function
 * desc: Function updater is also acceptable with useCookieState's setState，similar to how useState is used.
 *
 * title.zh-CN: setState 可以接收函数
 * desc.zh-CN: useCookieState 的 setState 可以接收 function updater，就像 useState 那样。
 */

import { useCookie } from '@any-hooks/solid'

export default function App() {
  const [value, setValue] = useCookie('useCookieUpdater', {
    defaultValue: '0',
  })

  return (
    <>
      <p>{value()}</p>
      <button
        type="button"
        style={{ 'margin-right': '16px' }}
        onClick={() => setValue(v => String(Number(v) + 1))}
      >
        inc +
      </button>
      <button
        type="button"
        style={{ 'margin-right': '16px' }}
        onClick={() => setValue(v => String(Number(v) - 1))}
      >
        dec -
      </button>
      <button type="button" onClick={() => setValue('0')}>
        reset
      </button>
    </>
  )
}
