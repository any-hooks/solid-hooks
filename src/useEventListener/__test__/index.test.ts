import { renderHook } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import useEventListener from '..'

describe('useEventListener', () => {
  let container!: HTMLDivElement
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })
  afterEach(() => {
    document.body.removeChild(container)
  })

  it('test on click listener', () => {
    let count = 0
    const { cleanup } = renderHook(() =>
      useEventListener(
        'click',
        () => {
          count++
        },
        { target: container },
      ),
    )

    document.body.click()
    expect(count).toBe(0)

    container.click()
    expect(count).toBe(1)

    cleanup()
  })
})
