import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'
import { type Options, createUseStorage } from '..'

class TestStorage implements Storage {
  [name: string]: any

  length: number = 0

  _values = new Map<string, string>()

  clear(): void {
    this._values.clear()
    this.length = 0
  }

  getItem(key: string): string | null {
    return this._values.get(key) || null
  }

  key(index: number): string | null {
    if (index >= this._values.size) {
      return null
    }

    return Array.from(this._values.keys())[index]
  }

  removeItem(key: string): void {
    if (this._values.delete(key)) {
      this.length -= 1
    }
  }

  setItem(key: string, value: string): void {
    if (!this._values.has(key)) {
      this.length += 1
    }

    this._values.set(key, value)
  }
}

interface StorageStateProps<T> extends Pick<Options<T>, 'defaultValue'> {
  key: string
}

describe('useStorage', () => {
  const storage = new TestStorage()
  const setup = <T>(props: StorageStateProps<T>) => {
    const useStorageState = createUseStorage(() => storage)

    return renderHook(
      ({ key, defaultValue }: StorageStateProps<T>) => {
        const [state, setState] = useStorageState(key, { defaultValue })

        return { state, setState }
      },
      { initialProps: [props] },
    )
  }

  it('should get defaultValue for a given key', () => {
    const hooks = setup({ key: 'key1', defaultValue: 'value1' })
    expect(hooks.result.state()).toBe('value1')
  })

  it('should get default and set value for a given key', () => {
    const hooks = setup({ key: 'key2', defaultValue: 'value2' })
    expect(hooks.result.state()).toBe('value2')

    hooks.result.setState('value3')
    expect(hooks.result.state()).toBe('value3')

    const hooks2 = setup({ key: 'key2', defaultValue: 'value2' })
    expect(hooks2.result.state()).toBe('value3')
  })

  it('should remove value for a given key', () => {
    const hook = setup({ key: 'key' })
    hook.result.setState('value')
    expect(hook.result.state()).toBe('value')

    hook.result.setState(undefined)
    expect(hook.result.state()).toBeUndefined()

    hook.result.setState('value')
    expect(hook.result.state()).toBe('value')

    hook.result.setState()
    expect(hook.result.state()).toBeUndefined()
  })
})
