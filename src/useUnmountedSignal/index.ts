import { createSignal, onCleanup, onMount } from 'solid-js'

/**
 * Create a signal that indicates whether the component has been unmounted.
 *
 * 创建一个指示组件是否已卸载的信号。
 *
 */
export default function useUnmountedSignal() {
  const [isUnmounted, setUnmounted] = createSignal(false)

  onMount(() => {
    setUnmounted(false)
    onCleanup(() => setUnmounted(true))
  })

  return isUnmounted
}
