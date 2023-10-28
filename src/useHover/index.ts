import useBoolean from '../useBoolean'
import useEventListener from '../useEventListener'
import type { BasicTarget } from '../utils/domTarget'

export interface Options {
  onEnter?: () => void
  onLeave?: () => void
  onChange?: (isHovering: boolean) => void
}

/**
 * A hook that tracks whether the target element is being hovered over.
 *
 * 跟踪目标元素是否被悬停的钩子。
 *
 * @param target - The element or ref to track hover for.
 * @param [options] - Optional configuration for the hook.
 * @param [options.onEnter] - Callback function when mouse enters the target.
 * @param [options.onLeave] - Callback function when mouse leaves the target.
 * @param [options.onChange] - Callback function when hover state changes.
 *
 * @example
 * ```ts
 * import { useHover, useRef } from '@any-hooks/solid'
 * function Demo() {
 *   const [ref, setRef] = useRef()
 *   const isHovering = useHover(ref)
 *  return <div ref={setRef}>{isHovering() ? 'hover' : 'leaveHover'}</div>
 * }
 * ```
 */
export default function useHover(target: BasicTarget, options?: Options) {
  const { onEnter, onLeave, onChange } = options || {}

  const [state, { setTrue, setFalse }] = useBoolean(false)

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.()
      setTrue()
      onChange?.(true)
    },
    { target },
  )

  useEventListener(
    'mouseleave',
    () => {
      onLeave?.()
      setFalse()
      onChange?.(false)
    },
    { target },
  )

  return state
}
