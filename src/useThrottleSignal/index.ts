import type { Setter } from 'solid-js'
import { createSignal } from 'solid-js'
import useThrottleFn from '../useThrottleFn'
import type { ThrottleOptions } from '../useThrottleFn/throttleOptions'

type ThrottleSetter<T> = Setter<T>

/**
 * A hook that deal with the throttled signal.
 *
 * 用来处理节流值的 Hook。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-throttle-signal zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-throttle-signal en-US}
 *
 * @example
 * ```ts
 * const [state, setThrottledState, setSyncState] = useThrottleSignal(0, { wait: 500 })
 * ```
 */
function useThrottleSignal<T>(value?: T, options?: ThrottleOptions) {
  const [state, setState] = createSignal(value)

  const { run } = useThrottleFn((value) => setState(value), options)

  return [state, run as unknown as ThrottleSetter<T>, setState] as const
}

export default useThrottleSignal
