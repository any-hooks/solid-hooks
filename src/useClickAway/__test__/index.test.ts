import { renderHook } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import useClickAway from '..'

describe('useClickAway', () => {
  let container1!: HTMLDivElement
  let container2!: HTMLDivElement
  beforeEach(() => {
    container1 = document.createElement('div')
    container2 = document.createElement('div')
    document.body.appendChild(container1)
    document.body.appendChild(container2)
  })
  afterEach(() => {
    document.body.removeChild(container1)
    document.body.removeChild(container2)
  })

  it('test on dom optional', () => {
    let state = 0
    const { cleanup } = renderHook(useClickAway, {
      initialProps: [
        () => {
          state++
        },
        container1,
      ],
    })

    container1.click()
    expect(state).toBe(0)

    container2.click()
    expect(state).toBe(1)

    document.body.click()
    expect(state).toBe(2)

    cleanup()
  })

  it('test on multiple dom', () => {
    let state = 0
    const { cleanup } = renderHook(useClickAway, {
      initialProps: [
        () => {
          state++
        },
        [container1, container2],
      ],
    })

    container1.click()
    expect(state).toBe(0)

    container2.click()
    expect(state).toBe(0)

    document.body.click()
    expect(state).toBe(1)

    cleanup()
  })
})
