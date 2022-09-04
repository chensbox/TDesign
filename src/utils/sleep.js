export function sleep(time = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export function Defer() {
  const defer = Object.create(null)
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}
