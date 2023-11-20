/**
 * Returns a new function that can be called asynchronously. The returned function
 * will execute the provided function only if it is not already in progress. If the
 * function is already in progress, the subsequent calls will be ignored.
 *
 * 返回一个可以异步调用的新函数。返回的函数只会在提供的函数尚未执行时才会执行。
 * 如果函数已经在进行中，后续的调用将被忽略。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-lock-fn zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-lock-fn en-US}
 *
 * @param  fn - The function to be executed asynchronously.
 */
function useLockFn<P extends any[] = any[], V = any>(
  fn: (...args: P) => Promise<V>,
) {
  let lock = false

  return async (...args: P) => {
    if (lock) return
    lock = true
    try {
      const ret = await fn(...args)
      lock = false
      return ret
    } catch (e) {
      lock = false
      throw e
    }
  }
}

export default useLockFn
