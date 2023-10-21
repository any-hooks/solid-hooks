import { createUseStorage } from '../createUseStorage'
import isBrowser from '../utils/isBrowser'

const useLocalStorage = createUseStorage(() =>
  isBrowser ? localStorage : undefined,
)

export default useLocalStorage
