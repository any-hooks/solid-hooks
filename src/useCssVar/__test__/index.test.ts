import { sleep } from '@pengzhanbo/utils'
import { renderHook } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import useCssVar from '..'

describe('useCssVar', () => {
  let container!: HTMLDivElement
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })
  afterEach(() => {
    document.body.removeChild(container)
  })

  it('test on dom', () => {
    const {
      result: [state, setState],
    } = renderHook(useCssVar, {
      initialProps: ['--test', container],
    })

    expect(state()).toBe('')

    setState('red')
    expect(state()).toBe('red')
    expect(container.style.getPropertyValue('--test')).toBe('red')
  })

  it('test on global', () => {
    const {
      result: [state, setState],
    } = renderHook(useCssVar, {
      initialProps: ['--test-global'],
    })
    expect(state()).toBe('')

    setState('blue')
    expect(state()).toBe('blue')
    expect(
      document.documentElement.style.getPropertyValue('--test-global'),
    ).toBe('blue')
  })

  it('test on mutation observer', async () => {
    const {
      result: [state],
    } = renderHook(useCssVar, {
      initialProps: ['--test-mutation-observer', container, { observer: true }],
    })

    expect(state()).toBe('')
    container.style.setProperty('--test-mutation-observer', 'red')
    await sleep(10)
    expect(state()).toBe('red')
  })

  it('test on default value', async () => {
    container.style.setProperty('--test-default-value', 'foo')
    const {
      result: [state],
    } = renderHook(useCssVar, {
      initialProps: ['--test-default-value', container],
    })
    expect(state()).toBe('foo')
  })
})
