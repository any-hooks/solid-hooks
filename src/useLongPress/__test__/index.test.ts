import { renderHook } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useLongPress, { type Options } from '../index'

const mockCallback = vi.fn()
const mockClickCallback = vi.fn()
const mockLongPressEndCallback = vi.fn()

let events: Record<string, any> = {}
const mockTarget = {
  addEventListener: vi.fn((event, callback) => {
    events[event] = callback
  }),
  removeEventListener: vi.fn((event) => {
    Reflect.deleteProperty(events, event)
  }),
}

const setup = (onLongPress: any, target: any, options?: Options) =>
  renderHook(() => useLongPress(onLongPress, target, options))

describe('useLongPress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    events = {}
    vi.useRealTimers()
  })

  it('longPress callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    })
    expect(mockTarget.addEventListener).toBeCalled()
    events.mousedown()
    vi.advanceTimersByTime(350)
    events.mouseleave()
    expect(mockCallback).toBeCalledTimes(1)
    expect(mockLongPressEndCallback).toBeCalledTimes(1)
    expect(mockClickCallback).toBeCalledTimes(0)
  })

  it('click callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    })
    expect(mockTarget.addEventListener).toBeCalled()
    events.mousedown()
    events.mouseup()
    events.mousedown()
    events.mouseup()
    expect(mockCallback).toBeCalledTimes(1)
    expect(mockLongPressEndCallback).toBeCalledTimes(1)
    expect(mockClickCallback).toBeCalledTimes(2)
  })

  it('longPress and click callback correct', () => {
    mockCallback.mockReset()
    mockLongPressEndCallback.mockReset()
    mockClickCallback.mockReset()

    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    })

    expect(mockTarget.addEventListener).toBeCalled()
    events.mousedown()
    vi.advanceTimersByTime(350)
    events.mouseup()
    events.mousedown()
    events.mouseup()

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockLongPressEndCallback).toBeCalledTimes(1)
    expect(mockClickCallback).toBeCalledTimes(1)
  })

  it('onLongPress should not be called when over the threshold', () => {
    mockCallback.mockReset()
    const { cleanup } = setup(mockCallback, mockTarget, {
      moveThreshold: {
        x: 30,
        y: 20,
      },
    })
    expect(events.mousemove).toBeDefined()
    events.mousedown(new MouseEvent('mousedown'))
    events.mousemove(
      new MouseEvent('mousemove', {
        clientX: 40,
        clientY: 10,
      }),
    )
    vi.advanceTimersByTime(320)
    expect(mockCallback).not.toBeCalled()

    cleanup()
    expect(events.mousemove).toBeUndefined()
  })

  it("should not work when target don't support addEventListener method", () => {
    Object.defineProperty(mockTarget, 'addEventListener', {
      get() {
        return false
      },
    })

    setup(() => {}, mockTarget)
    expect(Object.keys(events)).toHaveLength(0)
  })
})
