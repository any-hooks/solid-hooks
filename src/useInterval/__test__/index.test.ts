import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import useInterval from '../index'

interface ParamsObj {
  fn: (...arg: any) => any
  delay: number | undefined
  options?: { immediate: boolean }
}

const setUp = ({ fn, delay, options }: ParamsObj) =>
  renderHook(() => useInterval(fn, delay, options))

describe('useInterval', () => {
  vi.useFakeTimers()
  vi.spyOn(global, 'clearInterval')

  it('interval should work', () => {
    const callback = vi.fn()
    setUp({ fn: callback, delay: 20 })
    expect(callback).not.toBeCalled()
    vi.advanceTimersByTime(70)
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('interval should stop', () => {
    const callback = vi.fn()

    setUp({ fn: callback, delay: undefined })
    vi.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(0)

    setUp({ fn: callback, delay: -2 })
    vi.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('immediate in options should work', () => {
    const callback = vi.fn()
    setUp({ fn: callback, delay: 20, options: { immediate: true } })
    expect(callback).toBeCalled()
    expect(callback).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(50)
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('interval should be clear', () => {
    const callback = vi.fn()
    const hook = setUp({ fn: callback, delay: 20 })

    expect(callback).not.toBeCalled()

    hook.result.clear()
    vi.advanceTimersByTime(70)
    // not to be called
    expect(callback).toHaveBeenCalledTimes(0)
  })
})
