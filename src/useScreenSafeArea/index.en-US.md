# useScreenSafeArea

Reactive `env(safe-area-inset-*)`

Get the safe area of the screen.

<img src="/safe-areas-1.png" alt="safe-area" style="max-width: 80%;display:block;margin:24px auto" />

## Examples

### Basic Usage

>>> ./demo/demo1.tsx


## Usage

In order to make the page to be fully rendered in the screen, the additional attribute `viewport-fit=cover` within `viewport` meta tag must be set firstly, the `viewport` meta tag may look like this:

```html
<meta name='viewport' content='initial-scale=1, viewport-fit=cover'>
```

## API

```ts
const safeArea = useScreenSafeArea()
```

### Result

| 参数     | 说明     | 类型             |
| -------- | -------- | ---------------- |
| safeArea | 安全区域 | `Accessor<Area>` |

### Area

| 参数     | 说明         | 类型             |
| -------- | ------------ | ---------------- |
| top      | 顶部安全区域 | `string`         |
| bottom   | 底部安全区域 | `string`         |
| left     | 左侧安全区域 | `string`         |
| right    | 右侧安全区域 | `string`         |
