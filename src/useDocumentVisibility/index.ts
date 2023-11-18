import type { Accessor } from 'solid-js'
import { createSignal } from 'solid-js'
import useEventListener from '../useEventListener'
import isBrowser from '../utils/isBrowser'

type VisibilityState = 'hidden' | 'visible' | 'prerender' | undefined

const getVisibility = () => {
  if (!isBrowser) {
    return 'visible'
  }
  return document.visibilityState
}

/**
 * A Hook can tell if the page is visible, refer to [visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)
 *
 * 监听页面是否可见，参考 [visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)
 *
 * @example
 * ```ts
 * const documentVisibility = useDocumentVisibility()
 * ```
 */
function useDocumentVisibility(): Accessor<VisibilityState> {
  const [documentVisibility, setDocumentVisibility] = createSignal(
    getVisibility(),
  )

  useEventListener(
    'visibilitychange',
    () => setDocumentVisibility(getVisibility()),
    { target: document },
  )

  return documentVisibility
}

export default useDocumentVisibility
