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

function useDocumentVisibility(): Accessor<VisibilityState> {
  const [documentVisibility, setDocumentVisibility] = createSignal(
    getVisibility(),
  )

  useEventListener(
    'visibilitychange',
    () => {
      setDocumentVisibility(getVisibility())
    },
    {
      target: () => document,
    },
  )

  return documentVisibility
}

export default useDocumentVisibility
