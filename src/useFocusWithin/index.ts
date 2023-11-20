import { createSignal } from 'solid-js'
import useEventListener from '../useEventListener'
import type { BasicTarget } from '../utils/domTarget'

export interface Options {
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  onChange?: (isFocusWithin: boolean) => void
}

/**
 * Monitor whether the current focus is within a certain area, Same as css attribute {@link https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within :focus-within}.
 *
 * 监听当前焦点是否在某个区域之内，同 css 属性 {@link https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within :focus-within}。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-focus-within zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-focus-within en-US}
 *
 * @example
 * ```ts
 * const isFocusWithin = useFocusWithin(() => target, {
 *   onFocus: () => console.log('focus'),
 *   onBlur: () => console.log('blur'),
 * })
 * ```
 */
export default function useFocusWithin(target: BasicTarget, options?: Options) {
  const [isFocusWithin, setIsFocusWithin] = createSignal(false)
  const { onFocus, onBlur, onChange } = options || {}

  useEventListener(
    'focusin',
    (e: FocusEvent) => {
      if (!isFocusWithin()) {
        onFocus?.(e)
        onChange?.(true)
        setIsFocusWithin(true)
      }
    },
    { target },
  )

  useEventListener(
    'focusout',
    (e: FocusEvent) => {
      if (
        isFocusWithin() &&
        !(e.currentTarget as Element)?.contains?.(e.relatedTarget as Element)
      ) {
        onBlur?.(e)
        onChange?.(false)
        setIsFocusWithin(false)
      }
    },
    { target },
  )

  return isFocusWithin
}
