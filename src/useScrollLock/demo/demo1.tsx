/**
 * title: Basic Usage
 * desc: Lock scrolling of the element.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 锁定滚动元素。
 */

import { useRef, useScrollLock } from '@any-hooks/solid'

export default () => {
  const [ref, setRef] = useRef()
  const [isLock, setLock] = useScrollLock(ref)
  const toggleLock = () => {
    setLock(!isLock())
  }
  return (
    <div>
      <p>State： {isLock() ? 'Unlock' : 'Lock'}</p>
      <button type="button" onClick={toggleLock}>
        Toggle lock
      </button>
      <div
        style={{
          'height': '160px',
          'width': '160px',
          'border': 'solid 1px #000',
          'overflow': 'scroll',
          'white-space': 'nowrap',
          'font-size': '32px',
          'margin-top': '16px',
        }}
        ref={setRef}
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur
          atque, debitis ex excepturi explicabo iste iure labore molestiae neque
          optio perspiciatis
        </div>
        <div>
          Aspernatur cupiditate, deleniti id incidunt mollitia omnis! A
          aspernatur assumenda consequuntur culpa cumque dignissimos enim eos,
          et fugit natus nemo nesciunt
        </div>
        <div>
          Alias aut deserunt expedita, inventore maiores minima officia porro
          rem. Accusamus ducimus magni modi mollitia nihil nisi provident
        </div>
        <div>
          Alias aut autem consequuntur doloremque esse facilis id molestiae
          neque officia placeat, quia quisquam repellendus reprehenderit.
        </div>
        <div>
          Adipisci blanditiis facere nam perspiciatis sit soluta ullam!
          Architecto aut blanditiis, consectetur corporis cum deserunt
          distinctio dolore eius est exercitationem
        </div>
        <div>
          Ab aliquid asperiores assumenda corporis cumque dolorum expedita
        </div>
        <div>
          Culpa cumque eveniet natus totam! Adipisci, animi at commodi delectus
          distinctio dolore earum, eum expedita facilis
        </div>
        <div>
          Quod sit, temporibus! Amet animi fugit officiis perspiciatis, quis
          unde. Cumque dignissimos distinctio, dolor eaque est fugit nisi non
          pariatur porro possimus, quas quasi
        </div>
      </div>
    </div>
  )
}
