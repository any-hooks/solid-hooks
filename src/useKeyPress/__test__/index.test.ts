import { fireEvent, renderHook } from '@solidjs/testing-library'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useKeyPress from '..'

const callback = vi.fn()

describe('useKeyPress', () => {
  afterEach(() => {
    callback.mockClear()
  })

  it('test single key', async () => {
    const { cleanup } = renderHook(() => useKeyPress(['c'], callback))
    fireEvent.keyDown(document, { key: 'c', keyCode: 67 })
    expect(callback.mock.calls.length).toBe(1)
    cleanup()
  })

  it('test modifier key', async () => {
    const { cleanup } = renderHook(() => useKeyPress(['ctrl'], callback))
    fireEvent.keyDown(document, { key: 'ctrl', keyCode: 17, ctrlKey: true })
    expect(callback.mock.calls.length).toBe(1)
    cleanup()
  })

  it('test combination keys', async () => {
    const hook1 = renderHook(() => useKeyPress(['shift.c'], callback))
    const hook2 = renderHook(() => useKeyPress(['shift'], callback))
    const hook3 = renderHook(() => useKeyPress(['c'], callback))

    fireEvent.keyDown(document, { key: 'c', shiftKey: true, keyCode: 67 })

    expect(callback.mock.calls.length).toBe(3)
    hook1.cleanup()
    hook2.cleanup()
    hook3.cleanup()
  })

  it('test combination keys by exact match', async () => {
    const callbackShift = vi.fn()
    const callbackC = vi.fn()
    const callbackMulti = vi.fn()
    const hook1 = renderHook(() =>
      useKeyPress(['shift.c'], callback, { exactMatch: true }),
    )
    const hook2 = renderHook(() =>
      useKeyPress(['shift'], callbackShift, { exactMatch: true }),
    )
    const hook3 = renderHook(() =>
      useKeyPress(['c'], callbackC, { exactMatch: true }),
    )
    const hook4 = renderHook(() => useKeyPress(['ctrl.shift.c'], callbackMulti))

    fireEvent.keyDown(document, { key: 'c', shiftKey: true, keyCode: 67 })
    /**
     * 只有 shift.c 才会触发，shift 和 c 都不应该触发
     */
    expect(callback.mock.calls.length).toBe(1)
    expect(callbackShift.mock.calls.length).toBe(0)
    expect(callbackC.mock.calls.length).toBe(0)

    callback.mockClear()
    fireEvent.keyDown(document, {
      key: 'c',
      ctrlKey: true,
      shiftKey: true,
      keyCode: 67,
    })
    expect(callbackMulti.mock.calls.length).toBe(1)
    expect(callback.mock.calls.length).toBe(0)
    expect(callbackC.mock.calls.length).toBe(0)

    hook1.cleanup()
    hook2.cleanup()
    hook3.cleanup()
    hook4.cleanup()
  })

  it('test multiple keys', async () => {
    const { cleanup } = renderHook(() => useKeyPress(['0', 65], callback))
    fireEvent.keyDown(document, { key: '0', keyCode: 48 })
    fireEvent.keyDown(document, { key: 'a', keyCode: 65 })
    expect(callback.mock.calls.length).toBe(2)
    cleanup()
  })

  it('meta key should be work in keyup event', async () => {
    renderHook(() =>
      useKeyPress(['meta'], callback, {
        events: ['keyup'],
      }),
    )

    fireEvent.keyUp(document, { key: 'meta', keyCode: 91, metaKey: false })
    expect(callback).toBeCalled()
  })

  it('test `keyFilter` function parameter', async () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()

    // all keys can trigger callback
    const hook1 = renderHook(() => useKeyPress(() => true, callback1))
    fireEvent.keyDown(document, { key: '0', keyCode: 48 })
    fireEvent.keyDown(document, { key: 'a', keyCode: 65 })
    expect(callback1.mock.calls.length).toBe(2)

    // only some keys can trigger callback
    const hook2 = renderHook(() =>
      useKeyPress(e => ['0', 'meta'].includes(e.key), callback2),
    )
    fireEvent.keyDown(document, { key: '0', keyCode: 48 })
    fireEvent.keyDown(document, { key: '1', keyCode: 49 })
    fireEvent.keyDown(document, { key: 'ctrl', keyCode: 17, ctrlKey: true })
    fireEvent.keyDown(document, { key: 'meta', keyCode: 91, metaKey: true })
    expect(callback2.mock.calls.length).toBe(2)

    hook1.cleanup()
    hook2.cleanup()
  })

  it('test key in `eventHandler` parameter', async () => {
    let pressedKey
    const KEYS = ['c', 'shift.c', 'shift.ctrl.c']
    const callbackKey = (_: any, key: any) => {
      pressedKey = key
    }

    // test `exactMatch: true` props
    const hook1 = renderHook(() =>
      useKeyPress(KEYS, callbackKey, { exactMatch: true }),
    )
    fireEvent.keyDown(document, { key: 'c', keyCode: 67 })
    expect(pressedKey).toBe('c')
    fireEvent.keyDown(document, { key: 'c', keyCode: 67, shiftKey: true })
    expect(pressedKey).toBe('shift.c')
    fireEvent.keyDown(document, {
      key: 'c',
      keyCode: 67,
      shiftKey: true,
      ctrlKey: true,
    })
    expect(pressedKey).toBe('shift.ctrl.c')

    // test `exactMatch: false`(default) props
    const hook2 = renderHook(() => useKeyPress(KEYS, callbackKey))
    fireEvent.keyDown(document, { key: 'c', keyCode: 67 })
    expect(pressedKey).toBe('c')
    fireEvent.keyDown(document, { key: 'c', keyCode: 67, shiftKey: true })
    expect(pressedKey).toBe('c')
    fireEvent.keyDown(document, {
      key: 'c',
      keyCode: 67,
      shiftKey: true,
      ctrlKey: true,
    })
    expect(pressedKey).toBe('c')

    hook2.cleanup()
    hook1.cleanup()
  })
})
