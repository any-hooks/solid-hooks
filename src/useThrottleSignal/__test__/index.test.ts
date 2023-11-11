import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useThrottleSignal from '..'

describe('useThrottleSignal', () => {
  const setup = (defaultValue: any, wait?: number) => {
    const {
      result: [state, setState],
    } = renderHook(useThrottleSignal, {
      initialProps: [defaultValue, { wait }],
    })
    return { state, setState }
  }

  it('default useThrottle should work', async () => {
    const { state, setState } = setup(1, 500)

    expect(state()).toBe(1)

    setState(2)
    setState(3)
    setState(4)
    await sleep(250)
    expect(state()).toBe(2)

    setState(5)
    await sleep(260)
    expect(state()).toBe(5)
  })
})
