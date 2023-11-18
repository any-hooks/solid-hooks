import { useLocation, useNavigate } from '@solidjs/router'
import { For, createMemo } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { navbarConfig } from '../navbarConfig'
import IconGithub from './Icons/IconGithub'
import IconModeDark from './Icons/IconModeDark'
import IconModeLight from './Icons/IconModeLight'
import NavLink from './NavLink'
import { useAppContext } from '~/AppContext'

const langs = {
  'zh-CN': '简体中文',
  'en-US': 'English',
}

export default function Navbar() {
  const [store, { toggleTheme, toggleLang }] = useAppContext()
  const lang = createMemo(() => {
    const lang = store.lang === 'en-US' ? 'zh-CN' : 'en-US'
    return langs[lang]
  })
  const config = createMemo(() => {
    const config = navbarConfig[`/${store.lang}`] || []
    return config.map((item) => {
      return {
        text: item.text,
        link: `/${store.lang}${item.link}`,
        match: item.match ? `/${store.lang}${item.match}` : undefined,
      }
    })
  })
  const location = useLocation()
  const navigate = useNavigate()

  const updateLang = () => {
    toggleLang()
    const pathname = location.pathname.replace(/^\/[^/]+/, '')
    const url = `/${store.lang}${pathname}${location.search}${location.hash}`
    navigate(url, { replace: true })
  }

  const updateTheme = () => {
    toggleTheme()
    if (store.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <nav class="fixed w-full h-navbar top-0 left-0 border-b bg-[var(--c-bg)] z-10 flex-items-center">
      <SiteTitle />
      <div class="flex-1 flex-items-center justify-end pr-6">
        <For each={config()}>{(item) => <NavLink {...item} />}</For>
        <span
          class="cursor-pointer ml-10 inline-block w-24 py-2 text-center border rounded-full"
          onClick={updateLang}
        >
          {lang()}
        </span>
        <span class="ml-6 cursor-pointer" onClick={updateTheme}>
          <Dynamic
            component={store.theme === 'dark' ? IconModeDark : IconModeLight}
          />
        </span>
        <a
          class="ml-6 cursor-pointer text-text"
          href="https://github.com/any-hooks/solid-hooks"
          target="_blank"
        >
          <IconGithub />
        </a>
      </div>
    </nav>
  )
}

function SiteTitle() {
  return (
    <div class="px-6 pr-4 text-20px font-medium">
      <span class="text-brand">@any-hooks</span>
      <span class="text-brand-light mx-1">/</span>
      <span class="text-brand">solid</span>
    </div>
  )
}
