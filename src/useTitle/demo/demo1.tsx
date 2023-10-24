/**
 * title: Basic usage
 * desc: Set title of the page.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 设置页面标题
 */

import { useTitle } from '@any-hooks/solid'

export default () => {
  useTitle('Page Title')

  return (
    <div>
      <p>Set title of the page.</p>
    </div>
  )
}
