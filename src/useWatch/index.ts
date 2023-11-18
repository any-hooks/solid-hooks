import type {
  Accessor,
  AccessorArray,
  NoInfer,
  OnEffectFunction,
  OnOptions,
} from 'solid-js'
import { createEffect, on } from 'solid-js'

/**
 * Watches for changes in the dependencies and calls the provided function when the dependencies change.
 *
 * 监视依赖项中的更改，并在依赖项更改时调用所提供的函数。
 *
 * @param deps - The dependencies to watch for changes.
 * @param fn - The function to call when the dependencies change.
 * @param options - Additional options for the watcher.
 */
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
