import { type Accessor, createMemo, createSignal } from 'solid-js'
import { useWatch } from '..'

type CloneFn<F, T = F> = (x: F) => T

export interface UseHistorySignalRecord<T> {
  snapshot: T
  timestamp: number
}

export interface UseHistorySignalOptions<Raw, Serialized = Raw> {
  /**
   * Maximum number of history to be kept. Default to unlimited.
   */
  capacity?: number
  /**
   * Clone when taking a snapshot, shortcut for dump: JSON.parse(JSON.stringify(value)).
   * Default to false
   *
   * @default false
   */
  clone?: boolean | CloneFn<Raw>
  /**
   * Serialize data into the history
   */
  dump?: (v: Raw) => Serialized
  /**
   * Deserialize data from the history
   */
  parse?: (v: Serialized) => Raw

  /**
   * set data source
   */
  setSource?: (value: Raw) => void

  /**
   * Manually track the change history
   *
   * @default false
   */
  manual?: boolean
}

export interface UseHistorySignalReturn<Raw, Serialized> {
  /**
   * Bypassed tracking signal from the argument
   */
  source: Accessor<Raw>
  /**
   * An array of history records for undo, newest comes to first
   */
  history: Accessor<UseHistorySignalRecord<Serialized>[]>
  /**
   * Last history point, source can be different if paused
   */
  last: Accessor<UseHistorySignalRecord<Serialized>>
  /**
   * Records array for undo
   */
  undoStack: Accessor<UseHistorySignalRecord<Serialized>[]>
  /**
   * Records array for redo
   */
  redoStack: Accessor<UseHistorySignalRecord<Serialized>[]>
  /**
   * A Signal representing if undo is possible (non empty undoStack)
   */
  canUndo: Accessor<boolean>
  /**
   * A Signal representing if redo is possible (non empty redoStack)
   */
  canRedo: Accessor<boolean>
  /**
   * Undo changes
   */
  undo: () => void

  /**
   * Redo changes
   */
  redo: () => void

  /**
   * Clear all the history
   */
  clear: () => void

  /**
   * Create a new history record
   */
  commit: () => void

  /**
   * Reset ref's value with latest history
   */
  reset: () => void
}

function fnBypass<F, T>(v: F) {
  return v as unknown as T
}

function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source))
}

type FnCloneOrBypass<F, T> = (v: F) => T

function defaultDump<R, S>(clone?: boolean | CloneFn<R>) {
  return (clone
    ? typeof clone === 'function'
      ? clone
      : cloneFnJSON
    : fnBypass) as unknown as FnCloneOrBypass<R, S>
}

function defaultParse<R, S>(clone?: boolean | CloneFn<R>) {
  return (clone
    ? typeof clone === 'function'
      ? clone
      : cloneFnJSON
    : fnBypass) as unknown as FnCloneOrBypass<S, R>
}

/**
 * Track the change history of a signal, provides undo and redo functionality
 *
 * 跟踪信号的更改历史，提供撤消和重做功能
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-history-signal zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-history-signal en-US}
 *
 * @example
 * ```ts
 * const [count, setCount] = createSignal<number>(0)
 * const { undo, redo, history, canRedo, canUndo } = useHistorySignal(count, {
 *   setSource: (source) => setCount(source),
 * })
 * ```
 */
export default function useHistorySignal<Raw, Serialized = Raw>(
  source: Accessor<Raw>,
  options: UseHistorySignalOptions<Raw, Serialized> = {},
): UseHistorySignalReturn<Raw, Serialized> {
  const {
    clone = false,
    manual = false,
    dump = defaultDump<Raw, Serialized>(clone),
    parse = defaultParse<Raw, Serialized>(clone),
    setSource,
  } = options

  function _createHistoryRecord(): UseHistorySignalRecord<Serialized> {
    return {
      snapshot: dump(source()),
      timestamp: Date.now(),
    }
  }

  const [last, setLast] = createSignal<UseHistorySignalRecord<Serialized>>(
    _createHistoryRecord(),
  )
  const [undoStack, setUndoStack] = createSignal<
    UseHistorySignalRecord<Serialized>[]
  >([],
  )
  const [redoStack, setRedoStack] = createSignal<
    UseHistorySignalRecord<Serialized>[]
  >([],
  )

  let ignoreUpdate = false

  const _setSource = (record: UseHistorySignalRecord<Serialized>) => {
    ignoreUpdate = true
    setSource?.(parse(record.snapshot))
    setLast(record)
    ignoreUpdate = false
  }

  const commit = () => {
    let res = [last(), ...undoStack()]
    if (options.capacity && res.length > options.capacity)
      res = res.slice(0, options.capacity)

    setUndoStack(res)
    setLast(_createHistoryRecord())
    redoStack().length && setRedoStack([])
  }

  const clear = () => {
    setUndoStack([])
    setRedoStack([])
  }

  const undo = () => {
    if (undoStack().length) {
      setRedoStack([last(), ...redoStack()])
      const [first, ...rest] = undoStack()
      _setSource(first)
      setUndoStack(rest)
    }
  }

  const redo = () => {
    if (redoStack().length) {
      setUndoStack([last(), ...undoStack()])
      const [first, ...rest] = redoStack()
      _setSource(first)
      setRedoStack(rest)
    }
  }

  const reset = () => _setSource(last())

  const history = createMemo(() => [last(), ...undoStack()])
  const canUndo = createMemo(() => undoStack().length > 0)
  const canRedo = createMemo(() => redoStack().length > 0)

  if (!manual)
    useWatch(source, () => !ignoreUpdate && commit(), { defer: true })

  return {
    source,
    last,
    undoStack,
    redoStack,
    history,

    canUndo,
    canRedo,

    commit,
    clear,
    undo,
    redo,
    reset,
  }
}
