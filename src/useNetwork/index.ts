import type { Accessor } from 'solid-js'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { isObject } from '../utils'

export interface NetworkState {
  since?: Date
  online?: boolean
  rtt?: number
  type?: string
  downlink?: number
  saveData?: boolean
  downlinkMax?: number
  effectiveType?: string
}

enum NetworkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change',
}

function getConnection() {
  const nav = navigator as any
  if (!isObject(nav)) return null
  return nav.connection || nav.mozConnection || nav.webkitConnection
}

function getConnectionProperty(): NetworkState {
  const c = getConnection()
  if (!c) return {}
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  }
}

/**
 * A hook that tracks the state of network connection.
 *
 * 管理网络连接状态的 Hook。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-network zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-network en-US}
 *
 * @example
 * ```ts
 * const networkState = useNetwork()
 * createEffect(() => console.log(networkState()))
 * ```
 */
function useNetwork(): Accessor<NetworkState> {
  const [state, setState] = createSignal({
    since: undefined,
    online: navigator?.onLine,
    ...getConnectionProperty(),
  })

  onMount(() => {
    const onOnline = () => {
      setState((prevState) => ({
        ...prevState,
        online: true,
        since: new Date(),
      }))
    }

    const onOffline = () => {
      setState((prevState) => ({
        ...prevState,
        online: false,
        since: new Date(),
      }))
    }

    const onConnectionChange = () => {
      setState((prevState) => ({
        ...prevState,
        ...getConnectionProperty(),
      }))
    }

    window.addEventListener(NetworkEventType.ONLINE, onOnline)
    window.addEventListener(NetworkEventType.OFFLINE, onOffline)

    const connection = getConnection()
    connection?.addEventListener(NetworkEventType.CHANGE, onConnectionChange)

    onCleanup(() => {
      window.removeEventListener(NetworkEventType.ONLINE, onOnline)
      window.removeEventListener(NetworkEventType.OFFLINE, onOffline)
      connection?.removeEventListener(
        NetworkEventType.CHANGE,
        onConnectionChange,
      )
    })
  })

  return state
}

export default useNetwork
