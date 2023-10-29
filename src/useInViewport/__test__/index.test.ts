import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import useInViewport from '../index'

const targetEl = document.createElement('div')
document.body.appendChild(targetEl)

const observe = vi.fn()
const disconnect = vi.fn()

const mockIntersectionObserver = vi.fn().mockReturnValue({
  observe,
  disconnect,
})

window.IntersectionObserver = mockIntersectionObserver

describe('useInViewport', () => {
  it('should work when target is in viewport', async () => {
    const { result } = renderHook(() => useInViewport(targetEl))
    const calls = mockIntersectionObserver.mock.calls
    const [onChange] = calls[calls.length - 1]

    onChange([
      {
        targetEl,
        isIntersecting: true,
        intersectionRatio: 0.5,
      },
    ])

    const [inViewport, ratio] = result
    expect(inViewport()).toBeTruthy()
    expect(ratio()).toBe(0.5)
  })

  it('should work when target array is in viewport and has a callback', async () => {
    const targetEls: HTMLDivElement[] = []
    const callback = vi.fn()
    for (let i = 0; i < 2; i++) {
      const target = document.createElement('div')
      document.body.appendChild(target)
      targetEls.push(target)
    }

    const getValue = (isIntersecting: any, intersectionRatio: any) => ({
      isIntersecting,
      intersectionRatio,
    })

    const {
      result: [inViewport, ratio],
    } = renderHook(() => useInViewport(targetEls, { callback }))
    const calls = mockIntersectionObserver.mock.calls
    const [observerCallback] = calls[calls.length - 1]

    const target = getValue(false, 0)
    observerCallback([target])
    expect(callback).toHaveBeenCalledWith(target)
    expect(inViewport()).toBe(false)
    expect(ratio()).toBe(0)

    const target1 = getValue(true, 0.5)
    observerCallback([target1])
    expect(callback).toHaveBeenCalledWith(target1)
    expect(inViewport()).toBe(true)
    expect(ratio()).toBe(0.5)
  })

  it('should disconnect when unmount', async () => {
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      disconnect,
    })
    const { cleanup } = renderHook(() => useInViewport(targetEl))
    cleanup()
    expect(disconnect).toBeCalled()
  })
})
