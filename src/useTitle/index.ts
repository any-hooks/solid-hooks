import { createSignal, onCleanup, onMount } from 'solid-js'
import isBrowser from '../utils/isBrowser'

export interface Options {
  restoreOnUnmount?: boolean
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
}

export default function useTitle(title: string, options = DEFAULT_OPTIONS) {
  const defaultTitle = isBrowser ? document.title : ''
  const [_title, _setTitle] = createSignal(defaultTitle)

  onMount(() => {
    document.title = title
    _setTitle(title)
    onCleanup(() => {
      if (options.restoreOnUnmount) {
        document.title = defaultTitle
      }
    })
  })

  const setTitle = (title: string) => {
    if (isBrowser) {
      document.title = title
    }
    _setTitle(title)
  }

  return [_title, setTitle] as const
}
