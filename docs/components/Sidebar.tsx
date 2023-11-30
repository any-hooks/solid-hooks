import { kebabCase } from '@pengzhanbo/utils'
import { A, useMatch } from '@solidjs/router'
import { For, createMemo } from 'solid-js'
import { sidebarConfig } from '../sidebarConfig'
import { useAppContext } from '~/AppContext'

export default function Sidebar() {
  const [store] = useAppContext()
  const match = useMatch(() => '/:lang/hooks/*')
  const config = createMemo(() => {
    if (!match())
      return []
    return sidebarConfig.map(item => ({
      title: item.title,
      children: item.children.map((text) => {
        return { link: `/${store.lang}/hooks/${kebabCase(text)}`, text }
      }),
    }))
  })
  return (
    <aside class="sidebar fixed bottom-0 left-0 top-navbar w-sidebar overflow-auto bg-gray-50 dark:bg-light-100/2">
      <div class="pb-6 pl-4">
        <For each={config()}>
          {item => (
            <div class="sidebar-nav-item">
              <p class="font-medium">{item.title}</p>
              <For each={item.children}>
                {child => (
                  <p>
                    <A
                      class="cursor-pointer pl-4 text-sm text-text decoration-none"
                      activeClass="text-brand! font-medium"
                      href={child.link}
                      end
                    >
                      {child.text}
                    </A>
                  </p>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </aside>
  )
}
