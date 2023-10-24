import { createSignal, onMount } from 'solid-js'
import useMutationObserver from '../useMutationObserver'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'

interface Options {
  initialValue?: string
  observer?: boolean
}

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
