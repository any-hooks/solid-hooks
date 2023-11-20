## Features

- Easy to learn and use
- Supports SSR
- Contains a large number of advanced Hooks that are refined from business scenarios
- Contains a comprehensive collection of basic Hooks
- Written in TypeScript with predictable static types

## Usage

### Install

```sh
# npm
npm i @any-hooks/solid
#pnpm
pnpm add @any-hooks/solid
#yarn
yarn add @any-hooks/solid
```

### Examples

```tsx
import { useToggle } from '@any-hooks/solid'

function App() {
  const [state, { toggle }] = useToggle(false)

  return (
    <div>
      <p>{state()}</p>
      <button onClick={toggle}>toggle</button>
    </div>
  )
}
```
