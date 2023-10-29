import 'intersection-observer'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { getTargetElement } from '../utils/domTarget'
import type { BasicTarget } from '../utils/domTarget'

type CallbackType = (entry: IntersectionObserverEntry) => void

export interface Options {
  /**
   * Margin around the root
   *
   * 根(root)元素的外边距
   */
  rootMargin?: string
  /**
   * Either a single number or an array of numbers which indicate at what percentage
   * of the target's visibility the ratio should be executed
   *
   * 可以是单一的 number 也可以是 number 数组，
   * target 元素和 root 元素相交程度达到该值的时候 ratio 会被更新
   */
  threshold?: number | number[]
  /**
   * The element that is used as the viewport for checking visibility of the target.
   * Must be the ancestor of the target.
   * Defaults to the browser viewport if not specified or if null.
   *
   * 指定根(root)元素，用于检查目标的可见性。必须是目标元素的父级元素，
   * 如果未指定或者为 null，则默认为浏览器视窗
   */
  root?: BasicTarget<Element>
  /**
   * A callback function that [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
   *
   * [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver) 的回调函数
   */
  callback?: CallbackType
}

/**
 * Observe whether the element is in the visible area of the viewport.
 *
 * 监听元素是否在可视区域内的钩子。
 *
 * @example
 * ```ts
 * const [inViewport, ratio] = useInViewport(() => element)
 * ```
 */
export default function useInViewport(
  target: BasicTarget | BasicTarget[],
  options?: Options,
) {
  const { callback, ...option } = options || {}

  // in viewport state
  const [state, setState] = createSignal<boolean>()
  // ratio state
  const [ratio, setRatio] = createSignal<number>()

  onMount(() => {
    const targets = Array.isArray(target) ? target : [target]
    const els = targets
      .map((element) => getTargetElement(element))
      .filter(Boolean)

    if (!els.length) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setRatio(entry.intersectionRatio)
          setState(entry.isIntersecting)
          callback?.(entry)
        }
      },
      {
        ...option,
        root: getTargetElement(options?.root),
      },
    )
    els.forEach((el) => {
      if (el) {
        observer.observe(el)
      }
    })

    onCleanup(() => {
      observer.disconnect()
    })
  })

  return [state, ratio] as const
}
