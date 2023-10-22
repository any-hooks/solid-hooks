/**
 * title: Advanced Usage
 * desc: watch the clipboard, get the current clipboard text
 *
 * title.zh-CN: 进阶用法
 * desc.zh-CN: 监听剪切板，获取当前剪切板的文本
 */

import { useClipboard } from '@any-hooks/solid'

export default () => {
  const { text, copied } = useClipboard({ read: true })

  return (
    <div>
      <p>text: {text()}</p>
      <p>copied: {JSON.stringify(copied())}</p>
      <p>select and copy any text: " hello world "</p>
    </div>
  )
}
