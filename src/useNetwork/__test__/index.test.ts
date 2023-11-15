import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useNetwork from '../index'

describe('useNetwork', () => {
  it('toggle network state', () => {
    const { result } = renderHook(() => useNetwork())
    expect(result().online).toBeTruthy()

    window.dispatchEvent(new Event('offline'))

    expect(result().online).toBeFalsy()

    window.dispatchEvent(new Event('online'))

    expect(result().online).toBeTruthy()
  })
})
