import { onCleanup } from 'solid-js'
import { throttle } from 'throttle-debounce'
import type { ThrottleOptions } from './throttleOptions'

type noop = (...args: any[]) => any

interface CancelOptions {
  upcomingOnly?: boolean
}

type Cancel = (options?: CancelOptions) => void

/**
 * A hook that deal with the throttled function.
 *
 * 用来处理函数节流的 Hook。
 *
 * @example
 * ```ts
 * const throttled = useThrottleFn(() => {
 *   console.log('throttled')
 * }, { wait: 500})
 *
 * throttled.run()
 * ```
 */
export default function useThrottleFn<T extends noop>(
  fn: T,
  options?: ThrottleOptions,
) {
  const wait = options?.wait ?? 1000

  const throttled = throttle(wait, fn, options)

  const flush = (...args: Parameters<T>): ReturnType<T> => {
    throttled.cancel()
    return fn(...args)
  }

  onCleanup(() => throttled.cancel())

  return {
    run: throttled,
    cancel: throttled.cancel as Cancel,
    flush,
  }
}
