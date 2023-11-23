import { type Accessor, createMemo, createSignal } from 'solid-js'
import useEventListener from '../useEventListener'
import isBrowser from '../utils/isBrowser'

export interface Options<T> {
  /**
   * listen to the clipboard
   *
   * 是否侦听剪切板
   *
   * @default false
   */
  read?: boolean
  /**
   * default text
   *
   * 默认文本
   */
  source?: T
  /**
   * Replication state duration. unit: `ms`
   *
   * 复制状态持续时间。 单位： `ms`
   *
   * @default 1500
   */
  copiedDuring?: number
  /**
   * Whether to use `document.execCommand` when `navigator.clipboard` is not supported
   *
   * 当不支持 `navigator.clipboard` 时是否使用 `document.execCommand`
   *
   * @default false
   */
  legacy?: boolean
  navigator?: Navigator
}

export interface UseClipboardReturn<Optional> {
  isSupported: Accessor<boolean>
  copied: Accessor<boolean>
  text: Accessor<string>
  copy: Optional extends true
    ? (text?: string) => Promise<void>
    : (text: string) => Promise<void>
}

/**
 * Reactive {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard Clipboard API}
 *
 * 响应式 {@link https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard 剪贴板 API}
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-clipboard zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-clipboard en-US}
 *
 * @example
 * ```ts
 * const { text, copied, copy } = useClipboard()
 * const copyText = () => copy('hello world')
 * ```
 */
function useClipboard(options?: Options<undefined>): UseClipboardReturn<false>
function useClipboard(options: Options<string>): UseClipboardReturn<true>
function useClipboard(
  options: Options<string | undefined> = {},
): UseClipboardReturn<boolean> {
  const {
    navigator = isBrowser ? window.navigator : undefined,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false,
  } = options
  const isSupportedApiClipboard = navigator && 'clipboard' in navigator
  const isSupported = createMemo(() => isSupportedApiClipboard || legacy)

  const [text, setText] = createSignal<string>('')
  const [copied, setCopied] = createSignal<boolean>(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  const resetCopied = () => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => setCopied(false), copiedDuring)
  }

  function updateText() {
    if (isSupportedApiClipboard) {
      navigator!.clipboard.readText().then((value) => {
        setText(value ?? '')
      })
    }
    else {
      setText(legacyRead())
    }
  }

  if (isSupported() && read) {
    useEventListener('copy', updateText)
    useEventListener('cut', updateText)
  }

  const copy = async (text: string = source || '') => {
    if (isSupported()) {
      if (isSupportedApiClipboard)
        await navigator!.clipboard.writeText(text)
      else
        legacyCopy(text)

      setText(text)
      setCopied(true)
      resetCopied()
    }
  }

  function legacyCopy(value: string) {
    const ta = document.createElement('textarea')
    ta.value = value ?? ''
    ta.style.position = 'absolute'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }

  function legacyRead() {
    return document?.getSelection?.()?.toString() ?? ''
  }

  return {
    isSupported,
    text,
    copied,
    copy,
  }
}

export default useClipboard
