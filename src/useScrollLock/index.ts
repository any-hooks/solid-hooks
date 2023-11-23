import { createSignal, onCleanup, onMount } from 'solid-js'
import useEventListener from '../useEventListener'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'
import isAppleDevice from '../utils/isAppleDevice'

function checkOverflowScroll(ele: Element): boolean {
  const style = window.getComputedStyle(ele)
  if (
    style.overflowX === 'scroll'
    || style.overflowY === 'scroll'
    || (style.overflowX === 'auto' && ele.clientWidth < ele.scrollWidth)
    || (style.overflowY === 'auto' && ele.clientHeight < ele.scrollHeight)
  ) {
    return true
  }
  else {
    const parent = ele.parentNode as Element

    if (!parent || parent.tagName === 'BODY')
      return false

    return checkOverflowScroll(parent)
  }
}

function preventDefault(rawEvent: TouchEvent): boolean {
  const e = rawEvent || window.event

  const _target = e.target as Element

  // Do not prevent if element or parentNodes have overflow: scroll set.
  if (checkOverflowScroll(_target))
    return false

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1)
    return true

  if (e.preventDefault)
    e.preventDefault()

  return false
}

/**
 * Locks or unlocks the scroll of the target element.
 *
 * 锁定或解锁目标元素的滚动。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-scroll-lock zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-scroll-lock en-US}
 *
 * @param target - The target element to lock or unlock the scroll.
 * @param initialState - The initial state of the lock. Defaults to false.
 *
 * @example
 * ```ts
 * const [isLock, setLock] = useScrollLock(document.body)
 * ```
 */
export default function useScrollLock(
  target: BasicTarget,
  initialState = false,
) {
  const [isLocked, setLocked] = createSignal(initialState)
  let stopEventListener: (() => void) | null = null
  let initialOverflow: CSSStyleDeclaration['overflow']

  const lock = () => {
    const el = getTargetElement(target) as HTMLElement
    if (!el || isLocked())
      return
    if (isAppleDevice) {
      stopEventListener = useEventListener(
        'touchmove',
        e => preventDefault(e),
        { target, passive: false },
      )
    }
    el.style.overflow = 'hidden'
    setLocked(true)
  }

  const unlock = () => {
    const el = getTargetElement(target) as HTMLElement
    if (!el || !isLocked())
      return
    isAppleDevice && stopEventListener?.()
    el.style.overflow = initialOverflow
    setLocked(false)
  }

  onMount(() => {
    const el = getTargetElement(target) as HTMLElement
    if (el) {
      initialOverflow = el.style.overflow
      if (isLocked())
        el.style.overflow = 'hidden'
    }
    onCleanup(() => unlock())
  })

  const updateLock = (v: boolean) => (v ? lock() : unlock())

  return [isLocked, updateLock] as const
}
