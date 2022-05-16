export function useSwipeable(attrs, max, swipe) {
  let startX, moveX, direction

  const touchstart = e => (startX = e.touches[0].pageX)

  const touchmove = e => (moveX = e.touches[0].pageX)

  const touchend = () => {
    direction = moveX - startX

    if (Math.abs(direction) < 70) {
      return
    }

    const to = direction > 0 ? attrs.modelValue - 1 : attrs.modelValue + 1

    if (to >= 0 && to < max.length) {
      swipe(to)
    }
  }
  return {
    touchstart,
    touchmove,
    touchend
  }
}
