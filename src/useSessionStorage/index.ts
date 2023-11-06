import { createUseStorage } from '../createUseStorage'
import isBrowser from '../utils/isBrowser'

/**
 * A Hook that store state into sessionStorage.
 *
 * 将状态存储在 sessionStorage 中的 Hook 。
 *
 * @example
 * ```ts
 * const [message, setMessage] = useSessionStorage('use-session-storage-state')
 * ```
 */
const useSessionStorage = createUseStorage(() =>
  isBrowser ? sessionStorage : undefined,
)

export default useSessionStorage
