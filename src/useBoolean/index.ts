import type { Accessor } from 'solid-js'
import useToggle from '../useToggle'

export interface Actions {
  /**
   * 设置为 `true`
   *
   * set to `true`
   */
  setTrue: () => void
  /**
   * 设置为 `false`
   *
   * set to `false`
   */
  setFalse: () => void
  /**
   * 设置值
   *
   * set value
   */
  set: (value: boolean) => void
  /**
   * 切换 `true / false`
   *
   * toggle `true / false`
   */
  toggle: () => void
}
/**
 * 创建一个 boolean 类型的信号
 *
 * create a boolean type signal
 *
 * @param defaultValue default value 默认值
 * @example
 * ```ts
 * const [state, { setTrue, setFalse, set, toggle }] = useBoolean(false)
 * ```
 */
export default function useBoolean(
  defaultValue = false,
): [Accessor<boolean>, Actions] {
  const [state, { set: _set, toggle }] = useToggle(!!defaultValue)

  const setTrue = () => _set(true)
  const setFalse = () => _set(false)
  const set = (value: boolean) => _set(!!value)

  return [state, { setTrue, setFalse, set, toggle }]
}
