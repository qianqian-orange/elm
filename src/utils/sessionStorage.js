export function set(key, val) {
  sessionStorage.setItem(key, JSON.stringify(val))
}

export function get(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

export function remove(key) {
  return sessionStorage.removeItem(key)
}

export function clear() {
  sessionStorage.clear()
}
