import { createSignal, onMount } from 'solid-js'
import useMutationObserver from '../useMutationObserver'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'

interface Options {
  /**
   * initial value
   *
   * 初始值
   *
   */
  initialValue?: string
  /**
   * use MutationObserver to observe variables
   *
   * 是否使用 MutationObserver 观察变量
   */
  observer?: boolean
}

/**
 * Manipulate CSS variables
 *
 * 操作CSS变量
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-css-var zh-CN}
 * | {@link https://solid-hooks.netlify.app/en/hooks/use-css-var en-US}
 *
 * @example
 * ```ts
 * const [color, setColor] = useCssVar('--c-color', () => document.body)
 * ```
 */
function useCssVar(prop: string, target?: BasicTarget, options?: Options) {
  const { initialValue = '', observer = false } = options || {}
  const [variable, setVariable] = createSignal(initialValue)

  function updateCssVar() {
    const el = getTargetElement(
      target,
      window?.document?.documentElement,
    ) as HTMLElement
    if (el) {
      const value = window.getComputedStyle(el).getPropertyValue(prop)?.trim()
      setVariable(value || initialValue)
    }
  }

  function setCssVar(value: string) {
    const el = getTargetElement(
      target,
      window?.document?.documentElement,
    ) as HTMLElement
    if (el) {
      el.style.setProperty(prop, value)
      setVariable(value)
    }
  }

  if (observer) {
    useMutationObserver(updateCssVar, target, {
      attributeFilter: ['class', 'style'],
    })
  }

  onMount(updateCssVar)

  return [variable, setCssVar] as const
}

export default useCssVar
