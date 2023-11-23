import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useResetSignal from '../index'

describe('useResetState', () => {
  const setUp = <S>(initialState: S) => {
    const {
      result: [state, setState, resetState],
    } = renderHook(useResetSignal, {
      initialProps: [initialState],
    })
    return {
      state,
      setState,
      resetState,
    } as const
  }

  it('should support initialValue', () => {
    const hook = setUp({
      hello: 'world',
    })
    expect(hook.state()).toEqual({ hello: 'world' })
  })

  it('should reset state', () => {
    const hook = setUp({
      hello: '',
      count: 0,
    })

    hook.setState({
      hello: 'world',
      count: 1,
    })

    hook.resetState()

    expect(hook.state()).toEqual({ hello: '', count: 0 })
  })

  it('should support function update', () => {
    const hook = setUp({
      count: 0,
    })
    hook.setState(prev => ({ count: prev.count + 1 }))
    expect(hook.state()).toEqual({ count: 1 })
  })
})
