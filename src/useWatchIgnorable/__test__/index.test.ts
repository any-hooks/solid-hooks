import { renderHook } from '@solidjs/testing-library'
import { createSignal } from 'solid-js'
import { describe, expect, it, vi } from 'vitest'
import useWatchIgnorable from '..'

describe('useWatchIgnorable', () => {
  it('should work', () => {
    const {
      result: [count, setCount],
    } = renderHook(createSignal, { initialProps: [0] })
    const onWatch = vi.fn()
    const { result: ignoreUpdate } = renderHook(useWatchIgnorable, {
      initialProps: [count, onWatch, {}],
    })

    expect(onWatch).toBeCalledTimes(1)

    setCount(1)
    expect(onWatch).toBeCalledTimes(2)

    ignoreUpdate(() => setCount(2))
    expect(onWatch).toBeCalledTimes(2)

    setCount(3)
    expect(onWatch).toBeCalledTimes(3)
  })
})
