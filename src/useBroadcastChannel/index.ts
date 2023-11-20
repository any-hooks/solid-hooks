import { createMemo, createSignal, onCleanup, onMount } from 'solid-js'
import isBrowser from '../utils/isBrowser'

export interface Options<T> {
  onMessage?: (e: MessageEvent<T>) => void
  onMessageError?: (e: MessageEvent<T>) => void
}

/**
 * Reactive {@link https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel BroadcastChannel API}.
 *
 * Doc {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-broadcast-channel zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-broadcast-channel en-US}
 *
 * @param channelName channel name
 * @param options options
 *
 * @example
 * ```ts
 * const { data, error, postMessage, close } = useBroadcastChannel('my-channel')
 * ```
 */
export default function useBroadcastChannel<T = string>(
  channelName: string,
  options: Options<T> = {},
) {
  const { onMessage, onMessageError } = options
  const isSupported = createMemo(() =>
    isBrowser && typeof window !== 'undefined'
      ? 'BroadcastChannel' in window
      : false,
  )
  let channel: BroadcastChannel | null = null
  const [data, setData] = createSignal<T>()
  const [error, setError] = createSignal<MessageEvent | null>(null)

  const postMessage = (data: T) => {
    channel?.postMessage(data)
  }

  const close = () => channel?.close()

  onMount(() => {
    if (!isSupported()) return
    setError(null)
    channel = new BroadcastChannel(channelName)
    const messageHandle = (e: MessageEvent<T>) => {
      setData(() => e.data)
      onMessage?.(e)
    }
    const messageErrorHandle = (e: MessageEvent<T>) => {
      setError(() => e)
      onMessageError?.(e)
    }
    channel.addEventListener('message', messageHandle, { passive: true })
    channel.addEventListener('messageerror', messageErrorHandle, {
      passive: true,
    })

    onCleanup(() => {
      channel?.removeEventListener('message', messageHandle)
      channel?.removeEventListener('messageerror', messageErrorHandle)
      channel?.close()
      channel = null
    })
  })

  return {
    channel: () => channel,
    isSupported,
    data,
    error,

    postMessage,
    close,
  }
}
