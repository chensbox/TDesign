function raf(callback) {
  return window.requestAnimationFrame(callback)
}

export function smoothMove(el, cur) {
  const mid = el.value.clientWidth / 2
  const isLeft = mid > cur

  let distance = 0
  if (isLeft && el.value.scrollLeft) {
    distance = Math.abs(mid - cur) * -1
  } else if (!isLeft) {
    distance = Math.abs(mid - cur)
  }

  const macroTick = () => {
    raf(() => {
      if (Math.round(distance)) {
        el.value.scrollLeft += Math.round(distance / 8)
        distance -= Math.round(distance / 8)
        macroTick()
      }
    })
  }
  macroTick()
}
