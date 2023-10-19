import {
  type JSX,
  type ParentProps,
  Show,
  createMemo,
  createSignal,
} from 'solid-js'
import IconCode from './Icons/IconCode'

interface DemoProps extends ParentProps {
  data: Record<string, { title: string; desc: string }>
  component: JSX.Element
}
export default function Demo(props: DemoProps) {
  const data = createMemo(() => props.data['/zh-CN'])
  const [open, setOpen] = createSignal(false)
  const toggle = () => setOpen((s) => !s)

  return (
    <div class="border">
      <div class="py-10 px-6">{props.component}</div>
      <div class="relative border-t">
        <h3 class="absolute left-6 -translate-y-50% m-0">{data().title}</h3>
        <p class="pt-4 px-6">{data().desc}</p>
      </div>
      <div class="flex-items-center justify-end pr-6 py-3 border-t border-t-dashed">
        <IconCode class="cursor-pointer" onClick={toggle} />
      </div>
      <Show when={open()}>
        <div class="border-t border-t-dashed">{props.children}</div>
      </Show>
    </div>
  )
}
