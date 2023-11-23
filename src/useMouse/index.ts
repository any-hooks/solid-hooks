import { createSignal } from 'solid-js'
import useEventListener from '../useEventListener'
import type { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'

export interface CursorState {
  screenX: number
  screenY: number
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  elementX: number
  elementY: number
  elementH: number
  elementW: number
  elementPosX: number
  elementPosY: number
}

const initState: CursorState = {
  screenX: Number.NaN,
  screenY: Number.NaN,
  clientX: Number.NaN,
  clientY: Number.NaN,
  pageX: Number.NaN,
  pageY: Number.NaN,
  elementX: Number.NaN,
  elementY: Number.NaN,
  elementH: Number.NaN,
  elementW: Number.NaN,
  elementPosX: Number.NaN,
  elementPosY: Number.NaN,
}

/**
 * A hook that tracks the mouse position and optionally the position relative to a target element.
 *
 * 用于跟踪鼠标位置和相对于目标元素的位置。
 *
 * Docs {@link https://solid-hooks.netlify.com/en-US/hooks/use-mouse en-US} |
 *      {@link https://solid-hooks.netlify.com/zh-CN/hooks/use-mouse zh-CN}
 *
 * @param target - The target element to track the mouse position relative to.
 */
export default function useMouse(target?: BasicTarget) {
  const [state, setState] = createSignal(initState)

  useEventListener(
    'mousemove',
    (event: MouseEvent) => {
      const { screenX, screenY, clientX, clientY, pageX, pageY } = event
      const newState = {
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
        elementX: Number.NaN,
        elementY: Number.NaN,
        elementH: Number.NaN,
        elementW: Number.NaN,
        elementPosX: Number.NaN,
        elementPosY: Number.NaN,
      }
      const targetElement = getTargetElement(target)
      if (targetElement) {
        const { left, top, width, height }
          = targetElement.getBoundingClientRect()
        newState.elementPosX = left + window.pageXOffset
        newState.elementPosY = top + window.pageYOffset
        newState.elementX = pageX - newState.elementPosX
        newState.elementY = pageY - newState.elementPosY
        newState.elementW = width
        newState.elementH = height
      }
      setState(newState)
    },
    {
      target: () => document,
    },
  )

  return state
}
