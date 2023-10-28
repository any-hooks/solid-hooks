import { fireEvent, render, renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import useHover from '../index'

describe('useHover', () => {
  it('should work', () => {
    const { getByText } = render(() => <button>Hover</button>)
    let trigger = 0
    const { result } = renderHook(() =>
      useHover(getByText('Hover'), {
        onEnter: () => {
          trigger++
        },
        onLeave: () => {
          trigger++
        },
      }),
    )

    expect(result()).toBe(false)

    fireEvent.mouseEnter(getByText('Hover'))
    expect(result()).toBe(true)
    expect(trigger).toBe(1)

    fireEvent.mouseLeave(getByText('Hover'))
    expect(result()).toBe(false)
    expect(trigger).toBe(2)
  })
})
