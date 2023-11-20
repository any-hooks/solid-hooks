
## 特性

- 易学易用
- 支持 SSR
- 包含大量提炼自业务的高级 Hooks
- 包含丰富的基础 Hooks
- 使用 TypeScript 构建，提供完整的类型定义文件


## 使用

### 安装

```sh
# npm
npm i @any-hooks/solid
#pnpm
pnpm add @any-hooks/solid
#yarn
yarn add @any-hooks/solid
```

### 示例

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
