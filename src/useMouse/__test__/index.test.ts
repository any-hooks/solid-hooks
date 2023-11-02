import { renderHook, waitFor } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import useMouse from '../index'

describe('useMouse', () => {
  function moveMouse(x: number, y: number) {
    document.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
      }),
    )
  }

  it('on mouseMove', async () => {
    const hook = renderHook(() => useMouse())
    expect(hook.result().pageX).toBeNaN()
    expect(hook.result().pageY).toBeNaN()

    moveMouse(10, 10)

    // can't manually set pageX & pageY for mouseEvent, default undefined here.
    await waitFor(() => expect(hook.result().pageX).toBe(10))
    expect(hook.result().pageY).toBe(10)
    expect(hook.result().clientX).toBe(10)
    expect(hook.result().clientY).toBe(10)
    expect(hook.result().screenX).toBe(10)
    expect(hook.result().screenY).toBe(10)
  })

  it('should be work with target', async () => {
    const events: Record<string, any> = {}
    const getBoundingClientRectMock = vi.spyOn(
      HTMLElement.prototype,
      'getBoundingClientRect',
    )
    vi.spyOn(document, 'addEventListener').mockImplementation(
      vi.fn((event: any, callback: any) => {
        events[event] = callback
      }),
    )

    const targetEl = document.createElement('div')
    getBoundingClientRectMock.mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
    } as DOMRect)
    const { result } = renderHook(() => useMouse(targetEl))
    events.mousemove({ pageX: 100, pageY: 100 })

    await waitFor(() => expect(result().elementX).toBe(0))
    expect(result().elementX).toBe(0)
    expect(result().elementY).toBe(0)
    expect(result().elementPosX).toBe(100)
    expect(result().elementPosY).toBe(100)
  })
})
