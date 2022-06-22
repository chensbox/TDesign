<template>
  <div class="swipe">
    <div
      class="swipe-track"
      ref="trackRef"
      :style="trackStyle"
      @touchstart.prevent="touchstart"
      @touchmove.prevent="touchmove"
      @touchend.prevent="touchend"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { computed, nextTick, onMounted } from '@vue/runtime-core'
const name = 'swipe'
const props = {}

function setup(props, ctx) {
  const trackRef = ref()
  const offsetX = ref(0)
  const duration = ref(0.4)
  const trackStyle = computed(() => {
    return {
      transform: `translateX(${offsetX.value}px)`,
      transition: `all ${duration.value}s ease-out`
    }
  })

  console.log(ctx)
  let clientWidth,
    startX,
    moveX,
    distance,
    startTimeStamp,
    curX = 0,
    index = 0

  const touchstart = e => {
    startTimeStamp = e.timeStamp
    startX = e.touches[0].pageX
  }

  const touchmove = e => {
    duration.value = 0
    moveX = e.touches[0].pageX
    offsetX.value = curX + (moveX - startX)
    // console.log(moveX - startX)
  }

  const touchend = e => {
    duration.value = 0.5
    const endTimeStamp = e.timeStamp
    const distance = moveX - startX
    const mod = Math.abs(offsetX.value % clientWidth)
    if (mod < clientWidth / 4 && endTimeStamp - startTimeStamp > 100) {
      offsetX.value -= mod * (offsetX.value > 0 ? 1 : -1)
    } else if (moveX) {
      index += distance > 0 ? -1 : 1
      offsetX.value = -index * clientWidth
    }
    curX = offsetX.value
    moveX = 0
  }
  onMounted(() => {
    nextTick(() => {
      console.log(ctx.slots.default()[0].el)
    })
    clientWidth = document.body.clientWidth
  })
  return { touchstart, touchmove, touchend, trackRef, trackStyle }
}

export default {
  name,
  props,
  setup
}
</script>

<style lang="less">
.swipe {
  overflow: hidden;
  height: 30vh;
  width: 100%;
  &-track {
    display: flex;
    height: 100%;
    width: 100%;
  }
  &-item.first {
    &:first-child {
      color: red;
    }
  }
}
</style>
