import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useTitle from '../index'

describe('useTitle', () => {
  it('should update document title', () => {
    const {
      result: [, setTitle],
    } = renderHook(useTitle, {
      initialProps: ['Current Page Title'],
    })

    expect(document.title).toBe('Current Page Title')
    setTitle('Other Page Title')
    expect(document.title).toBe('Other Page Title')
  })

  it('should restore document title on unmount', () => {
    document.title = 'Old Title'

    const hook = renderHook(useTitle, {
      initialProps: ['Current Page Title', { restoreOnUnmount: true }],
    })

    expect(document.title).toBe('Current Page Title')

    hook.cleanup()
    expect(document.title).toBe('Old Title')
  })

  it('should not restore document title on unmount', () => {
    document.title = 'Old Title'

    const hook = renderHook(useTitle, {
      initialProps: ['Current Page Title', { restoreOnUnmount: false }],
    })

    expect(document.title).toBe('Current Page Title')

    hook.cleanup()
    expect(document.title).toBe('Current Page Title')
  })
})
