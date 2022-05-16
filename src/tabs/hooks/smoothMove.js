export function smoothMove(el, cur) {
  const mid = el.value.clientWidth / 2
  const isLeft = mid > cur

  let distance = 0
  if (isLeft && el.value.scrollLeft) {
    distance = Math.abs(mid - cur) * -1
  } else if (!isLeft) {
    distance = Math.abs(mid - cur)
  }

  const move = setInterval(() => {
    if (Math.round(distance)) {
      el.value.scrollLeft += distance / 10
      distance -= distance / 10
    } else {
      clearInterval(move)
    }
  }, 10)
}
