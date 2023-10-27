import { renderHook } from '@solidjs/testing-library'
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import useFullscreen, { type Options } from '..'
import type { BasicTarget } from '../../utils/domTarget'

let globalHook: {
  result: ReturnType<typeof useFullscreen>
  cleanup: () => void
}
let targetEl: any
const events = {
  fullscreenchange: new Set(),
  fullscreenerror: new Set(),
}
const setup = (target: BasicTarget, options?: Options) => {
  globalHook = renderHook(() => useFullscreen(target, options))
  return globalHook
}

describe('useFullscreen', () => {
  beforeEach(() => {
    targetEl = document.createElement('div')
    document.body.appendChild(targetEl)

    vi.spyOn(HTMLElement.prototype, 'requestFullscreen').mockImplementation(
      () => {
        Object.defineProperty(document, 'fullscreenElement', {
          value: targetEl,
        })
        return Promise.resolve()
      },
    )

    vi.spyOn(document, 'exitFullscreen').mockImplementation(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: null,
      })
      return Promise.resolve()
    })

    vi.spyOn(document, 'addEventListener').mockImplementation(
      (eventName, callback) => {
        if (events[eventName as keyof typeof events]) {
          events[eventName as keyof typeof events].add(callback)
        }
      },
    )
    vi.spyOn(document, 'removeEventListener').mockImplementation(
      (eventName, callback) => {
        if (events[eventName as keyof typeof events]) {
          events[eventName as keyof typeof events].delete(callback)
        }
      },
    )
  })

  afterEach(() => {
    document.body.removeChild(targetEl)
    events.fullscreenchange.clear()
    globalHook?.cleanup()
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  it('enterFullscreen/exitFullscreen should be work', () => {
    const {
      result: [state, { enterFullscreen, exitFullscreen }],
    } = setup(targetEl)

    enterFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(state()).toBe(true)

    exitFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(state()).toBe(false)
  })

  it('toggleFullscreen should be work', () => {
    const {
      result: [state, { toggleFullscreen }],
    } = setup(targetEl)

    toggleFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(state()).toBe(true)

    toggleFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(state()).toBe(false)
  })

  it('onExit/onEnter should be called', () => {
    const onExit = vi.fn()
    const onEnter = vi.fn()
    const {
      result: [, { toggleFullscreen }],
    } = setup(targetEl, { onEnter, onExit })

    toggleFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(onEnter).toBeCalled()

    toggleFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(onExit).toBeCalled()
  })

  it('onExit/onEnter should not be called', () => {
    const onExit = vi.fn()
    const onEnter = vi.fn()
    const {
      result: [, { exitFullscreen, enterFullscreen }],
    } = setup(targetEl, { onEnter, onExit })

    exitFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(onExit).not.toBeCalled()

    enterFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(onEnter).toBeCalled()

    onEnter.mockReset()
    enterFullscreen()
    expect(onEnter).not.toBeCalled()
  })

  it('pageFullscreen should be work', () => {
    const PAGE_FULLSCREEN_CLASS_NAME = 'test-page-fullscreen'
    const PAGE_FULLSCREEN_Z_INDEX = 101
    const onExit = vi.fn()
    const onEnter = vi.fn()
    const {
      result: [state, { toggleFullscreen }],
    } = setup(targetEl, {
      onEnter,
      onExit,
      pageFullscreen: {
        className: PAGE_FULLSCREEN_CLASS_NAME,
        zIndex: PAGE_FULLSCREEN_Z_INDEX,
      },
    })
    const getStyleEl = () => targetEl.querySelector('style')

    toggleFullscreen()
    expect(state()).toBe(true)
    expect(onEnter).toBeCalled()
    expect(targetEl.classList.contains(PAGE_FULLSCREEN_CLASS_NAME)).toBe(true)
    expect(getStyleEl()).not.toBeNull()
    expect(getStyleEl()?.textContent).toContain(
      `z-index: ${PAGE_FULLSCREEN_Z_INDEX}`,
    )
    expect(getStyleEl()?.getAttribute('id')).toBe(PAGE_FULLSCREEN_CLASS_NAME)

    toggleFullscreen()
    expect(state()).toBe(false)
    expect(onExit).toBeCalled()
    expect(targetEl.classList.contains(PAGE_FULLSCREEN_CLASS_NAME)).toBe(false)
    expect(getStyleEl()).toBeNull()
    expect(getStyleEl()?.textContent).toBeUndefined()
    expect(getStyleEl()?.getAttribute('id')).toBeUndefined()
  })

  it('`isFullscreen` should be false when use `document.exitFullscreen`', () => {
    const {
      result: [state, { enterFullscreen }],
    } = setup(targetEl)

    enterFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(state()).toBe(true)

    document.exitFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(state()).toBe(false)
  })

  it('multi element full screen should be correct', () => {
    const targetEl2 = document.createElement('p')
    const hook = setup(targetEl)
    const hook2 = setup(targetEl2)

    hook.result[1].enterFullscreen()
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(hook.result[0]()).toBe(true)

    hook2.result[1].enterFullscreen()
    Object.defineProperty(document, 'fullscreenElement', {
      value: targetEl2,
    })
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(hook.result[0]()).toBe(false)
    expect(hook2.result[0]()).toBe(true)

    hook2.result[1].exitFullscreen()
    Object.defineProperty(document, 'fullscreenElement', {
      value: targetEl,
    })
    events.fullscreenchange.forEach((fn: any) => fn())
    expect(hook.result[0]()).toBe(true)
    expect(hook2.result[0]()).toBe(false)
  })
})
