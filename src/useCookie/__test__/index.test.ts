import { renderHook } from '@solidjs/testing-library'
import Cookies from 'js-cookie'
import { describe, expect, it } from 'vitest'
import useCookie, { type Options } from '..'

describe('useCookie', () => {
  const setup = (key: string, options?: Options) => {
    const {
      result: [state, setState],
    } = renderHook(useCookie, {
      initialProps: [key, options],
    })
    return { state, setState }
  }

  it('get key should work', () => {
    const KEY = 'test-key'
    const hooks = setup(KEY, { defaultValue: 'foo' })
    expect(hooks.state()).toBe('foo')

    hooks.setState('bar')
    expect(hooks.state()).toBe('bar')

    const otherHooks = setup(KEY, { defaultValue: 'foo' })
    expect(otherHooks.state()).toBe('bar')

    otherHooks.setState('fuzz')
    expect(otherHooks.state()).toBe('fuzz')
    expect(hooks.state()).toBe('bar')
    expect(Cookies.get(KEY)).toBe('fuzz')
  })

  it('should support undefined', () => {
    const KEY = 'test-boolean-key-with-undefined'
    const hook1 = setup(KEY, { defaultValue: 'undefined' })

    expect(hook1.state()).toBe('undefined')

    hook1.setState(undefined)
    expect(hook1.state()).toBeUndefined()

    const hook2 = setup(KEY, { defaultValue: 'false' })
    expect(hook2.state()).toBe('false')
    expect(Cookies.get(KEY)).toBeUndefined()

    // @ts-ignore
    hook1.setState()
    expect(hook1.state()).toBeUndefined()
    expect(Cookies.get(KEY)).toBeUndefined()
  })

  it('should support empty string', () => {
    const KEY = 'test-key-empty-string'
    Cookies.set(KEY, '')
    expect(Cookies.get(KEY)).toBe('')

    const { state } = setup(KEY, { defaultValue: 'foo' })
    expect(state()).toBe('')
  })

  it('show support function updater', () => {
    const KEY = 'test-key-function-updater'
    const { state, setState } = setup(KEY, { defaultValue: () => 'foo' })
    expect(state()).toBe('foo')

    setState((state) => `${state} bar`)
    expect(state()).toBe('foo bar')
  })
})
