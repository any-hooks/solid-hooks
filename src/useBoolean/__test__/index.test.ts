import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useBoolean from '..'

const setup = (defaultValue?: boolean) =>
  renderHook(() => useBoolean(defaultValue))

describe('useBoolean', () => {
  it('test on methods', () => {
    const {
      result: [state, { setFalse, setTrue, set, toggle }],
    } = setup()

    expect(state()).toBe(false)

    setTrue()
    expect(state()).toBe(true)

    setFalse()
    expect(state()).toBe(false)

    toggle()
    expect(state()).toBe(true)

    toggle()
    expect(state()).toBe(false)

    set(true)
    expect(state()).toBe(true)

    set(false)
    expect(state()).toBe(false)

    // @ts-ignore
    set(0)
    expect(state()).toBe(false)

    // @ts-ignore
    set('foo')
    expect(state()).toBe(true)
  })

  it('test on default value', () => {
    const hook1 = setup()
    expect(hook1.result[0]()).toBe(false)

    const hook2 = setup(true)
    expect(hook2.result[0]()).toBe(true)

    const hook3 = setup(false)
    expect(hook3.result[0]()).toBe(false)

    // @ts-ignore
    const hook4 = setup('foo')
    expect(hook4.result[0]()).toBe(true)

    // @ts-ignore
    const hook5 = setup(0)
    expect(hook5.result[0]()).toBe(false)

    // @ts-ignore
    const hook6 = setup('')
    expect(hook6.result[0]()).toBe(false)
  })
})
