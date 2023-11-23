import type { Accessor } from 'solid-js'
import { createSignal } from 'solid-js'
import useEventListener from '../useEventListener'
import isBrowser from '../utils/isBrowser'

type VisibilityState = 'hidden' | 'visible' | 'prerender' | undefined

function getVisibility() {
  if (!isBrowser)
    return 'visible'

  return document.visibilityState
}

/**
 * A Hook can tell if the page is visible, refer to {@link https://developer.mozilla.org/docs/Web/API/Document/visibilityState visibilityState API}
 *
 * 监听页面是否可见，参考 {@link https://developer.mozilla.org/docs/Web/API/Document/visibilityState visibilityState API}
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-document-visibility zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-document-visibility en-US}
 *
 * @example
 * ```ts
 * const documentVisibility = useDocumentVisibility()
 * ```
 */
function useDocumentVisibility(): Accessor<VisibilityState> {
  const [documentVisibility, setDocumentVisibility]
    = createSignal(getVisibility())

  useEventListener(
    'visibilitychange',
    () => setDocumentVisibility(getVisibility()),
    { target: document },
  )

  return documentVisibility
}

export default useDocumentVisibility
