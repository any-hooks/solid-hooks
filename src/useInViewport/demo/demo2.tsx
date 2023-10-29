/**
 * title: Observe element visible area ratio
 * desc: Pass in `options.threshold`, you can control the ratio to be triggered when the visible area reach every threshold. <br /> `options.root` can control the parent element, in this example, visible will not change relative to the browser viewport.
 *
 * title.zh-CN: 监听元素可见区域比例
 * desc.zh-CN: 传入 `options.threshold`, 可以控制在可见区域达到该比例时触发 ratio 更新。<br /> `options.root` 可以控制相对父级元素，在这个例子中，不会相对浏览器视窗变化。
 */

import { useInViewport } from '@any-hooks/solid'

export default () => {
  const [inViewport, ratio] = useInViewport(
    () => document.getElementById('children'),
    {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      root: () => document.getElementById('parent'),
    },
  )
  return (
    <div>
      <div
        style={{
          width: '300px',
          height: '300px',
          overflow: 'scroll',
          border: '1px solid',
        }}
        id="parent"
      >
        scroll here
        <div style={{ height: '800px' }}>
          <div
            id="children"
            style={{
              'border': '1px solid',
              'height': '100px',
              'width': '100px',
              'text-align': 'center',
              'margin-top': '80px',
            }}
          >
            observer dom
          </div>
        </div>
      </div>
      <div
        style={{
          'margin-top': '16px',
          'color': inViewport() ? '#87d068' : '#f50',
        }}
      >
        <p>inViewport: {inViewport() ? 'visible' : 'hidden'}</p>
        <p>ratio: {ratio()}</p>
      </div>
    </div>
  )
}
