import { renderHook } from '@solidjs/testing-library'
import { createSignal } from 'solid-js'
import { describe, expect, it } from 'vitest'
import useHistorySignal, { type UseHistorySignalOptions } from '..'

describe('useHistorySignal', () => {
  const setup = <T>(value: T, options: UseHistorySignalOptions<T> = {}) => {
    const {
      result: { history, source, setSource },
    } = renderHook(() => {
      const [source, setSource] = createSignal<T>(value)
      const history = useHistorySignal(source, {
        setSource(source) {
          setSource(() => source)
        },
        ...options,
      })
      return { history, source, setSource }
    })
    return { hook: history, source, setSource }
  }

  it('should work', () => {
    const { hook, source, setSource } = setup('a')
    expect(source()).toBe(hook.source())
    expect(hook.last().snapshot).toBe('a')

    setSource('b')
    expect(source()).toBe(hook.source())
    expect(hook.last().snapshot).toBe('b')
    expect(hook.undoStack().length).toBe(1)

    setSource('c')
    expect(hook.undoStack().length).toBe(2)

    hook.undo()
    expect(hook.last().snapshot).toBe('b')
    expect(hook.undoStack().length).toBe(1)
    expect(hook.redoStack().length).toBe(1)
    expect(source()).toBe('b')
    expect(hook.canRedo()).toBeTruthy()
    expect(hook.canUndo()).toBeTruthy()

    hook.redo()
    expect(hook.last().snapshot).toBe('c')
    expect(hook.undoStack().length).toBe(2)
    expect(hook.redoStack().length).toBe(0)
    expect(source()).toBe('c')
    expect(hook.canRedo()).toBeFalsy()
    expect(hook.canUndo()).toBeTruthy()

    hook.clear()
    expect(hook.canRedo()).toBeFalsy()
    expect(hook.canUndo()).toBeFalsy()
  })

  it('should work with manual', () => {
    const { hook, source, setSource } = setup('a', { manual: true })
    expect(source()).toBe(hook.source())

    setSource('b')
    expect(source()).toBe(hook.source())
    expect(hook.last().snapshot).toBe('a')

    hook.commit()
    expect(hook.last().snapshot).toBe('b')

    setSource('c')
    setSource('d')
    setSource('e')
    expect(source()).toBe('e')
    expect(hook.last().snapshot).toBe('b')
    hook.commit()
    expect(hook.last().snapshot).toBe('e')
    expect(hook.canRedo()).toBeFalsy()
    expect(hook.canUndo()).toBeTruthy()
  })

  it('should support boolean', () => {
    const { hook, source, setSource } = setup(true)
    setSource(false)
    setSource(true)
    setSource(false)
    expect(source()).toBe(hook.source())
    expect(hook.last().snapshot).toBe(false)
    expect(hook.history().length).toBe(4)
  })

  it('should support number', () => {
    const { hook, setSource } = setup(1)
    setSource(2)
    setSource(1)
    setSource(0)
    expect(hook.last().snapshot).toBe(0)
    expect(hook.history().length).toBe(4)
  })

  it('should work with capacity=3', () => {
    const { hook, setSource } = setup(1, { capacity: 3 })
    setSource(1)
    setSource(2)
    setSource(3)
    setSource(4)
    setSource(5)
    // 历史记录包含了可撤销的记录与最近的记录，故长度为 4
    expect(hook.history().length).toBe(4)

    hook.undo()
    expect(hook.history().length).toBe(3)
  })
})
