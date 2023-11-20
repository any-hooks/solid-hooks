import { createUseStorage } from '../_createUseStorage'
import isBrowser from '../utils/isBrowser'

/**
 * A Hook that store state into localStorage.
 *
 * 将状态存储在 localStorage 中的 Hook 。
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
