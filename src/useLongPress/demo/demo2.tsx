import { useLongPress, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [pressCounter, setPressCounter] = createSignal(0)
  const [clickCounter, setClickCounter] = createSignal(0)

  const [ref, setRef] = useRef<HTMLButtonElement>(null)

  useLongPress(() => setPressCounter(s => s + 1), ref, {
    onClick: () => setClickCounter(s => s + 1),
  })

  return (
    <div>
      <button ref={setRef} type="button">
        Press me
      </button>
      <p>
        pressCounter:
        {pressCounter()}
      </p>
      <p>
        clickCounter:
        {clickCounter()}
      </p>
    </div>
  )
}
