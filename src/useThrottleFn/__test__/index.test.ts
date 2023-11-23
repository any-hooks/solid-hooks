import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useThrottleFn from '..'

interface ParamsObj {
  fn: (...arg: any) => any
  wait: number
}

function setUp({ fn, wait }: ParamsObj) {
  return renderHook(useThrottleFn, { initialProps: [fn, { wait }] })
}

let hook: ReturnType<typeof setUp>

describe('useThrottleFn', () => {
  it('run, cancel and flush should work', async () => {
    let count = 0
    const throttleFn = (gap: number) => {
      count += gap
    }
    hook = setUp({
      fn: throttleFn,
      wait: 500,
    })
    hook.result.run(1)
    expect(count).toBe(1)
    hook.result.run(1)
    hook.result.run(1)
    hook.result.run(1)
    expect(count).toBe(1)
    await sleep(450) // t: 450
    hook.result.run(2)
    expect(count).toBe(1)
    await sleep(100) // t: 550
    hook.result.run(2)
    expect(count).toBe(3)
    hook.result.run(3)
    hook.result.run(3)
    await sleep(500) // t: 1050
    expect(count).toBe(6)
    hook.result.run(1)
    hook.result.run(4)
    hook.result.cancel()
    await sleep(500) // t: 1550
    expect(count).toBe(6)
    hook.result.run(1)
    hook.result.run(1)
    expect(count).toBe(6)
    hook.result.flush(1)
    expect(count).toBe(7)
    await sleep(550) // t: 2100
    expect(count).toBe(7)
  })
})
