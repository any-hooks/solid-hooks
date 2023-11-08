export default class EventEmitter {
  _listeners: Map<string, Set<(...args: any[]) => any>> = new Map()

  on(event: string, fn: (...args: any[]) => any) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set())
    }
    this._listeners.get(event)!.add(fn)
  }

  off(event: string, fn: (...args: any[]) => any) {
    if (!this._listeners.has(event)) return
    this._listeners.get(event)!.delete(fn)
  }

  emit(event: string, ...args: any[]) {
    if (!this._listeners.has(event)) return
    this._listeners.get(event)!.forEach((fn) => fn(...args))
  }

  clear() {
    this._listeners.clear()
  }
}
