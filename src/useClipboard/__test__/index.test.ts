import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useClipboard from '..'

describe('useClipboard', () => {
  const navigator = {
    clipboard: {
      writeText: () => Promise.resolve(),
    },
  } as unknown as Navigator

  it('test on default', async () => {
    const {
      result: { text, copied, copy, isSupported },
    } = renderHook(useClipboard, {
      initialProps: [{ navigator, copiedDuring: 100 }],
    })

    expect(isSupported()).toBe(true)

    await copy()
    expect(text()).toBe('')

    await copy('hello world')
    expect(text()).toBe('hello world')
    expect(copied()).toBe(true)

    await sleep(100)
    expect(copied()).toBe(false)
  })
})
