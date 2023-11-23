import { onCleanup, onMount } from 'solid-js'
import type { TargetType } from '../utils/domTarget'

type UseRefReturn<T> = readonly [
  () => T,
  T extends any[]
    ? (element: T[number], index: number) => void
    : (element: T) => void,
]

/**
 * Create a ref object to hold the DOM element(s)
 *
 * 创建一个 ref 对象，用于保存 DOM element(s)
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-ref zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-ref en-US}
 *
 * @param initialValue - The initial value of the ref object.
 *
 * @example bind one element
 * ```tsx
 * function Demo() {
 *   const [ref, setRef] = useRef()
 *   return <div ref={setRef}></div>
 * }
 * ```
 * @example bind multiple elements
 * ```tsx
 * function Demo() {
 *   const [ref, setRef] = useRef([])
 *   return (<div><For each={[1,2,3]}>
 *     {(item, index) => <div ref={(el) => setRef(el, index())}>{i}</div>}
 *   </For></div>)
 * }
 * ```
 */
function useRef<T extends TargetType = Element>(
  initialValue?: T | null,
): UseRefReturn<T>

function useRef<T extends TargetType[] = Element[]>(
  initialValue?: T | null,
): UseRefReturn<T>

function useRef<T = any>(initialValue?: T | null) {
  let ref: T | null = initialValue ?? null

  const setRef = (element: T, index: number) => {
    if (Array.isArray(ref))
      ref[index] = element
    else
      ref = element
  }

  onMount(() => onCleanup(() => (ref = null)))

  return [() => ref, setRef] as const
}

export default useRef
