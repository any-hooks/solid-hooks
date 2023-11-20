import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useMutationObserver from '..'

const options: MutationObserverInit = { attributes: true, childList: true }

describe('useMutationObserver', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('should callback work when target style be changed', async () => {
    const callback = vi.fn()

    renderHook(useMutationObserver, {
      initialProps: [callback, () => container, options],
    })

    container.style.backgroundColor = '#000'
    await sleep(10)
    expect(callback).toBeCalled()
  })

  it('should callback work when target node tree be changed', async () => {
    const callback = vi.fn()

    renderHook(useMutationObserver, {
      initialProps: [callback, () => container, options],
    })

    const paraEl = document.createElement('p')
    container.appendChild(paraEl)
    await sleep(10)
    expect(callback).toBeCalled()
  })

  it('should not work when target is null', async () => {
    const callback = vi.fn()

    renderHook(useMutationObserver, {
      initialProps: [callback, null, options],
    })

    container.style.backgroundColor = '#000'
    await sleep(10)
    expect(callback).not.toBeCalled()
  })
})
