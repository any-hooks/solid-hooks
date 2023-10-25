import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useDebounceSignal from '..'

describe('useDebounceSignal', () => {
  const setup = (defaultValue: any, wait?: number) => {
    const {
      result: [state, setState],
    } = renderHook(useDebounceSignal, {
      initialProps: [defaultValue, { wait }],
    })
    return { state, setState }
  }

  it('test on wait:200ms', async () => {
    const hook = setup('', 200)
    expect(hook.state()).toBe('')
    hook.setState('2')
    hook.setState('2')
    hook.setState('2')
    expect(hook.state()).toBe('')
    await sleep(200)
    expect(hook.state()).toBe('2')
  })
})
