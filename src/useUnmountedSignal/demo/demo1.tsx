/**
 * title: Default usage
 * desc: unmounted means whether the component is unmounted
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: unmounted 代表组件是否已经卸载
 */

import { useBoolean, useUnmountedSignal } from '@any-hooks/solid'
import { onMount } from 'solid-js'

const MyComponent = () => {
  const unmounted = useUnmountedSignal()
  onMount(() => {
    setTimeout(() => {
      if (!unmounted()) {
        console.log('component is alive')
      }
    }, 3000)
  })

  return <p>Hello World!</p>
}

export default () => {
  const [state, { toggle }] = useBoolean(true)

  return (
    <>
      <button type="button" onClick={toggle}>
        {state() ? 'unmount' : 'mount'}
      </button>
      {state() && <MyComponent />}
    </>
  )
}
