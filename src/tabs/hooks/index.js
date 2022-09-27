import { onUnmounted, unref } from 'vue'
export function useSwipeable(attrs, max, swipe) {
  let startX, moveX, direction

  const touchstart = e => (startX = e.touches[0].pageX)

  const touchmove = e => (moveX = e.touches[0].pageX)

  const touchend = () => {
    direction = moveX - startX

    if (Math.abs(direction) < 70) {
      return
    }

    const index = direction > 0 ? attrs.modelValue - 1 : attrs.modelValue + 1

    if (index >= 0 && index < max) {
      swipe(index)
    }
  }

  const addListener = target => {
    target = unref(target)

    target.addEventListener('touchstart', touchstart)
    target.addEventListener('touchmove', touchmove)
    target.addEventListener('touchend', touchend)

    onUnmounted(() => {
      target.removeEventListener('touchstart', touchstart)
      target.removeEventListener('touchmove', touchmove)
      target.removeEventListener('touchend', touchend)
    })
  }

  return {
    touchstart,
    touchmove,
    touchend,
    addListener
  }
}
