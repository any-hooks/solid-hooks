import Cookies from 'js-cookie'
import { createSignal } from 'solid-js'
import { isFunction, isString } from '../utils'

export type State = string | undefined

export interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State)
}

/**
 * store state into Cookie
 *
 * 将状态存储在 Cookie
 *
 * @example
 * ```ts
 * const [message, setMessage] = useCookie('cookies-key')
 * ```
 */
function useCookie(cookieKey: string, options: Options = {}) {
  const [state, setState] = createSignal<State>(initialValue())

  function initialValue() {
    const cookieValue = Cookies.get(cookieKey)

    if (isString(cookieValue)) return cookieValue

    if (isFunction(options.defaultValue)) {
      return options.defaultValue()
    }

    return options.defaultValue
  }

  const updateState = (
    newValue: State | ((prevState: State) => State),
    newOptions: Cookies.CookieAttributes = {},
  ) => {
    const { defaultValue: _, ...restOptions } = { ...options, ...newOptions }
    const value = isFunction(newValue) ? newValue(state()) : newValue

    setState(value)

    if (value === undefined) {
      Cookies.remove(cookieKey)
    } else {
      Cookies.set(cookieKey, value, restOptions)
    }
  }

  return [state, updateState] as const
}

export default useCookie
