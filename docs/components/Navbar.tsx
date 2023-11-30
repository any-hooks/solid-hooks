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
    if (store.theme === 'dark')
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }

  const goHome = () => {
    navigate(`/${store.lang}`)
  }

  return (
    <nav class="fixed left-0 top-0 z-10 h-navbar w-full flex-items-center border-b bg-[var(--c-bg)]">
      <SiteTitle onClick={goHome} />
      <div class="flex-items-center flex-1 justify-end pr-6">
        <For each={config()}>{item => <NavLink {...item} />}</For>
        <span
          class="ml-10 inline-block w-24 cursor-pointer border rounded-full py-2 text-center"
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

function SiteTitle(props: { onClick: () => void }) {
  return (
    <div
      class="cursor-pointer px-6 pr-4 text-20px font-medium"
      onClick={() => props.onClick()}
    >
      <span class="text-brand">@any-hooks</span>
      <span class="mx-1 text-brand-light">/</span>
      <span class="text-brand">solid</span>
    </div>
  )
}
