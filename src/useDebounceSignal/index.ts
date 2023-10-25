import type { Setter } from 'solid-js'
import { createSignal } from 'solid-js'
import useDebounceFn from '../useDebounceFn'
import type { DebounceOptions } from '../useDebounceFn/debounceOptions'

type DebounceSetter<T> = Setter<T>

function useDebounceSignal<T>(value?: T, options?: DebounceOptions) {
  const [state, setState] = createSignal(value)

  const { run } = useDebounceFn((value) => setState(value), options)

  return [state, run as unknown as DebounceSetter<T>, setState] as const
}

export default useDebounceSignal
