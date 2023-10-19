import { kebabCase } from '@pengzhanbo/utils'
import { type RouteDefinition, useRoutes } from '@solidjs/router'
import type { Component } from 'solid-js'
import HookNotReady from './pages/hooks-not-ready'

const pages = import.meta.glob('../src/use*/*.md', { eager: true }) as Record<
  string,
  {
    default: Component
    frontmatter: any
  }
>

const routes: RouteDefinition[] = []

Object.keys(pages).forEach((key) => {
  const { default: Component, frontmatter } = pages[key]
  routes.push({
    path: `/${frontmatter.lang}/hooks/${kebabCase(frontmatter.title)}`,
    component: Component,
    data: () => frontmatter,
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
