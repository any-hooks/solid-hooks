import screenfull from 'screenfull'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { isBoolean } from '../utils'
import type { BasicTarget } from '../utils/domTarget'
import { getTargetElement } from '../utils/domTarget'

export interface PageFullscreenOptions {
  className?: string
  zIndex?: number
}

export interface Options {
  onExit?: () => void
  onEnter?: () => void
  pageFullscreen?: boolean | PageFullscreenOptions
}

/**
 * manages DOM full screen.
 *
 * 管理 DOM 全屏的 Hook
 *
 * @example
 * ```ts
 * const [
 *   isFullscreen,
 *   { enterFullscreen, exitFullscreen, toggleFullscreen },
 * ] = useFullscreen(() => document.body)
 * ```
 */
const useFullscreen = (target: BasicTarget, options?: Options) => {
  const { onExit, onEnter, pageFullscreen = false } = options || {}
  const { className = 'solid-hooks-page-fullscreen', zIndex = 999999 } =
    isBoolean(pageFullscreen) || !pageFullscreen ? {} : pageFullscreen

  // The state of full screen may be changed by other scripts/components,
  // so the initial value needs to be computed dynamically.
  const [state, setState] = createSignal(getIsFullscreen())
  const [isEnabled, setEnabled] = createSignal(screenfull.isEnabled)
  let currentState = getIsFullscreen()

  function getIsFullscreen() {
    return (
      screenfull.isEnabled &&
      !!screenfull.element &&
      screenfull.element === getTargetElement(target)
    )
  }

  const invokeCallback = (fullscreen: boolean) => {
    if (fullscreen) {
      onEnter?.()
    } else {
      onExit?.()
    }
  }

  const updateFullscreenState = (fullscreen: boolean) => {
    // Prevent repeated calls when the state is not changed.
    if (currentState !== fullscreen) {
      invokeCallback(fullscreen)
      setState(fullscreen)
      currentState = fullscreen
    }
    setEnabled(screenfull.isEnabled)
  }

  const onScreenfullChange = () => {
    const fullscreen = getIsFullscreen()

    updateFullscreenState(fullscreen)
  }

  const togglePageFullscreen = (fullscreen: boolean) => {
    const el = getTargetElement(target)
    if (!el) {
      return
    }

    let styleElem = document.getElementById(className)

    if (fullscreen) {
      el.classList.add(className)

      if (!styleElem) {
        styleElem = document.createElement('style')
        styleElem.setAttribute('id', className)
        styleElem.textContent = `
          .${className} {
            position: fixed; left: 0; top: 0; right: 0; bottom: 0;
            width: 100% !important; height: 100% !important;
            z-index: ${zIndex};
          }`
        el.appendChild(styleElem)
      }
    } else {
      el.classList.remove(className)

      if (styleElem) {
        styleElem.remove()
      }
    }

    updateFullscreenState(fullscreen)
  }

  const enterFullscreen = () => {
    const el = getTargetElement(target)
    if (!el) {
      return
    }

    if (pageFullscreen) {
      togglePageFullscreen(true)
      return
    }
    if (screenfull.isEnabled) {
      try {
        screenfull.request(el)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const exitFullscreen = () => {
    const el = getTargetElement(target)
    if (!el) {
      return
    }

    if (pageFullscreen) {
      togglePageFullscreen(false)
      return
    }
    if (screenfull.isEnabled && screenfull.element === el) {
      screenfull.exit()
    }
  }

  const toggleFullscreen = () => {
    if (state()) {
      exitFullscreen()
    } else {
      enterFullscreen()
    }
  }

  onMount(() => {
    if (!screenfull.isEnabled || pageFullscreen) {
      return
    }

    screenfull.on('change', onScreenfullChange)

    onCleanup(() => {
      screenfull.off('change', onScreenfullChange)
    })
  })

  return [
    state,
    {
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      isEnabled,
    },
  ] as const
}

export default useFullscreen
