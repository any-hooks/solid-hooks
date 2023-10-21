import { kebabCase } from '@pengzhanbo/utils'
import { A } from '@solidjs/router'
import { For, createMemo } from 'solid-js'
import { sidebarConfig } from '../sidebarConfig'
import { useAppContext } from '~/AppContext'

export default function Sidebar() {
  const [store] = useAppContext()
  const config = createMemo(() =>
    sidebarConfig.map((item) => ({
      title: item.title,
      children: item.children.map((child) => {
        return { link: `/${store.lang}/hooks/${kebabCase(child)}`, text: child }
      }),
    })),
  )
  return (
    <aside class="sidebar fixed top-navbar left-0 bottom-0 w-sidebar overflow-auto bg-gray-50 dark:bg-light-100/2">
      <div class="pl-4 pb-6">
        <For each={config()}>
          {(item) => (
            <div class="sidebar-nav-item">
              <p class="font-medium">{item.title}</p>
              <For each={item.children}>
                {(child) => (
                  <p>
                    <A
                      class="pl-4 cursor-pointer text-text text-sm decoration-none"
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
