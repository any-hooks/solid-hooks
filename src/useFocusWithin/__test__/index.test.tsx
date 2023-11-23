import { fireEvent, render } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import type { Options } from '..'
import useFocusWithin from '..'
import useRef from '../../useRef'

function setup(options?: Options) {
  const TestComponent = () => {
    const [ref, setRef] = useRef()
    const isFocusWithin = useFocusWithin(ref, options)
    return (
      <div ref={setRef}>
        <label>
          First Name
          <input />
        </label>
        <label>
          Last Name
          <input />
        </label>
        <p>
          isFocusWithin:
          {JSON.stringify(isFocusWithin())}
        </p>
      </div>
    )
  }

  return render(() => <TestComponent />)
}

describe('useFocusWithin', () => {
  it('should call onFocus/onBlur', () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const result = setup({ onFocus, onBlur })
    fireEvent.focusIn(result.getByLabelText('First Name'))
    expect(onFocus).toBeCalled()
    fireEvent.focusOut(result.getByLabelText('First Name'))
    expect(onBlur).toBeCalled()
  })

  it('should call onChange', () => {
    const onChange = vi.fn()
    const result = setup({ onChange })
    fireEvent.focusIn(result.getByLabelText('First Name'))
    expect(onChange).toBeCalledWith(true)
    fireEvent.focusOut(result.getByLabelText('First Name'))
    expect(onChange).toHaveBeenLastCalledWith(false)
  })
})
