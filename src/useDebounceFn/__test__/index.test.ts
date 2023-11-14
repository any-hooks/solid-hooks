import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useDebounceFn from '..'
import type { DebounceOptions } from '../debounceOptions'

describe('useDebounceFn', () => {
  let count = 0
  const fn = (gap: number) => {
    count += gap
  }

  const setup = (fn: (...args: any[]) => void, options?: DebounceOptions) => {
    const { result } = renderHook(useDebounceFn, {
      initialProps: [fn, options],
    })
    return result
  }

  it('test on run, cancel, flush', async () => {
    const hook = setup(fn, { wait: 200 })
    expect(count).toBe(0)
    hook.run(2)
    hook.run(2)
    hook.run(2)
    await sleep(210)
    expect(count).toBe(2)

    hook.run(2)
    hook.cancel()
    await sleep(210)
    expect(count).toBe(2)

    hook.run(2)
    hook.flush(2)
    expect(count).toBe(4)
  })
})
