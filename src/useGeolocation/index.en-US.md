# useGeolocation

Reactive [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API). 
It allows the user to provide their location to web applications if they so desire. 
For privacy reasons, the user is asked for permission to report location information.

## Example

### Basic Usage

>>> ./demo/demo1.tsx

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

| Property | Description | Type       | Default |
| -------- | ----------- | ---------- | ------- |
| options  | 设置        | `Options`  | -       |

### Options

| Property  | Description        | Type                                        | Default  |
| --------- | ------------------ | ------------------------------------------- | -------- |
| onError   | 错误时触发         | `(error: GeolocationPositionError) => void` | -        |
| immediate | 首次渲染时立即触发 | `boolean`                                   | `false`  |

### Result

| Property        | Description                                     | Type                               |
| --------------- | ----------------------------------------------- | ---------------------------------- |
| coords          | Location information                            | `Accessor<GeolocationCoordinates>` |
| locatedAt       | The time of the last geolocation call           | `Accessor<number \| null>`         |
| isLoading       | Is loading                                      | `Accessor<boolean>`                |
| error           | an error message in case geolocation API fails  | `Accessor<GeolocationPositionError \| null>` |
| resume          | Control function to resume updating geolocation | `() => Promise<{ locatedAt: number; coords: GeolocationCoordinates }>` |
| pause           | Control function to pause updating geolocation  | `() => void`                       |
