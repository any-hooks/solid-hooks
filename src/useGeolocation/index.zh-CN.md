# useGeolocation

响应式 [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)。
它允许用户向web应用程序提供他们的位置，如果他们愿意的话。
出于隐私原因，用户需要授权访问位置信息的权限。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### API

```typescript
const {
  coords,
  locatedAt,
  isLoading,
  error,
  resume,
  pause
} = useGeolocation(options:? Options)
```

### Params

| 参数    | 说明     | 类型                          | 默认值 |
| ------- | -------- | ----------------------------- | ------ |
| options | 设置     | `Options`                     | -      |

### Options

| 参数      | 说明               | 类型                                        | 默认值  |
| --------- | ------------------ | ------------------------------------------- | ------- |
| onError   | 错误时触发         | `(error: GeolocationPositionError) => void` | -       |
| immediate | 首次渲染时立即触发 | `boolean`                                   | `false` |

### Result

| 参数             | 说明        | 类型                               |
| ---------------- | ----------- | ---------------------------------- |
| coords          | 位置信息     | `Accessor<GeolocationCoordinates>` |
| locatedAt       | 定位时间     | `Accessor<number \| null>`         |
| isLoading       | 是否加载中   | `Accessor<boolean>`                |
| error           | 错误信息     | `Accessor<GeolocationPositionError \| null>` |
| resume          | 恢复定位     | `() => Promise<{ locatedAt: number; coords: GeolocationCoordinates }>` |
| pause           | 暂停定位     | `() => void`                       |
