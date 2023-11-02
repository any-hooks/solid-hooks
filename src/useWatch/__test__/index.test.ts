import { renderHook } from '@solidjs/testing-library'
import { createSignal } from 'solid-js'
import { describe, expect, it, vi } from 'vitest'
import useWatch from '..'

describe('useWatch', () => {
  it('should work', () => {
    const {
      result: [count, setCount],
    } = renderHook(createSignal, { initialProps: [0] })
    const onWatch = vi.fn()
    renderHook(useWatch, { initialProps: [count, onWatch, {}] })

    setCount(1)
    expect(count()).toBe(1)
    expect(onWatch).toBeCalledTimes(2)

    setCount(1)
    expect(onWatch).toBeCalledTimes(2)
  })

  it('should work with defer:true', () => {
    const {
      result: [count, setCount],
    } = renderHook(createSignal, { initialProps: [0] })
    const onWatch = vi.fn()
    renderHook(useWatch, { initialProps: [count, onWatch, { defer: true }] })

    expect(onWatch).toBeCalledTimes(0)

    setCount(1)
    expect(count()).toBe(1)
    expect(onWatch).toBeCalledTimes(1)
  })
})
