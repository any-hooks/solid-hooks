import { useMatch } from '@solidjs/router'
import type { ParentProps } from 'solid-js'
import { Show, Suspense, onMount } from 'solid-js'
import Loading from './Loading'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useCopyCode } from '~/hooks/copyCode'

export default function Layout(props: ParentProps) {
  const isHooks = useMatch(() => '/:lang/hooks/*')

  onMount(() => useCopyCode())
  return (
    <main
      class="app min-h-100% pt-navbar"
      classList={{ 'pl-sidebar': !!isHooks() }}
    >
      <Navbar />
      <Show when={isHooks()}>
        <Sidebar />
      </Show>
      <div class="px-10 py-4">
        <Suspense fallback={<Loading />}>{props.children}</Suspense>
      </div>
    </main>
  )
}
