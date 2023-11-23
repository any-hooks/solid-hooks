import { render, renderHook, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import useSize from '..'
import useRef from '../../useRef'

let callback: any
vi.mock('resize-observer-polyfill', () => {
  return {
    default: vi.fn().mockImplementation((cb: any) => {
      callback = cb
      return {
        observe: () => {},
        disconnect: () => {},
      }
    }),
  }
})

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useSize', () => {
  it('should work when target is a mounted DOM', () => {
    const hook = renderHook(() => useSize(document.body))
    expect(hook.result()).toEqual({ height: 0, width: 0 })
  })

  it('should work when target is a `MutableRefObject`', async () => {
    const mockRaf = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0)
        return 0
      })

    function Setup() {
      const [ref, setRef] = useRef()
      const size = useSize(ref)

      return (
        <div ref={setRef}>
          <div>
            width:
            {String(size()?.width)}
          </div>
          <div>
            height:
            {String(size()?.height)}
          </div>
        </div>
      )
    }

    render(() => <Setup />)
    expect(await screen.findByText(/^width/)).toHaveTextContent(
      'width: undefined',
    )
    expect(await screen.findByText(/^height/)).toHaveTextContent(
      'height: undefined',
    )

    callback([{ target: { clientWidth: 10, clientHeight: 10 } }])
    expect(await screen.findByText(/^width/)).toHaveTextContent('width: 10')
    expect(await screen.findByText(/^height/)).toHaveTextContent('height: 10')
    mockRaf.mockRestore()
  })

  it('should not work when target is null', () => {
    expect(() => {
      renderHook(() => useSize(null))
    }).not.toThrowError()
  })

  it('should work', () => {
    const mockRaf = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0)
        return 0
      })
    const targetEl = document.createElement('div')
    const { result } = renderHook(() => useSize(targetEl))

    callback([
      {
        target: {
          clientWidth: 100,
          clientHeight: 50,
        },
      },
    ])

    expect(result()).toMatchObject({
      width: 100,
      height: 50,
    })

    mockRaf.mockRestore()
  })
})
