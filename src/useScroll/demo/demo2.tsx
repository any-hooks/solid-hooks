/**
 * title: Listen Page Scroll
 * desc: Try to scroll this webpage.
 *
 * title.zh-CN: 监测整页的滚动
 * desc.zh-CN: 尝试滚动一下页面。
 */

import { useScroll } from '@any-hooks/solid'

export default () => {
  const scroll = useScroll(document)
  return (
    <div>
      <div>{JSON.stringify(scroll())}</div>
    </div>
  )
}
