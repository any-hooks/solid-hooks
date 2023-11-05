import { createSignal } from 'solid-js'
import { isFunction } from '../utils'

/**
 * useResetSignal works similar to `createSignal`, it provides a `reset` method
 *
 * 提供重置 state 方法的 Hooks，用法与 `createSignal` 基本一致。
 *
 * @param initialValue - The initial value of the signal. Can be a value or a function that returns a value.
 *
 * @example
 * ```ts
 * const [count, setCount, resetCount] = useResetSignal(0)
 * ```
 */
export default function useResetSignal<T>(initialValue: T | (() => T)) {
  const initial = isFunction(initialValue) ? initialValue() : initialValue
  const [state, setState] = createSignal<T>(initial)

  const resetState = () => setState(() => initial)

  return [state, setState, resetState] as const
}
