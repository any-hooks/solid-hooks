import {
  type EffectFunction,
  type EffectOptions,
  type NoInfer,
  createEffect,
} from 'solid-js'
import useDebounceFn from '../useDebounceFn'
import { type DebounceOptions } from '../useDebounceFn/debounceOptions'

function useDebounceEffect<Next>(
  effect: EffectFunction<undefined | NoInfer<Next>, Next>,
): void
function useDebounceEffect<Next>(
  effect: EffectFunction<undefined | NoInfer<Next>, Next>,
  options?: DebounceOptions,
): void
function useDebounceEffect<Next, Init = Next>(
  effect: EffectFunction<Init | Next, Next>,
  options?: EffectOptions & DebounceOptions & { render?: boolean; value: Init },
): void
function useDebounceEffect<Next, Init = Next>(
  effect: EffectFunction<Init | Next, Next>,
  options?: EffectOptions & DebounceOptions & { render?: boolean; value?: any },
): void {
  const { value, wait, atBegin = true, ...effectOptions } = options || {}
  const { run } = useDebounceFn(effect, { wait, atBegin })

  createEffect(run, value, effectOptions)
}

export default useDebounceEffect
