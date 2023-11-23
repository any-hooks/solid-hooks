import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import {
  type Client,
  type CloseOptions,
  Server,
  type ServerOptions,
} from 'mock-socket'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useWebSocket, { ReadyState } from '..'

const wsUrl = 'ws://localhost:9999'

describe('useWebSocket', () => {
  afterEach(() => {
    WS.clean()
  })

  it('should work', async () => {
    const wsServer = new WS(wsUrl)
    const { result: hook } = renderHook(useWebSocket, { initialProps: [wsUrl] })

    expect(hook.readyState()).toBe(ReadyState.Connecting)
    expect(hook.latestMessage()).toBeUndefined()

    await wsServer.connected
    expect(hook.readyState()).toBe(ReadyState.Open)

    const nowTime = `${Date.now()}`
    hook.sendMessage(nowTime)

    wsServer.send(nowTime)

    expect(hook.latestMessage()?.data).toBe(nowTime)

    wsServer.close()
    await wsServer.closed
    expect(hook.readyState()).toBe(ReadyState.Closed)
  })

  it('disconnect should work', async () => {
    const wsServer = new WS(wsUrl)
    const { result: hook } = renderHook(useWebSocket, { initialProps: [wsUrl] })

    expect(hook.readyState()).toBe(ReadyState.Connecting)

    await wsServer.connected
    expect(hook.readyState()).toBe(ReadyState.Open)

    hook.disconnect()
    await wsServer.closed
    expect(hook.readyState()).toBe(ReadyState.Closed)
  })

  it('useWebSocket should be manually triggered', async () => {
    const wsServer = new WS(wsUrl)

    // eslint-disable-next-line no-new
    new WebSocket(wsUrl)

    const { result: hook } = renderHook(useWebSocket, {
      initialProps: [wsUrl, { manual: true }],
    })

    expect(hook.readyState()).toBe(ReadyState.Closed)

    await wsServer.connected
    expect(hook.readyState()).toBe(ReadyState.Closed)

    hook.connect()
    await sleep(100)
    expect(hook.readyState()).toBe(ReadyState.Open)

    wsServer.close()
    await wsServer.closed
  })

  it('should call method', async () => {
    const wsServer = new WS(wsUrl)
    const onOpen = vi.fn()
    const onClose = vi.fn()

    const { result: hook } = renderHook(useWebSocket, {
      initialProps: [wsUrl, { onOpen, onClose }],
    })

    await wsServer.connected
    expect(hook.readyState()).toBe(ReadyState.Open)
    expect(onOpen).toBeCalled()

    wsServer.close()
    await wsServer.closed
    expect(hook.readyState()).toBe(ReadyState.Closed)
    expect(onClose).toBeCalled()
  })
})

interface MockWebSocket extends Omit<Client, 'close'> {
  close(options?: CloseOptions): void
}

class WS {
  static instances: WS[] = []
  static clean() {
    WS.instances.forEach((item) => {
      item.close()
    })
    WS.instances = []
  }

  server: Server
  messages: any[] = []
  messagesToConsume = new Queue()

  private _isConnected: Promise<Client>
  private _isClosed: Promise<object>

  constructor(url: string, options?: ServerOptions) {
    WS.instances.push(this)

    let connectionResolver: (socket: Client) => void
    let closedResolver!: (socket: Client) => void
    this._isConnected = new Promise(resolve => (connectionResolver = resolve))
    this._isClosed = new Promise(resolve => (closedResolver = resolve))

    this.server = new Server(url, options)

    this.server.on('close', closedResolver)

    this.server.on('connection', (socket: Client) => {
      connectionResolver(socket)

      socket.on('message', (message) => {
        const parsedMessage = message
        this.messages.push(parsedMessage)
        this.messagesToConsume.put(parsedMessage)
      })
    })
  }

  get connected() {
    let resolve: (socket: Client) => void
    const connectedPromise = new Promise<Client>(
      _resolve => (resolve = _resolve),
    )
    const waitForConnected = async () => {
      await this._isConnected
      resolve(await this._isConnected) // make sure `await act` is really done
    }
    waitForConnected()
    return connectedPromise
  }

  get closed() {
    let resolve: () => void
    const closedPromise = new Promise<void>(_resolve => (resolve = _resolve))
    const waitForClosed = async () => {
      await this._isClosed
      await this._isClosed // make sure `await act` is really done
      resolve()
    }
    waitForClosed()
    return closedPromise
  }

  get nextMessage() {
    return this.messagesToConsume.get()
  }

  on(
    eventName: 'connection' | 'message' | 'close',
    callback: (socket: MockWebSocket) => void,
  ): void {
    this.server.on(eventName, callback)
  }

  send(message: string) {
    this.server.emit('message', message)
  }

  close(options?: CloseOptions) {
    this.server.close(options)
  }

  error(options?: CloseOptions) {
    this.server.emit('error', null)
    this.server.close(options)
  }
}

export default class Queue<ItemT> {
  pendingItems: Array<ItemT> = []
  nextItemResolver!: () => void
  nextItem: Promise<void> = new Promise(
    resolve => (this.nextItemResolver = resolve),
  )

  put(item: ItemT): void {
    this.pendingItems.push(item)
    this.nextItemResolver()
    this.nextItem = new Promise(resolve => (this.nextItemResolver = resolve))
  }

  get(): Promise<ItemT> {
    const item = this.pendingItems.shift()
    if (item) {
      // return the next queued item immediately
      return Promise.resolve(item)
    }
    let resolver: (item: ItemT) => void
    const nextItemPromise: Promise<ItemT> = new Promise(
      resolve => (resolver = resolve),
    )
    this.nextItem.then(() => {
      resolver(this.pendingItems.shift() as ItemT)
    })
    return nextItemPromise
  }
}
