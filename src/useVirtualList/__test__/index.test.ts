import { renderHook } from '@solidjs/testing-library'
import type { Accessor } from 'solid-js'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useVirtualList, { type Options } from '..'

describe('useVirtualList', () => {
  let hook: { result: ReturnType<typeof useVirtualList>, cleanup: () => void }
  let container: HTMLDivElement
  let wrapper: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')

    vi.spyOn(container, 'clientHeight', 'get').mockImplementation(() => 300)
    vi.spyOn(container, 'clientWidth', 'get').mockImplementation(() => 300)

    wrapper = document.createElement('div')
    container.appendChild(wrapper)

    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    hook.cleanup()
  })

  const setup = <T>(list: Accessor<T[]> | T[] = [], options: Options<T>) => {
    hook = renderHook(useVirtualList, { initialProps: [list, options] })
  }

  it('test return list size', () => {
    setup(Array.from(Array(9999).keys()), {
      containerTarget: () => container,
      wrapperTarget: () => wrapper,
      itemHeight: 30,
    })

    const [list, scrollTo] = hook.result

    scrollTo(80)

    // 10 items plus 5 overscan * 2
    expect(list().length).toBe(20)
    expect(container.scrollTop).toBe(80 * 30)
  })

  it('test with fixed height', () => {
    setup(Array.from(Array(9999).keys()), {
      overscan: 0,
      itemHeight: 30,
      containerTarget: () => container,
      wrapperTarget: () => wrapper,
    })

    const [list, scrollTo] = hook.result

    scrollTo(20)

    expect(list().length).toBe(10)
    expect(container.scrollTop).toBe(20 * 30)
  })

  it('test with dynamic height', async () => {
    const originalList = Array.from(Array(9999).keys())
    setup(originalList, {
      overscan: 0,
      containerTarget: () => container,
      wrapperTarget: () => wrapper,
      itemHeight: (i: number, data) => {
        expect(originalList[i] === data).toBe(true)
        return i % 2 === 0 ? 30 : 60
      },
    })

    const [list, scrollTo] = hook.result

    scrollTo(20)
    // average height for easy calculation
    const averageHeight = (30 + 60) / 2
    const renderList = list()

    expect(renderList.length).toBe(Math.floor(300 / averageHeight))
    expect(container.scrollTop).toBe(10 * 30 + 10 * 60)
    expect(renderList[0].data).toBe(20)
    expect(renderList[0].index).toBe(20)
    expect(renderList[5].data).toBe(25)
    expect(renderList[5].index).toBe(25)

    expect(wrapper.style.marginTop).toBe(`${20 * averageHeight}px`)
    expect(wrapper.style.height).toBe(`${(9998 - 20) * averageHeight + 30}px`)
  })
})
