import { useLocation } from '@solidjs/router'
import type { ParentProps } from 'solid-js'
import { createContext, createEffect, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import useLocalStorage from '../src/useLocalStorage'

export interface AppContextOption {
  theme: 'light' | 'dark'
  lang: 'en-US' | 'zh-CN'
}

export interface AppContextAction {
  toggleTheme: (theme?: AppContextOption['theme']) => void
  toggleLang: (lang?: AppContextOption['lang']) => void
}

export const AppContext =
  createContext<readonly [AppContextOption, AppContextAction]>()

export const AppContextProvider = (props: ParentProps) => {
  const [cachedLang, setCachedLang] = useLocalStorage<AppContextOption['lang']>(
    'any-hooks-lang',
    { defaultValue: 'en-US' },
  )
  const [cachedTheme, setCachedTheme] = useLocalStorage<
    AppContextOption['theme']
  >('any-hooks-theme-appearance', { defaultValue: 'light' })

  const [state, setState] = createStore<AppContextOption>({
    theme: cachedTheme() || 'light',
    lang: cachedLang() || 'en-US',
  })

  const location = useLocation()

  createEffect(() => {
    if (location.pathname.startsWith('/zh-CN')) {
      setState('lang', 'zh-CN')
    } else {
      setState('lang', 'en-US')
    }
  })

  const actions: AppContextAction = {
    toggleLang: (lang) => {
      setState('lang', (l) => {
        const ll = lang || (l === 'zh-CN' ? 'en-US' : 'zh-CN')
        setCachedLang(ll)
        return ll
      })
    },
    toggleTheme(theme) {
      setState('theme', (t) => {
        const tt = theme || (t === 'light' ? 'dark' : 'light')
        setCachedTheme(tt)
        return tt
      })
    },
  }

  return (
    <AppContext.Provider value={[state, actions]}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)!
