/**
 * title: Basic usage
 * desc: Execute once per 1000ms.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 每1000ms，执行一次
 */

import { useInterval } from '@any-hooks/solid'
import { createSignal } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal(0)

  useInterval(() => {
    setCount(count() + 1)
  }, 1000)

  return <div>count: {count()}</div>
}
