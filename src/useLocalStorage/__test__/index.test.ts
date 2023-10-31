import { renderHook } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useLocalStorage from '..'

describe('useLocalStorage', () => {
  const events = new Set<any>()

  const callEvents = (e: any) => {
    events.forEach((fn) => fn(e))
  }

  beforeEach(() => {
    vi.spyOn(window, 'addEventListener').mockImplementation(
      (eventName, callback) => {
        if (eventName === 'storage') {
          events.add(callback)
        }
      },
    )
    vi.spyOn(window, 'removeEventListener').mockImplementation(
      (eventName, callback) => {
        if (eventName === 'storage') {
          events.delete(callback)
        }
      },
    )
  })

  afterEach(() => {
    events.clear()
  })

  const setup = <T>(key: string, value: T, observer = false) => {
    const {
      result: [state, setState],
    } = renderHook(useLocalStorage, {
      initialProps: [key, { defaultValue: value, observer }],
    })
    return { state, setState }
  }

  const getValue = (key: string, value: any) => {
    return {
      storageArea: window.localStorage,
      key,
      newValue: JSON.stringify(value),
    } as StorageEvent
  }

  it('getKey should work', () => {
    const key = 'test-key'
    const { state, setState } = setup(key, 'A')
    expect(state()).toBe('A')

    setState('B')
    expect(state()).toBe('B')

    const otherHook = setup(key, 'C')
    expect(otherHook.state()).toBe('B')

    otherHook.setState('D')
    expect(otherHook.state()).toBe('D')
    expect(state()).toBe('B')
  })

  it('getKey should work with observer', () => {
    const key = 'test-key-observer'
    const hook1 = setup(key, 'A', true)
    const hook2 = setup(key, 'B')

    expect(hook1.state()).toBe('A')
    expect(hook2.state()).toBe('B')

    hook2.setState('C')
    callEvents(getValue(key, 'C'))
    expect(hook1.state()).toBe('C')
  })

  it('should support object', () => {
    const key = 'test-key-object'
    const hook = setup(key, { a: 'A' })

    expect(hook.state()).toEqual({ a: 'A' })

    hook.setState({ a: 'B' })
    expect(hook.state()).toEqual({ a: 'B' })

    const hook2 = setup(key, { a: 'C' }, true)
    expect(hook2.state()).toEqual({ a: 'B' })

    hook.setState({ a: 'D' })
    callEvents(getValue(key, { a: 'D' }))
    expect(hook.state()).toEqual({ a: 'D' })
    expect(hook2.state()).toEqual({ a: 'D' })
  })

  it('should support null, boolean, number', () => {
    const key = 'test-key-null-boolean-number'
    const hook = setup<boolean | number | null>(key, null)
    const hook2 = setup<boolean | number | null>(key, false, true)
    expect(hook.state()).toBe(null)
    expect(hook2.state()).toBe(false)

    hook.setState(true)
    callEvents(getValue(key, true))
    expect(hook.state()).toBe(true)
    expect(hook2.state()).toBe(true)

    hook.setState(2)
    callEvents(getValue(key, 2))
    expect(hook.state()).toBe(2)
    expect(hook2.state()).toBe(2)

    hook.setState(null)
    callEvents(getValue(key, null))
    expect(hook.state()).toBe(null)
    expect(hook2.state()).toBe(null)
  })

  it('should support updater function', () => {
    const key = 'test-key-updater-function'
    const hook = setup(key, 'A')

    expect(hook.state()).toBe('A')

    hook.setState(() => 'B')
    expect(hook.state()).toBe('B')

    hook.setState((state) => `${state}C`)
    expect(hook.state()).toBe('BC')
  })
})
