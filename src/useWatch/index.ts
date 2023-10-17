import type {
  Accessor,
  AccessorArray,
  NoInfer,
  OnEffectFunction,
  OnOptions,
} from 'solid-js'
import { createEffect, on } from 'solid-js'

function useWatch<S, Next extends Prev, Prev = Next>(
  deps: Accessor<S> | AccessorArray<S>,
  fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>,
  options?: OnOptions & { defer?: false },
): void
function useWatch<S, Next extends Prev, Prev = Next>(
  deps: Accessor<S> | AccessorArray<S>,
  fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>,
  options: OnOptions | { defer: true },
): void
function useWatch(deps: any, fn: any, options: any): void {
  return createEffect(on(deps, fn, options))
}

export default useWatch
