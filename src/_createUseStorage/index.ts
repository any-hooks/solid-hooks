import { createSignal, onCleanup } from 'solid-js'
import useWatch from '../useWatch'
import { isFunction, isString, isUndef } from '../utils'
import isBrowser from '../utils/isBrowser'

export type SetState<S> = S | ((prevState?: S) => S)

export interface Options<T> {
  defaultValue?: T | (() => T)
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  onError?: (error: unknown) => void
  observer?: boolean
}

export function createUseStorage(getStorage: () => Storage | undefined) {
  return function useStorage<T>(
    key: string | (() => string),
    options: Options<T> = {},
  ) {
    let storage: Storage | undefined
    const {
      onError = (e) => {
        console.error(e)
      },
    } = options

    try {
      storage = getStorage()
    }
    catch (err) {
      onError(err)
    }

    const serializer = (value: T) => {
      if (options.serializer)
        return options.serializer(value)

      return JSON.stringify(value)
    }

    const deserializer = (value: string): T => {
      if (options.deserializer)
        return options.deserializer(value)

      return JSON.parse(value)
    }

    function getStoredValue() {
      try {
        const _key = isFunction(key) ? key() : key
        const raw = storage?.getItem(_key)
        if (raw)
          return deserializer(raw)
      }
      catch (e) {
        onError(e)
      }
      if (isFunction(options.defaultValue))
        return options.defaultValue()

      return options.defaultValue
    }

    const [state, setState] = createSignal(getStoredValue())

    useWatch(
      () => (isFunction(key) ? key() : key),
      () => setState(() => getStoredValue()),
    )

    const updateState = (value?: SetState<T>) => {
      const currentState = isFunction(value) ? value(state()) : value
      setState(() => currentState)
      const _key = isFunction(key) ? key() : key
      if (isUndef(currentState)) {
        storage?.removeItem(_key)
      }
      else {
        try {
          storage?.setItem(_key, serializer(currentState))
        }
        catch (e) {
          console.error(e)
        }
      }
    }

    if (options.observer && isBrowser) {
      const handle = (e: StorageEvent) => {
        if (e.storageArea !== storage)
          return

        const _key = isFunction(key) ? key() : key
        if (e.key !== _key)
          return

        const value = e.newValue
        setState(() => {
          if (isString(value))
            return deserializer(value)

          if (isFunction(options.defaultValue))
            return options.defaultValue()

          return options.defaultValue
        })
      }

      window.addEventListener('storage', handle)
      onCleanup(() => window.removeEventListener('storage', handle))
    }

    return [state, updateState] as const
  }
}
