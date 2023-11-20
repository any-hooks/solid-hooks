import { onCleanup } from 'solid-js'
import { debounce } from 'throttle-debounce'
import type { DebounceOptions } from './debounceOptions'

type noop = (...args: any[]) => any

interface CancelOptions {
  upcomingOnly?: boolean
}

type Cancel = (options?: CancelOptions) => void

/**
 * A hook that deal with the debounced function.
 *
 * 用来处理防抖函数的 Hook。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-debounce-fn zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-debounce-fn en-US}
 *
 * @example
 * ```ts
 * const debounced = useDebounceFn(() => {
 *   console.log('debounced')
 * }, { wait: 1000 })
 * debounced.run()
 * })
 * ```
 */
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
