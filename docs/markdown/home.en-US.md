
<div align="center">

<img alt="npm" src="https://img.shields.io/npm/v/@any-hooks/solid?style=flat-square" />
<img alt="npm peer dependency version" src="https://img.shields.io/npm/dependency-version/@any-hooks/solid/peer/solid-js?style=flat-square" />
<img src="https://img.badgesize.io/https:/unpkg.com/@any-hooks/solid/dist/index.js?label=gzip%20size&compression=gzip" alt="gzip size" />
<img src="https://img.shields.io/github/license/any-hooks/solid-hooks" />

</div>

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
