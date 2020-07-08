export function get(vm, key) {
  const data = vm.$options[key]
  if (typeof data === 'function') return data.call(vm)
  return data
}
