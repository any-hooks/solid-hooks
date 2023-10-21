import { kebabCase } from '@pengzhanbo/utils'
import { type RouteDefinition, useRoutes } from '@solidjs/router'
import { type Component, lazy } from 'solid-js'
import HookNotReady from './pages/hooks-not-ready'

const pages = import.meta.glob('../src/use*/*.md') as Record<
  string,
  () => Promise<{
    default: Component
    frontmatter: any
  }>
>

const routes: RouteDefinition[] = []

Object.keys(pages).forEach((key) => {
  const paths = key.split('/')
  const lang = paths[paths.length - 1].replace(/^index\.|\.md$/g, '')
  const title = kebabCase(paths[paths.length - 2])
  routes.push({
    path: `/${lang}/hooks/${title}`,
    component: lazy(async () => await pages[key]()),
    data: async () => (await pages[key]()).frontmatter,
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
