/**
 * title: Listening content scrolling selection menu
 * desc: Pass the `callback` that is triggered when the callback of `IntersectionObserver` is called, so you can do some customization.
 *
 * title.zh-CN: 监听内容滚动选中菜单
 * desc.zh-CN: 传入 `callback`, 使得 `IntersectionObserver` 的回调被调用时，用户可以做一些自定义操作。
 */
import { useInViewport, useRef } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

const menus = ['menu-1', 'menu-2', 'menu-3'] as const
const content = {
  'menu-1': 'Content for menus 1',
  'menu-2': 'Content for menus 2',
  'menu-3': 'Content for menus 3',
}

export default () => {
  const [menuRef, setMenuReF] = useRef<HTMLDivElement[]>([])

  const [activeMenu, setActiveMenu] = createSignal(menus[0])

  const callback = (entry: any) => {
    if (entry.isIntersecting) {
      const active = entry.target.getAttribute('id') || ''
      setActiveMenu(active)
    }
  }

  const handleMenuClick = (index: number) => {
    const contentEl = document.getElementById('content-scroll')
    const top = menuRef()[index]?.offsetTop

    contentEl?.scrollTo({
      top,
      behavior: 'smooth',
    })
  }

  useInViewport(menuRef(), {
    callback,
    root: () => document.getElementById('parent-scroll'),
    rootMargin: '-50% 0px -50% 0px',
  })

  return (
    <div
      id="parent-scroll"
      style={{
        width: '300px',
        height: '300px',
        border: '1px solid',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <div style={{ 'width': '30%', 'background-color': '#f0f0f0' }}>
        <ul style={{ 'list-style': 'none', 'padding': 0, 'margin': 0 }}>
          {menus.map((menu, index) => (
            <li
              onClick={() => handleMenuClick(index)}
              style={{
                'padding': '10px',
                'cursor': 'pointer',
                'text-align': 'center',
                'transition': 'background-color 0.2s ease-in-out',
                'background-color': activeMenu() === menu ? '#e0e0e0' : '',
              }}
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>
      <div
        id="content-scroll"
        style={{ 'flex': 1, 'overflow-y': 'scroll', 'position': 'relative' }}
      >
        {menus.map((menu, index) => (
          <div
            ref={(el: HTMLDivElement) => setMenuReF(el, index)}
            id={menu}
            style={{
              'display': 'flex',
              'justify-content': 'center',
              'align-items': 'center',
              'height': '100%',
              'font-size': '16px',
            }}
          >
            {content[menu]}
          </div>
        ))}
      </div>
    </div>
  )
}
