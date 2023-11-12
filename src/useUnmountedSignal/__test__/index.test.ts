import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useUnmountedSignal from '../'

describe('useUnmountedSignal', () => {
  it('should work', () => {
    const { result: isUnmounted, cleanup } = renderHook(useUnmountedSignal)

    expect(isUnmounted()).toBe(false)

    cleanup()
    expect(isUnmounted()).toBe(true)
  })
})
