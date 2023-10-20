import { onCleanup } from 'solid-js'
import { throttle } from 'throttle-debounce'
import type { ThrottleOptions } from './throttleOptions'

type noop = (...args: any[]) => any

interface CancelOptions {
  upcomingOnly?: boolean
}

type Cancel = (options?: CancelOptions) => void

export default function useThrottleFn<T extends noop>(
  fn: T,
  options?: ThrottleOptions,
) {
  const wait = options?.wait ?? 1000

  const throttled = throttle(wait, fn, options)

  onCleanup(() => throttled.cancel())

  return {
    run: throttled,
    cancel: throttled.cancel as Cancel,
    flush: fn,
  }
}
