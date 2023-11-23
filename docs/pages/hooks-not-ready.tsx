import { useLocation } from '@solidjs/router'
import { Match, Switch, createMemo } from 'solid-js'
import { useAppContext } from '~/AppContext'

export default function HookNotReady() {
  const [store] = useAppContext()
  const location = useLocation()

  const hookName = createMemo(() => {
    const pathname = location.pathname.split('/')
    const name = pathname[pathname.length - 1] || ''
    return name.replace(/\-(\w)/g, (_, s) => s.toUpperCase())
  })

  return (
    <div>
      <Switch>
        <Match when={store.lang === 'en-US'}>
          <p>
            The hooks
            {' '}
            <span class="font-medium text-brand">{hookName()}</span>
            {' '}
            doc is not ready yet, please wait...
          </p>
        </Match>
        <Match when={store.lang === 'zh-CN'}>
          <p>
            Hooks
            {' '}
            <span class="font-medium text-brand">{hookName()}</span>
            {' '}
            文档
            还未准备好，请稍后..
          </p>
        </Match>
      </Switch>
    </div>
  )
}
