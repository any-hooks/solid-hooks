export interface SidebarItem {
  title: string
  children: string[]
}

export const sidebarConfig: SidebarItem[] = [
  {
    title: 'State',
    children: [
      'useBoolean',
      'useToggle',
      'useDebounceSignal',
      'useThrottleSignal',
      'useUnmountedSignal',
      'useResetSignal',
      'useLocalStorage',
      'useSessionStorage',
      'useRef',
    ],
  },
  {
    title: 'Effect',
    children: [
      'useWatch',
      'useDebounceFn',
      'useThrottleFn',
      'useInterval',
      'useTimeout',
      'useLockFn',
    ],
  },
  {
    title: 'Dom',
    children: [
      'useClipboard',
      'useClickAway',
      'useEventListener',
      'useInViewport',
      'useDocumentVisibility',
      'useHover',
      'useMouse',
      'useScroll',
      'useScrollLock',
      'useSize',
      'useFullscreen',
      'useFocusWithin',
      'useKeyPress',
      'useLongPress',
      'useMutationObserver',
      'useTitle',
      'useCssVar',
    ],
  },
  {
    title: 'Scene',
    children: ['useNetwork', 'useCookie', 'useResponsive', 'useGeolocation'],
  },
]
