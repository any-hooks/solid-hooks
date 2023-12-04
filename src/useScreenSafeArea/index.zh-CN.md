# useScreenSafeArea

响应式 `env(safe-area-inset-*)`

获取屏幕可交互的安全区域。

<img src="/safe-areas-1.png" alt="safe-area" style="max-width: 80%;display:block;margin:24px auto" />

## 代码演示

### 基础用法

>>> ./demo/demo1.tsx


## 使用

为了使页面在屏幕上完全呈现，必须首先设置 `viewport meta` 标签中的附加属性 `viewport-fit=cover`,
`viewport meta` 标签可能看起来像这样:

```html
<meta name="viewport" content="initial-scale=1, viewport-fit=cover">
```

## API

```ts
const safeArea = useScreenSafeArea()
```

### Result

| Property | Description     | Type             |
| -------- | --------------- | ---------------- |
| safeArea | Safe area       | `Accessor<Area>` |

### Area

| Property | Description         | Type             |
| -------- | ------------------- | ---------------- |
| top      | Safe area of top    | `string`         |
| bottom   | Safe area of bottom | `string`         |
| left     | Safe area of left   | `string`         |
| right    | Safe area of right  | `string`         |
