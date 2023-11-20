import { type Accessor, createSignal } from 'solid-js'

export interface Actions<T> {
  setLeft: () => void
  setRight: () => void
  set: (value: T) => void
  toggle: () => void
}

/**
 * A hook that toggle states.
 *
 * 用于在两个状态值间切换的 Hook。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-toggle zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-toggle en-US}
 *
 * @param defaultValue - The default value of the state.
 * @param reverseValue - The reverse value of the state.
 *
 * @example
 * ```ts
 * const [value, { set, toggle, setLeft, setRight }] = useToggle()
 * ```
 */
function useToggle<T = boolean>(): [Accessor<T>, Actions<T>]

function useToggle<T>(defaultValue: T): [Accessor<T>, Actions<T>]

function useToggle<T, U>(
  defaultValue: T,
  reverseValue: U,
): [Accessor<T | U>, Actions<T | U>]

function useToggle<T, U>(
  defaultValue: T = false as unknown as T,
  reverseValue?: U,
) {
  const [value, setValue] = createSignal<T | U>(defaultValue)

  const reverseValueOrigin = (
    reverseValue === undefined ? !defaultValue : reverseValue
  ) as T | U

  const set = (value: T | U) => setValue(() => value)

  const toggle = () =>
    setValue((v) => (v === defaultValue ? reverseValueOrigin : defaultValue))

  const setLeft = () => setValue(() => defaultValue)

  const setRight = () => setValue(() => reverseValueOrigin)

  return [value, { set, toggle, setLeft, setRight }]
}

export default useToggle
