import { type TargetType } from '../utils/domTarget'

type UseRefReturn<T> = readonly [
  () => T,
  T extends any[]
    ? (element: T[number], index: number) => void
    : (element: T) => void,
]

function useRef<T extends TargetType = Element>(
  initialValue?: T | null,
): UseRefReturn<T>

function useRef<T extends TargetType[] = Element[]>(
  initialValue?: T | null,
): UseRefReturn<T>

function useRef<T = any>(initialValue?: T | null) {
  let ref: T | null = initialValue ?? null

  const setRef = (element: T, index: number) => {
    if (Array.isArray(ref)) {
      ref[index] = element
    } else {
      ref = element
    }
  }

  return [() => ref, setRef] as const
}

export default useRef
