/**
 * title: Pass in DOM element
 * desc: Pass in a function that returns the DOM element.
 *
 * title.zh-CN: 传入 DOM 元素
 * desc.zh-CN: 传入 function 并返回一个 dom 元素。
 */

import { useFocusWithin } from '@any-hooks/solid'

export default () => {
  const isFocusWithin = useFocusWithin(() =>
    document.getElementById('focus-area'),
  )

  return (
    <div>
      <div
        id="focus-area"
        style={{
          'padding': '16px',
          'background-color': isFocusWithin() ? 'red' : '',
          'border': '1px solid gray',
        }}
      >
        <label style={{ display: 'block' }}>
          First Name:
          {' '}
          <input />
        </label>
        <label style={{ 'display': 'block', 'margin-top': '16px' }}>
          Last Name:
          {' '}
          <input />
        </label>
      </div>
      <p>
        isFocusWithin:
        {JSON.stringify(isFocusWithin())}
      </p>
    </div>
  )
}
