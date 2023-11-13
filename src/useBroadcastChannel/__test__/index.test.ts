import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import useBroadcastChannel, { type Options } from '..'

describe('useBroadcastChannel', () => {
  const setup = (name: string, option?: Options<string>) =>
    renderHook(useBroadcastChannel, { initialProps: [name, option] })

  it('should work', async () => {
    const name = 'test-channel'
    const onMessage = vi.fn()
    const { result: hook1, cleanup: cleanup1 } = setup(name, { onMessage })
    const { result: hook2, cleanup: cleanup2 } = setup(name)

    hook1.postMessage('hello')
    await sleep(10)
    expect(hook2.data()).toBe('hello')

    hook2.postMessage('hello')
    await sleep(10)
    expect(hook2.data()).toBe('hello')
    expect(onMessage).toBeCalled()

    cleanup1()
    cleanup2()
  })

  it('not work when closed', async () => {
    const name = 'test-channel-closed'
    const onMessage = vi.fn()
    const { result: hook1, cleanup: cleanup1 } = setup(name, { onMessage })
    const { result: hook2, cleanup: cleanup2 } = setup(name)

    hook1.close()

    hook2.postMessage('hello')
    await sleep(10)
    expect(hook1.data()).toBeUndefined()
    expect(onMessage).not.toBeCalled()

    cleanup1()
    cleanup2()
  })
})
