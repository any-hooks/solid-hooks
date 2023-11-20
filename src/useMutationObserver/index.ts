import { onCleanup, onMount } from 'solid-js'
import { getTargetElement } from '../utils/domTarget'
import type { BasicTarget } from '../utils/domTarget'

/**
 * Creates a mutation observer that observes changes to the DOM and triggers a callback function.
 *
 * Docs {@link https://solid-hooks.netlify.com/en-US/hooks/use-mutation-observer en-US} |
 *      {@link https://solid-hooks.netlify.com/zh-CN/hooks/use-mutation-observer zh-CN}
 *
 * @param callback - The function to be called when mutations are observed.
 * @param target - The DOM element or a function that returns the DOM element to observe for mutations.
 * @param [options] - Optional configuration options for the observer.
 */
function useMutationObserver(
  callback: MutationCallback,
  target: BasicTarget,
  options: MutationObserverInit = {},
): void {
  onMount(() => {
    const element = getTargetElement(target)
    if (!element) {
      return
    }
    const observer = new MutationObserver(callback)
    observer.observe(element, options)
    onCleanup(() => {
      observer?.disconnect()
    })
  })
}

export default useMutationObserver
