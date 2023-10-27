import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useToggle from '..'

describe('useToggle', () => {
  it('test on init', () => {
    const {
      result: [state],
    } = renderHook(() => useToggle())
    expect(state()).toBe(false)
  })

  it('test on method', () => {
    const {
      result: [state, { setLeft, setRight, set, toggle }],
    } = renderHook(() => useToggle('foo'))

    expect(state()).toBe('foo')

    toggle()
    expect(state()).toBe(false)

    toggle()
    expect(state()).toBe('foo')

    setRight()
    expect(state()).toBe(false)

    setLeft()
    expect(state()).toBe('foo')

    set('bar')
    expect(state()).toBe('bar')

    set('foo')
    expect(state()).toBe('foo')
  })

  it('test on optional', () => {
    const {
      result: [state, { setLeft, setRight, set, toggle }],
    } = renderHook(() => useToggle('foo', 'bar'))

    setRight()
    expect(state()).toBe('bar')

    setLeft()
    expect(state()).toBe('foo')

    set('bar')
    expect(state()).toBe('bar')

    set('foo')
    expect(state()).toBe('foo')

    toggle()
    expect(state()).toBe('bar')

    toggle()
    expect(state()).toBe('foo')
  })
})
