import { createUseStorage } from '../_createUseStorage'
import isBrowser from '../utils/isBrowser'

/**
 * A Hook that store state into localStorage.
 *
 * 将状态存储在 localStorage 中的 Hook 。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-local-storage zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-local-storage en-US}
 *
 * @example
 * ```ts
 * const [message, setMessage] = useLocalStorage('use-local-storage-state')
 * ```
 */
const useLocalStorage = createUseStorage(() =>
  isBrowser ? localStorage : undefined,
)

export default useLocalStorage
