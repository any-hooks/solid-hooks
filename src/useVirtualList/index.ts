import { createEffect, createMemo, createSignal } from 'solid-js'
import type { Accessor, JSX } from 'solid-js'
import useEventListener from '../useEventListener'
import useSize from '../useSize'
import useWatch from '../useWatch'
import { isFunction, isNumber } from '../utils'
import { type BasicTarget, getTargetElement } from '../utils/domTarget'

type ItemHeight<T> = (index: number, data: T) => number

export interface Options<T> {
  containerTarget: BasicTarget
  wrapperTarget: BasicTarget
  itemHeight: number | ItemHeight<T>
  overscan?: number
}

type TargetList<T> = {
  index: number
  data: T
}[]

/**
 * A hook that allows you to use virtual list to render huge chunks of list data.
 *
 * 提供虚拟化列表能力的 Hook，用于解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-virtual-list zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-virtual-list en-US}
 */
export default function useVirtualList<T = any>(
  list: Accessor<T[]> | T[],
  options: Options<T>,
) {
  const { containerTarget, wrapperTarget, itemHeight, overscan = 5 } = options
  const dataList = createMemo(() => (isFunction(list) ? list() : list))

  const size = useSize(containerTarget)

  let scrollTriggerByScrollToFunc = false

  const [targetList, setTargetList] = createSignal<TargetList<T>>([])
  const [wrapperStyle, setWrapperStyle] = createSignal<JSX.CSSProperties>({})

  const totalHeight = createMemo(() => {
    const list = dataList()
    if (isNumber(itemHeight))
      return list.length * itemHeight

    return list.reduce(
      (sum, _, index) =>
        sum + (itemHeight as ItemHeight<T>)(index, list[index]),
      0,
    )
  })

  const getVisibleCount = (containerHeight: number, fromIndex: number) => {
    if (isNumber(itemHeight))
      return Math.ceil(containerHeight / itemHeight)

    let sum = 0
    let endIndex = 0
    const list = dataList()
    for (let i = fromIndex; i < list.length; i++) {
      const height = itemHeight(i, list[i])
      sum += height
      endIndex = i
      if (sum >= containerHeight)
        break
    }
    return endIndex - fromIndex
  }

  const getOffset = (scrollTop: number) => {
    if (isNumber(itemHeight))
      return Math.floor(scrollTop / itemHeight) + 1

    let sum = 0
    let offset = 0
    const list = dataList()
    for (let i = 0; i < list.length; i++) {
      const height = itemHeight(i, list[i])
      sum += height
      if (sum >= scrollTop) {
        offset = i
        break
      }
    }
    return offset + 1
  }

  // 获取上部高度
  const getDistanceTop = (index: number) => {
    if (isNumber(itemHeight)) {
      const height = index * itemHeight
      return height
    }
    const list = dataList()
    const height = list
      .slice(0, index)
      .reduce((sum, _, i) => sum + (itemHeight as ItemHeight<T>)(i, list[i]), 0)
    return height
  }

  const calculateRange = () => {
    const container = getTargetElement(containerTarget)
    const list = dataList()

    if (container) {
      const { scrollTop, clientHeight } = container

      const offset = getOffset(scrollTop)
      const visibleCount = getVisibleCount(clientHeight, offset)

      const start = Math.max(0, offset - overscan)
      const end = Math.min(list.length, offset + visibleCount + overscan)

      const offsetTop = getDistanceTop(start)

      setWrapperStyle({
        'height': `${totalHeight() - offsetTop}px`,
        'margin-top': `${offsetTop}px`,
      })

      setTargetList(
        list.slice(start, end).map((ele, index) => ({
          data: ele,
          index: index + start,
        })),
      )
    }
  }

  createEffect(() => {
    const wrapper = getTargetElement(wrapperTarget) as HTMLElement
    const style = wrapperStyle()
    if (wrapper) {
      Object.keys(style).forEach((key) => {
        const value = String(style[key as keyof JSX.CSSProperties] || '')
        wrapper.style.setProperty(key, value)
      })
    }
  })

  useWatch([size, dataList], ([size]) => {
    if (!size?.width || !size?.height)
      return

    calculateRange()
  })

  useEventListener(
    'scroll',
    (e) => {
      if (scrollTriggerByScrollToFunc) {
        scrollTriggerByScrollToFunc = false
        return
      }
      e.preventDefault()
      calculateRange()
    },
    { target: containerTarget },
  )

  const scrollTo = (index: number, behavior?: ScrollBehavior) => {
    const container = getTargetElement(containerTarget)
    const top = getDistanceTop(index)
    if (container) {
      scrollTriggerByScrollToFunc = true
      if (container.scrollTo)
        container.scrollTo({ top, behavior })
      else
        container.scrollTop = top

      calculateRange()
    }
  }

  return [targetList, scrollTo] as const
}
