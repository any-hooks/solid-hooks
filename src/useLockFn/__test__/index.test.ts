import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useLockFn from '..'

describe('useLockFn', () => {
  let count: number = 0
  const fn = async (gap: number) => {
    await sleep(50)
    count += gap
  }
  const setup = () => {
    const { result } = renderHook(useLockFn, { initialProps: [fn] })
    return result
  }

  it('should work', async () => {
    const lockFn = setup()

    lockFn(2)
    lockFn(3)
    expect(count).toBe(0)
    await sleep(50)
    expect(count).toBe(2)
  })
})
