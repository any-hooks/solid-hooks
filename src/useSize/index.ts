import ResizeObserver from 'resize-observer-polyfill'
import { createComputed, createSignal, onCleanup, onMount } from 'solid-js'
import type { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'

interface Size {
  width: number
  height: number
}

/**
 * A hook that observes size change of an element.
 *
 * 监听 DOM 节点尺寸变化的 Hook。
 *
 * @example
 * ```ts
 * const size = useSize(() => document.body)
 * ```
 */
function useSize(target: BasicTarget) {
  const [state, setState] = createSignal<Size | undefined>()

  createComputed(() => {
    const el = getTargetElement(target)
    setState(
      el ? { width: el.clientWidth, height: el.clientHeight } : undefined,
    )
  })

  onMount(() => {
    const el = getTargetElement(target)

    if (!el) return

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target
        setState({ width: clientWidth, height: clientHeight })
      })
    })
    resizeObserver.observe(el)
    onCleanup(() => {
      resizeObserver.disconnect()
    })
  })

  return state
}

export default useSize
