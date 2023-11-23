import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import useTimeout from '..'

interface ParamsObj {
  fn: (...arg: any) => any
  delay: number | undefined
}

function setup({ fn, delay }: ParamsObj) {
  const { result } = renderHook(useTimeout, { initialProps: [fn, delay] })
  return result
}

describe('useTimeout', () => {
  vi.useFakeTimers()
  vi.spyOn(globalThis, 'clearTimeout')

  it('timeout should work', () => {
    const callback = vi.fn()

    setup({ fn: callback, delay: 20 })

    expect(callback).not.toBeCalled()
    vi.advanceTimersByTime(70)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('timeout should stop', () => {
    const callback = vi.fn()

    setup({ fn: callback, delay: undefined })
    vi.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(0)

    setup({ fn: callback, delay: -2 })
    vi.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('timeout should be clear', () => {
    const callback = vi.fn()

    const hook = setup({ fn: callback, delay: 20 })
    expect(callback).not.toBeCalled()

    hook()
    vi.advanceTimersByTime(30)
    expect(callback).toHaveBeenCalledTimes(0)
  })
})
