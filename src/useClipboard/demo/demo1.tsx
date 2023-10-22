/**
 * title: Basic Usage
 * desc: Copy the text to the clipboard
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 将文本复制到剪贴板
 */

import { useClipboard } from '@any-hooks/solid'

export default () => {
  const { text, copied, copy } = useClipboard()

  return (
    <div>
      <p>text: {text()}</p>
      <p>copied: {JSON.stringify(copied())}</p>
      <button onClick={() => copy('hello world')}>copy</button>
    </div>
  )
}
