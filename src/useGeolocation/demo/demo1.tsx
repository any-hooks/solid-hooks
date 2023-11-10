/**
 * title: Default usage
 * desc: Get current geolocation information
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 获取当前地理位置信息
 */

import { useGeolocation } from '@any-hooks/solid'

export default () => {
  const { coords, error, resume, pause } = useGeolocation()

  return (
    <div>
      <pre lang="json">
        {JSON.stringify(
          { coords: coords(), error: error()?.message || '' },
          null,
          2,
        )}
      </pre>
      <button onClick={pause} style={{ margin: '16px 16px 0 0' }}>
        Pause watch
      </button>
      <button onClick={resume}>Start watch</button>
    </div>
  )
}
