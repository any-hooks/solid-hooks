import { renderHook } from '@solidjs/testing-library'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useDocumentVisibility from '..'

const mockIsBrowser = vi.fn()
const mockVisibility = vi.spyOn(document, 'visibilityState', 'get')

vi.mock('../../utils/isBrowser', () => {
  return {
    __esModule: false,
    get default() {
      return mockIsBrowser()
    },
  }
})

describe('useDocumentVisibility', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('test on isBrowser false', () => {
    mockVisibility.mockReturnValue('hidden')
    mockIsBrowser.mockReturnValue(false)
    const { result: state } = renderHook(useDocumentVisibility)
    expect(state()).toBe('visible')
  })

  it('test on isBrowser true', () => {
    // when visibilityState is hidden
    mockVisibility.mockReturnValue('hidden')
    mockIsBrowser.mockReturnValue(true)
    const { result: state } = renderHook(useDocumentVisibility)
    expect(state()).toBe('hidden')

    // when visibilityState is visible
    mockVisibility.mockReturnValue('visible')
    document.dispatchEvent(new Event('visibilitychange'))
    expect(state()).toBe('visible')
  })
})
