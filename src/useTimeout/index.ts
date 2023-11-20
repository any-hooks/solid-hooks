import { type Accessor, createSignal, onCleanup, onMount } from 'solid-js'
import { useWatch } from '..'
import { isFunction, isNumber } from '../utils'

/**
 * A hook that executes a function after a specified delay.
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-timeout zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-timeout en-US}
 *
 * @param fn - The function to be executed.
 * @param delay - The delay in milliseconds before executing the function.
 *
 * @example
 * ```ts
 * useTimeout(() => {
 *   setState(state() + 1)
 * }, 3000)
 * ```
 */
export default function useTimeout(
  fn: () => void,
  delay?: number | (() => number | undefined) | Accessor<number | undefined>,
) {
  let timer: ReturnType<typeof setTimeout> | null = null
  const [isMounted, setMounted] = createSignal(false)

  const clear = () => timer && clearTimeout(timer)

  const startTimeout = () => {
    clear()
    const _delay = isFunction(delay) ? delay() : delay
    if (!isNumber(_delay) || _delay < 0) return
    timer = setTimeout(fn, _delay)
  }

  onMount(() => {
    setMounted(true)
    startTimeout()
    onCleanup(() => {
      clear()
      setMounted(false)
    })
  })

  useWatch(
    () => (isFunction(delay) ? delay() : delay),
    () => {
      if (isMounted()) {
        startTimeout()
      }
    },
  )

  return clear
}
