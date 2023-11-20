import type { Accessor } from 'solid-js'
import { createSignal, onCleanup, onMount } from 'solid-js'
import useWatch from '../useWatch'
import { isFunction, isNumber } from '../utils'

/**
 * A hook that executes a function repeatedly with a specified delay.
 *
 * 指定的延迟重复执行函数的钩子。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-interval zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-interval en-US}
 *
 * @param fn - The function to execute.
 * @param [delay] - The delay between each execution.
 * @param [options] - Optional configuration object.
 * @param [options.immediate] - Whether to execute the function immediately.
 *
 * @example
 * ```ts
 * const [count, setCount] = createSignal(0)
 * useInterval(() => {
 *   setCount(count() + 1)
 * }, 1000)
 * ```
 */
export default function useInterval(
  fn: () => void,
  delay?: number | (() => number | undefined) | Accessor<number | undefined>,
  options: {
    immediate?: boolean
  } = {},
) {
  let timer: ReturnType<typeof setInterval> | null = null
  const [isMounted, setMounted] = createSignal(false)

  const clear = () => timer && clearInterval(timer)

  const startInterval = () => {
    clear()

    const _delay = isFunction(delay) ? delay() : delay

    if (!isNumber(_delay) || _delay < 0) return

    if (options.immediate) fn()

    timer = setInterval(fn, _delay)
  }

  onMount(() => {
    setMounted(true)
    startInterval()
    onCleanup(() => {
      clear()
      setMounted(false)
    })
  })

  useWatch(
    () => (isFunction(delay) ? delay() : delay),
    () => {
      if (isMounted()) {
        startInterval()
      }
    },
    { defer: true },
  )

  return { clear, start: startInterval }
}
