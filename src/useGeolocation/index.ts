import { createMemo, createSignal, onCleanup } from 'solid-js'
import isBrowser from '../utils/isBrowser'

interface Options extends Partial<PositionOptions> {
  immediate?: boolean
  navigator?: Navigator
  onError?: (error: GeolocationPositionError) => void
}

/**
 *
 * Creates a geolocation hook that provides the current position of the user.
 *
 * 创建一个提供用户当前位置的地理位置钩子。
 *
 * Docs {@link https://solid-hooks.netlify.app/zh-CN/hooks/use-geolocation zh-CN}
 * | {@link https://solid-hooks.netlify.app/en-US/hooks/use-geolocation en-US}
 *
 * @param options - An object containing optional parameters for geolocation.
 * @param options.immediate - Whether to immediately start retrieving the position. Defaults to true.
 * @param options.enableHighAccuracy - Whether to use high accuracy mode. Defaults to true.
 * @param options.maximumAge - The maximum age, in milliseconds, of a cached position. Defaults to 30000.
 * @param options.timeout - The maximum time, in milliseconds, to wait for a position. Defaults to 27000.
 * @param options.onError - A callback function to handle errors.
 *
 * @example
 * ```ts
 * const { coords, error, resume, pause } = useGeolocation()
 * resume()
 * ```
 */
function useGeolocation(options: Options = {}) {
  const {
    enableHighAccuracy = true,
    maximumAge = 30000,
    timeout = 27000,
    navigator = isBrowser ? window.navigator : undefined,
    immediate = true,
    onError,
  } = options

  const isSupported = createMemo(() => navigator && 'geolocation' in navigator)
  const [isLoading, setLoading] = createSignal(true)
  const [locatedAt, setLocateAt] = createSignal<number | null>(null)
  const [coords, setCoords] = createSignal<GeolocationPosition['coords']>({
    accuracy: 0,
    latitude: Number.POSITIVE_INFINITY,
    longitude: Number.POSITIVE_INFINITY,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  })
  const [error, setError] = createSignal<GeolocationPositionError | null>(null)

  let watcher: number

  function updatePosition(position: GeolocationPosition) {
    setLocateAt(position.timestamp)
    setCoords(position.coords)
    setError(null)
    setLoading(false)
  }

  function resume(): Promise<{
    locatedAt: number
    coords: GeolocationPosition['coords']
  }> {
    return new Promise((resolve, reject) => {
      if (isSupported()) {
        watcher = navigator!.geolocation.watchPosition(
          (position) => {
            updatePosition(position)
            resolve({ locatedAt: position.timestamp, coords: position.coords })
          },
          (error) => {
            setError(error)
            onError?.(error)
            reject(error)
            setLoading(false)
          },
          { enableHighAccuracy, maximumAge, timeout },
        )
      }
      else {
        reject(new Error('Geolocation is not supported'))
      }
    })
  }

  function pause() {
    if (watcher && navigator) {
      navigator.geolocation.clearWatch(watcher)
      setLoading(false)
    }
  }

  if (immediate)
    resume()

  onCleanup(() => pause())

  return { isSupported, isLoading, locatedAt, coords, error, resume, pause }
}

export default useGeolocation
