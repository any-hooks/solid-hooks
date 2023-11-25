/**
 * title: Basic Usage
 * desc: Get the safe area of the screen.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 获取屏幕安全区域。
 */
import { useScreenSafeArea } from '@any-hooks/solid'

export default () => {
  const safeArea = useScreenSafeArea()

  return (
    <div>
      <pre>
        {JSON.stringify(safeArea(), null, 2)}
      </pre>
    </div>
  )
}
