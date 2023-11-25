import { createSignal } from 'solid-js'
import { isServer } from 'solid-js/web'
import useCssVar from '../useCssVar'
import { useDebounceFn, useEventListener } from '..'

const topName = '--hooks-safe-area-top'
const rightName = '--hooks-safe-area-right'
const bottomName = '--hooks-safe-area-bottom'
const leftName = '--hooks-safe-area-left'

type VarName = '--hooks-safe-area-top' | '--hooks-safe-area-right' | '--hooks-safe-area-bottom' | '--hooks-safe-area-left'

function getValue(position: VarName) {
  return getComputedStyle(document.documentElement).getPropertyValue(position)
}

function useScreenSafeArea() {
  const [safeArea, setSafeArea] = createSignal({
    top: '',
    right: '',
    bottom: '',
    left: '',
  })

  if (!isServer) {
    const [, setTop] = useCssVar(topName)
    const [, setRight] = useCssVar(rightName)
    const [, setBottom] = useCssVar(bottomName)
    const [, setLeft] = useCssVar(leftName)

    setTop('env(safe-area-inset-top, 0px)')
    setRight('env(safe-area-inset-right, 0px)')
    setBottom('env(safe-area-inset-bottom, 0px)')
    setLeft('env(safe-area-inset-left, 0px)')

    const { run } = useDebounceFn(update)
    update()
    useEventListener('resize', run)
  }

  function update() {
    setSafeArea({
      top: getValue(topName),
      right: getValue(rightName),
      bottom: getValue(bottomName),
      left: getValue(leftName),
    })
  }

  return safeArea
}

export default useScreenSafeArea
