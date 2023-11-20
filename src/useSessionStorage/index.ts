import { createUseStorage } from '../_createUseStorage'
import isBrowser from '../utils/isBrowser'

/**
 * A Hook that store state into sessionStorage.
 *
 * 将状态存储在 sessionStorage 中的 Hook 。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-session-storage zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-session-storage en-US}
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
