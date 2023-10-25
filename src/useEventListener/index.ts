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
  let clear: StopEventListener = () => {}

  void onMount(() => {
    const targetEl = getTargetElement(options.target, window)
    if (!targetEl || !targetEl.addEventListener) return

    targetEl.addEventListener(eventName, handler, {
      capture: options.capture,
      passive: options.passive,
      once: options.once,
    })

    clear = () => {
      targetEl.removeEventListener(eventName, handler, {
        capture: options.capture,
      })
    }

    onCleanup(clear)
  })

  return clear
}

export default useEventListener
