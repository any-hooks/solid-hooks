import { onCleanup } from 'solid-js'
import { debounce } from 'throttle-debounce'
import type { DebounceOptions } from './debounceOptions'

type noop = (...args: any[]) => any

interface CancelOptions {
  upcomingOnly?: boolean
}

type Cancel = (options?: CancelOptions) => void

export default function useDebounceFn<T extends noop>(
  fn: T,
  options?: DebounceOptions,
) {
  const wait = options?.wait ?? 1000

  const debounced = debounce(wait, fn, options)

  const flush = (...args: Parameters<T>): ReturnType<T> => {
    debounced.cancel()
    return fn(...args)
  }

  onCleanup(() => debounced.cancel())

  return {
    run: debounced,
    cancel: debounced.cancel as Cancel,
    flush,
  }
}
