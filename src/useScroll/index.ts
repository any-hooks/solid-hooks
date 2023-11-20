import type { Accessor } from 'solid-js'
import { createSignal, onCleanup, onMount } from 'solid-js'
import type { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'

interface Position {
  left: number
  top: number
}

export type Target = BasicTarget<Element | Document>
export type ScrollListenController = (val: Position) => boolean

/**
 * Get the scroll position of an element.
 *
 * 监听元素的滚动位置。
 *
 * @param target - The target element to listen for scroll events on.
 * @param shouldUpdate - A function that determines whether the scroll position should be updated.
 *
 * Docs {@link https://solid-hooks.netlify.com/en-US/hooks/use-scroll en-US} |
 *      {@link https://solid-hooks.netlify.com/zh-CN/hooks/use-scroll zh-CN}
 *
 * @example
 * ```ts
 * const position = useScroll(() => document.body)
 * ```
 */
function useScroll(
  target?: Target,
  shouldUpdate: ScrollListenController = () => true,
): Accessor<Position | undefined> {
  const [position, setPosition] = createSignal<Position>()

  onMount(() => {
    const el = getTargetElement(target, document)
    if (!el) {
      return
    }
    const updatePosition = () => {
      let newPosition: Position
      if (el === document) {
        if (document.scrollingElement) {
          newPosition = {
            left: document.scrollingElement.scrollLeft,
            top: document.scrollingElement.scrollTop,
          }
        } else {
          // When in quirks mode, the scrollingElement attribute returns the HTML body element if it exists and is potentially scrollable, otherwise it returns null.
          // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scrollingElement
          // https://stackoverflow.com/questions/28633221/document-body-scrolltop-firefox-returns-0-only-js
          newPosition = {
            left: Math.max(
              window.pageXOffset,
              document.documentElement.scrollLeft,
              document.body.scrollLeft,
            ),
            top: Math.max(
              window.pageYOffset,
              document.documentElement.scrollTop,
              document.body.scrollTop,
            ),
          }
        }
      } else {
        newPosition = {
          left: (el as Element).scrollLeft,
          top: (el as Element).scrollTop,
        }
      }
      if (shouldUpdate(newPosition)) {
        setPosition(newPosition)
      }
    }

    updatePosition()

    el.addEventListener('scroll', updatePosition)
    onCleanup(() => {
      el.removeEventListener('scroll', updatePosition)
    })
  })

  return position
}

export default useScroll
