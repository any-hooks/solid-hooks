import { onCleanup, onMount } from 'solid-js'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'

type noop = (...p: any) => void

export type Target = BasicTarget<HTMLElement | Element | Window | Document>

interface Options<T extends Target = Target> {
  target?: T
  capture?: boolean
  once?: boolean
  passive?: boolean
}

type StopEventListener = () => void

/**
 * Use addEventListener by Hook.
 *
 * 使用 addEventListener。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-event-listener zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-event-listener en-US}
 *
 * @example
 * ```ts
 * useEventListener('click', (ev) => {
 *   console.log(ev)
 * }, { target: () => document.body })
 * ```
 */
function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handle: (ev: HTMLElementEventMap[K]) => void,
  options?: Options<HTMLElement>,
): StopEventListener
function useEventListener<K extends keyof ElementEventMap>(
  eventName: K,
  handler: (ev: ElementEventMap[K]) => void,
  options?: Options<Element>,
): StopEventListener
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (ev: DocumentEventMap[K]) => void,
  options?: Options<Document>,
): StopEventListener
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (ev: WindowEventMap[K]) => void,
  options?: Options<Window>,
): StopEventListener
function useEventListener(
  eventName: string,
  handler: noop,
  options: Options,
): StopEventListener

function useEventListener(
  eventName: string,
  handler: noop,
  options: Options = {},
): StopEventListener {
  const { target, capture, once, passive } = options
  let clear: StopEventListener = () => {}

  void onMount(() => {
    const targetEl = getTargetElement(target, window)
    if (!targetEl || !targetEl.addEventListener)
      return

    targetEl.addEventListener(eventName, handler, { capture, passive, once })

    clear = () => {
      targetEl.removeEventListener(eventName, handler, { capture })
    }

    onCleanup(clear)
  })

  return clear
}

export default useEventListener
