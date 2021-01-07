class EventHub {
  private cache: {[key: string]: Array<(data: unknown) => void>} = {}
  on(eventName: string, cb: (data?: unknown) => void) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(cb)
  }
  off(eventName: string, cb: (data?: unknown) => void) {
    const index = (this.cache[eventName] || []).indexOf(cb)
    if (index >= 0) this.cache[eventName].splice(index, 1)
  }
  emit(eventName: string, message?: unknown) {
    (this.cache[eventName] || []).forEach(fn => fn(message))
  }
}

export default EventHub

