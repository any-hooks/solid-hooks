/**
 * title: Default usage
 * desc: Listen to document visibility change.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 监听 document 的可见状态
 */

import { useDocumentVisibility } from '@any-hooks/solid'

export default () => {
  const documentVisibility = useDocumentVisibility()

  return (
    <div>
      Current document visibility state:
      {documentVisibility()}
    </div>
  )
}
