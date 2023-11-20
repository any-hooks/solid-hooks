import { createSignal, onCleanup, onMount } from 'solid-js'
import isBrowser from '../utils/isBrowser'

type Subscriber = () => void

const subscribers = new Set<Subscriber>()

type ResponsiveConfig = Record<string, number>
type ResponsiveInfo = Record<string, boolean>

let info: ResponsiveInfo

let responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

function handleResize() {
  const oldInfo = info
  calculate()
  if (oldInfo === info) return
  for (const subscriber of subscribers) {
    subscriber()
  }
}

let listening = false

function calculate() {
  const width = window.innerWidth
  const newInfo = {} as ResponsiveInfo
  let shouldUpdate = false
  for (const key of Object.keys(responsiveConfig)) {
    newInfo[key] = width >= responsiveConfig[key]
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true
    }
  }
  if (shouldUpdate) {
    info = newInfo
  }
}

export function configResponsive(config: ResponsiveConfig) {
  responsiveConfig = config
  if (info) calculate()
}

/**
 * a Hook for getting responsive info.
 *
 * 获取响应式信息。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-responsive zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-responsive en-US}
 *
 * @example
 * ```ts
 * const responsive = useResponsive()
 * ```
 */
export function useResponsive() {
  if (isBrowser && !listening) {
    info = {}
    calculate()
    window.addEventListener('resize', handleResize)
    listening = true
  }
  const [state, setState] = createSignal<ResponsiveInfo>(info)

  onMount(() => {
    if (!isBrowser) return

    if (!listening) {
      window.addEventListener('resize', handleResize)
    }

    const subscriber = () => setState(info)

    subscribers.add(subscriber)

    onCleanup(() => {
      subscribers.delete(subscriber)
      if (subscribers.size === 0) {
        window.removeEventListener('resize', handleResize)
        listening = false
      }
    })
  })

  return state
}
