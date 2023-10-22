import { onCleanup, onMount } from 'solid-js'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'

type DocumentEventKey = keyof DocumentEventMap

/**
 * Listen for click events outside the target element
 *
 * 监听 目标元素之外的点击事件
 *
 * @see Docs [en-US](https://solid.any-hooks.com/en-US/hooks/use-click-away) |
 *      [zh-CN](https://solid.any-hooks.com/zh-CN/hooks/use-click-away)
 *
 * @param onClickAway 事件回调 event callback
 * @param target 目标元素 target Elements
 * @param eventName 事件名称 event name
 * @example
 * ```ts
 * useClickAway(
 *   () => { console.log('click outside') },
 *   () => document.getElementById('target'),
 * )
 * ```
 */
export default function useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: DocumentEventKey | DocumentEventKey[] = 'click',
) {
  onMount(() => {
    const handle = (event: any) => {
      const targets = Array.isArray(target) ? target : [target]
      if (
        targets.some((item) => {
          const targetElement = getTargetElement(item)
          return (
            !targetElement ||
            targetElement.contains(event.target as HTMLElement)
          )
        })
      ) {
        return
      }
      onClickAway(event)
    }
    const eventNames = Array.isArray(eventName) ? eventName : [eventName]

    eventNames.forEach((eventName) =>
      document.addEventListener(eventName, handle),
    )
    onCleanup(() => {
      eventNames.forEach((eventName) =>
        document.removeEventListener(eventName, handle),
      )
    })
  })
}
