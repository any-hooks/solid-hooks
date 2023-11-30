import { useToggle } from '@any-hooks/solid'
import { type JSX, type ParentProps, Show, createMemo } from 'solid-js'
import IconCode from './Icons/IconCode'
import { useAppContext } from '~/AppContext'

interface DemoProps extends ParentProps {
  data: Record<string, { title: string, desc: string }>
  component: JSX.Element
}
export default function Demo(props: DemoProps) {
  const [store] = useAppContext()
  const data = createMemo(() => props.data[`/${store.lang}`])
  const [open, { toggle }] = useToggle(false)

  return (
    <div class="demo-container border">
      <div class="px-6 py-10">{props.component}</div>
      <Show when={data()}>
        <div class="relative border-t">
          <h3 class="absolute left-6 m-0 bg-[var(--c-bg)] -translate-y-50%">
            {data().title}
          </h3>
          <p class="px-6 pt-4">{data().desc || ''}</p>
        </div>
      </Show>
      <div class="flex-items-center justify-end border-t border-t-dashed py-3 pr-6">
        <IconCode class="cursor-pointer" onClick={toggle} />
      </div>
      <Show when={open()}>
        <div class="border-t border-t-dashed">{props.children}</div>
      </Show>
    </div>
  )
}
