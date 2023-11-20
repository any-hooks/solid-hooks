import { type Accessor, createSignal, onCleanup, onMount } from 'solid-js'
import EventEmitter from '../utils/eventEmitter'

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export interface Options {
  /**
   * Retry times
   *
   * 重试次数
   * @default 3
   */
  reconnectLimit?: number
  /**
   * Retry interval(ms)
   *
   * 重试时间间隔（ms）
   * @default 3000
   */
  reconnectInterval?: number
  /**
   * Manually starts connection
   *
   * 手动启动连接
   * @default false
   */
  manual?: boolean
  onOpen?: (event: WebSocketEventMap['open'], instance: WebSocket) => void
  onClose?: (event: WebSocketEventMap['close'], instance: WebSocket) => void
  onMessage?: (
    message: WebSocketEventMap['message'],
    instance: WebSocket,
  ) => void
  onError?: (event: WebSocketEventMap['error'], instance: WebSocket) => void

  protocols?: string | string[]
}

export interface Result {
  latestMessage: Accessor<WebSocketEventMap['message'] | undefined>
  sendMessage: WebSocket['send']
  disconnect: (force?: boolean) => void
  connect: () => void
  readyState: Accessor<ReadyState>
  webSocketIns: () => WebSocket | null
}

interface WebSocketCacheItem {
  ws: WebSocket | null
  linkCount: number
  reconnectCount: number
  reconnectLimit: number
  reconnectInterval: number
  readyState: ReadyState
  events: EventEmitter
}

const wsCache = new Map<string, WebSocketCacheItem>()
let reconnectTimer: ReturnType<typeof setTimeout> | null = null

function createWebWebSocket(url: string, options: Options): WebSocketCacheItem {
  if (wsCache.has(url)) {
    const item = wsCache.get(url)!
    item.reconnectInterval = Math.max(
      item.reconnectInterval,
      options.reconnectInterval || 0,
    )
    item.reconnectLimit = Math.max(
      item.reconnectLimit,
      options.reconnectLimit || 0,
    )

    return item
  }

  const item: WebSocketCacheItem = {
    ws: null,
    linkCount: 0,
    reconnectCount: 0,
    readyState: ReadyState.Closed,
    reconnectLimit: options.reconnectLimit || 0,
    reconnectInterval: options.reconnectInterval || 0,
    events: new EventEmitter(),
  }
  wsCache.set(url, item)
  return item
}

/**
 * A hook for WebSocket.
 *
 * 用于处理 WebSocket 的 Hook。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-websocket zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-websocket en-US}
 *
 */
export default function useWebSocket(
  socketUrl: string,
  options: Options = {},
): Result {
  const {
    reconnectLimit = 3,
    reconnectInterval = 3 * 1000,
    manual = false,
    protocols,
  } = options

  let cache!: WebSocketCacheItem

  const [latestMessage, setLatestMessage] = createSignal<
    WebSocketEventMap['message'] | undefined
  >(undefined)
  const [readyState, setReadyState] = createSignal<ReadyState>(
    ReadyState.Closed,
  )

  function onError(event: WebSocketEventMap['error'], ws: WebSocket) {
    setReadyState(ws.readyState || ReadyState.Closed)
    options.onError?.(event, ws)
    reconnect()
  }

  function onOpen(event: WebSocketEventMap['open'], ws: WebSocket) {
    setReadyState(ws.readyState || ReadyState.Open)
    cache.reconnectCount = 0
    options.onOpen?.(event, ws)
  }

  function onClose(event: WebSocketEventMap['close'], ws: WebSocket) {
    setReadyState(ws.readyState || ReadyState.Closed)
    options.onClose?.(event, ws)
    if (cache.linkCount > 0 && cache.ws) {
      reconnect()
    }
    if (cache.linkCount === 0 && !cache.ws) {
      cache.events.off('close', onClose)
      cache.events.clear()
    }
  }

  function onMessage(message: WebSocketEventMap['message'], ws: WebSocket) {
    setLatestMessage(message)
    options.onMessage?.(message, ws)
  }

  function reconnect() {
    if (
      cache.reconnectCount >= cache.reconnectLimit ||
      readyState() === ReadyState.Open
    ) {
      return
    }
    reconnectTimer && clearTimeout(reconnectTimer)
    reconnectTimer = setTimeout(() => {
      connect()
      cache.reconnectCount += 1
    }, reconnectInterval)
  }

  function connect() {
    cache = createWebWebSocket(socketUrl, {
      reconnectInterval,
      reconnectLimit,
    })

    cache.events.on('error', onError)
    cache.events.on('open', onOpen)
    cache.events.on('close', onClose)
    cache.events.on('message', onMessage)

    reconnectTimer && clearTimeout(reconnectTimer)
    if (
      cache.readyState === ReadyState.Open ||
      cache.readyState === ReadyState.Connecting
    ) {
      setReadyState(cache.readyState)
      return
    }

    const ws = (cache.ws = new WebSocket(socketUrl, protocols))
    cache.linkCount += 1
    cache.readyState = ReadyState.Connecting
    setReadyState(cache.readyState)

    ws.onerror = (e) => cache.events.emit('error', e, ws)
    ws.onopen = (e) => cache.events.emit('open', e, ws)
    ws.onclose = (e) => cache.events.emit('close', e, ws)
    ws.onmessage = (e) => cache.events.emit('message', e, ws)
  }

  function disconnect(force = true) {
    reconnectTimer && clearTimeout(reconnectTimer)
    if (!cache) return
    const ws = cache.ws
    cache.linkCount -= 1
    if (cache.linkCount <= 0 || force) {
      cache.ws = null
      ws?.close()
      wsCache.delete(socketUrl)
    } else {
      cache.events.off('close', onClose)
    }
    cache.events.off('error', onError)
    cache.events.off('open', onOpen)
    cache.events.off('message', onMessage)
  }

  const sendMessage: WebSocket['send'] = (message) => {
    const ws = cache?.ws
    if (ws && ws.readyState === ReadyState.Open) {
      ws.send(message)
    } else {
      throw new Error('WebSocket disconnected')
    }
  }

  onMount(() => {
    if (!manual && socketUrl) {
      connect()
    }

    onCleanup(() => {
      disconnect(false)
    })
  })

  return {
    webSocketIns: () => cache?.ws,
    latestMessage,
    readyState,
    sendMessage,
    connect,
    disconnect,
  }
}
