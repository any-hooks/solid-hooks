import { useResetSignal } from '@any-hooks/solid'

interface State {
  hello: string
  count: number
}

export default () => {
  const [state, setState, resetState] = useResetSignal<State>({
    hello: '',
    count: 0,
  })

  return (
    <div>
      <pre>{JSON.stringify(state(), null, 2)}</pre>
      <p>
        <button
          type="button"
          style={{ 'margin-right': '8px' }}
          onClick={() =>
            setState(state => ({ hello: 'world', count: state.count + 1 }))}
        >
          set hello and count
        </button>

        <button type="button" onClick={resetState}>
          resetState
        </button>
      </p>
    </div>
  )
}
