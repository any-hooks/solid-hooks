import { kebabCase } from '@pengzhanbo/utils'
import { Navigate, type RouteDefinition, useRoutes } from '@solidjs/router'
import { type Component, lazy } from 'solid-js'
import Home from './pages/home'
import HookNotReady from './pages/hooks-not-ready'

const pages = import.meta.glob('../src/use*/*.md') as Record<
  string,
  () => Promise<{
    default: Component
    frontmatter: any
  }>
>

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: () => <Navigate href="/en-US" />,
  },
  {
    path: '/zh-CN',
    data: () => ({ lang: 'zh-CN' }),
    component: Home,
  },
  {
    path: '/en-US',
    data: () => ({ lang: 'en-US' }),
    component: Home,
  },
  // {
  //   path: '/zh-CN/guide',
  //   data: () => ({ lang: 'zh-CN' }),
  //   component: Guide,
  // },
  // {
  //   path: '/en-US/guide',
  //   data: () => ({ lang: 'en-US' }),
  //   component: Guide,
  // },
]

Object.keys(pages).forEach((key) => {
  const paths = key.split('/')
  const lang = paths[paths.length - 1].replace(/^index\.|\.md$/g, '')
  const title = kebabCase(paths[paths.length - 2])
  routes.push({
    path: `/${lang}/hooks/${title}`,
    component: lazy(() => pages[key]()),
  })
})

routes.push(
  {
    path: '/zh-CN/hooks/*',
    component: HookNotReady,
  },
  {
    path: '/en-US/hooks/*',
    component: HookNotReady,
  },
)

export default useRoutes(routes)
