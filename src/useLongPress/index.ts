import { onCleanup, onMount } from 'solid-js'
import type { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'
import isBrowser from '../utils/isBrowser'

type EventType = MouseEvent | TouchEvent
export interface Options {
  /**
   * The delay (in milliseconds) before the long press event is triggered.
   *
   * 长按时间
   */
  delay?: number
  /**
   * Move threshold after press. If exceeded, the long press function won't be triggered
   *
   * 按下后移动阈值，超出则不触发长按事件
   */
  moveThreshold?: { x?: number; y?: number }
  onClick?: (event: EventType) => void
  onLongPressEnd?: (event: EventType) => void
}

const touchSupported =
  isBrowser &&
  ('ontouchstart' in window ||
    // @ts-ignore
    (window.DocumentTouch && document instanceof DocumentTouch))

/**
 * A hook that detects long press events on a target element.
 *
 * 监听目标元素的长按事件。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-long-press zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-long-press en-US}
 *
 * @example
 * ```ts
 * useLongPress(() => setCounter((s) => s + 1), document.body)
 * ```
 */
function useLongPress(
  onLongPress: (event: EventType) => void,
  target: BasicTarget,
  { delay = 300, moveThreshold, onClick, onLongPressEnd }: Options = {},
) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let isTriggered = false
  const pervPosition = { x: 0, y: 0 }

  const hasMoveThreshold = !!(
    (moveThreshold?.x && moveThreshold.x > 0) ||
    (moveThreshold?.y && moveThreshold.y > 0)
  )

  onMount(() => {
    const targetElement = getTargetElement(target)
    if (!targetElement?.addEventListener) {
      return
    }

    const overThreshold = (event: EventType) => {
      const { clientX, clientY } = getClientPosition(event)
      const offsetX = Math.abs(clientX - pervPosition.x)
      const offsetY = Math.abs(clientY - pervPosition.y)

      return !!(
        (moveThreshold?.x && offsetX > moveThreshold.x) ||
        (moveThreshold?.y && offsetY > moveThreshold.y)
      )
    }

    function getClientPosition(event: EventType) {
      if (event instanceof TouchEvent) {
        return {
          clientX: event.touches[0].clientX,
          clientY: event.touches[0].clientY,
        }
      }

      if (event instanceof MouseEvent) {
        return {
          clientX: event.clientX,
          clientY: event.clientY,
        }
      }

      console.warn('Unsupported event type')

      return { clientX: 0, clientY: 0 }
    }

    const onStart = (event: EventType) => {
      if (hasMoveThreshold) {
        const { clientX, clientY } = getClientPosition(event)
        pervPosition.x = clientX
        pervPosition.y = clientY
      }
      timer = setTimeout(() => {
        onLongPress(event)
        isTriggered = true
      }, delay)
    }

    const onMove = (event: TouchEvent) => {
      if (timer && overThreshold(event)) {
        clearInterval(timer)
        timer = undefined
      }
    }

    const onEnd = (event: EventType, shouldTriggerClick: boolean = false) => {
      if (timer) {
        clearTimeout(timer)
      }
      if (isTriggered) {
        onLongPressEnd?.(event)
      }
      if (shouldTriggerClick && !isTriggered && onClick) {
        onClick(event)
      }
      isTriggered = false
    }

    const onEndWithClick = (event: EventType) => onEnd(event, true)

    if (!touchSupported) {
      targetElement.addEventListener('mousedown', onStart as any)
      targetElement.addEventListener('mouseup', onEndWithClick as any)
      targetElement.addEventListener('mouseleave', onEnd as any)
      if (hasMoveThreshold)
        targetElement.addEventListener('mousemove', onMove as any)
    } else {
      targetElement.addEventListener('touchstart', onStart as any)
      targetElement.addEventListener('touchend', onEndWithClick as any)
      if (hasMoveThreshold)
        targetElement.addEventListener('touchmove', onMove as any)
    }
    onCleanup(() => {
      if (timer) {
        clearTimeout(timer)
        isTriggered = false
      }
      if (!touchSupported) {
        targetElement.removeEventListener('mousedown', onStart as any)
        targetElement.removeEventListener('mouseup', onEndWithClick as any)
        targetElement.removeEventListener('mouseleave', onEnd as any)
        if (hasMoveThreshold)
          targetElement.removeEventListener('mousemove', onMove as any)
      } else {
        targetElement.removeEventListener('touchstart', onStart as any)
        targetElement.removeEventListener('touchend', onEndWithClick as any)
        if (hasMoveThreshold)
          targetElement.removeEventListener('touchmove', onMove as any)
      }
    })
  })
}

export default useLongPress
