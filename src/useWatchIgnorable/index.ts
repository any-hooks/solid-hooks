import type {
  Accessor,
  AccessorArray,
  NoInfer,
  OnEffectFunction,
  OnOptions,
} from 'solid-js'
import useWatch from '../useWatch'

type IgnoreUpdates = (fn: () => any) => void

/**
 * Watches for changes in the dependencies and calls the provided function
 * when the dependencies change, and return a wrapper function to ignore the listening
 *
 * 侦听依赖项中的更改，依赖项更改时调用所提供的函数，并返回一个用于忽略侦听的包装函数
 *
 * @param deps - The dependencies to watch for changes.
 * @param fn - The function to call when the dependencies change.
 * @param options - Additional options for the watcher.
 */
function useWatchIgnorable<S, Next extends Prev, Prev = Next>(
  deps: Accessor<S> | AccessorArray<S>,
  fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>,
  options?: OnOptions & { defer?: false },
): IgnoreUpdates
function useWatchIgnorable<S, Next extends Prev, Prev = Next>(
  deps: Accessor<S> | AccessorArray<S>,
  fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>,
  options: OnOptions | { defer: true },
): IgnoreUpdates
function useWatchIgnorable(deps: any, fn: any, options: any): IgnoreUpdates {
  let ignore = false

  const ignoreUpdates: IgnoreUpdates = (fn) => {
    ignore = true
    fn()
    ignore = false
  }

  useWatch(
    deps,
    (...args) => {
      if (!ignore) fn(...args)
    },
    options,
  )

  return ignoreUpdates
}

export default useWatchIgnorable
