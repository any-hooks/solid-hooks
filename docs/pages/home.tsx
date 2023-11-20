import { A, useRouteData } from '@solidjs/router'
import { createMemo } from 'solid-js'
import HomeEnUs from '../markdown/home.en-US.md'
import HomeZhCn from '../markdown/home.zh-CN.md'

export default function Home() {
  const data = useRouteData<{ lang: 'zh-CN' | 'en-US' }>()
  const desc = createMemo(() =>
    data.lang === 'en-US'
      ? 'A high-quality & reliable Solid Hooks library.'
      : '一套高质量可靠的 Solidjs Hooks 库',
  )

  const Markdown = data.lang === 'zh-CN' ? HomeZhCn : HomeEnUs

  return (
    <div class="home-wrapper -mx-10 -mt-4">
      <div class="home-container flex mb-10 bg-gray-100 dark:bg-gray-800">
        <div class="home-content m-auto text-center">
          <h2 class="m-0 text-4xl text-bolder">@any-hooks/solid</h2>
          <p class="mt-10 text-medium">{desc()}</p>
          <div class="mt-10">
            <a
              href="https://github.com/any-hooks/solid-hooks"
              target="_blank"
              rel="noreferrer"
              class="btn btn-brand btn-lg"
            >
              GitHub
            </a>
            <A href={`/${data.lang}/hooks/use-boolean`} class="btn btn-lg ml-4">
              Hooks List
            </A>
          </div>
        </div>
      </div>
      <Markdown toc={false} />
    </div>
  )
}
