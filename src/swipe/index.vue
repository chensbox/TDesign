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
import { computed, nextTick, onMounted, onUnmounted } from '@vue/runtime-core'
const name = 'swipe'
const props = {}

function setup(props, { slots }) {
  const trackRef = ref()
  const offsetX = ref(0)
  const duration = ref(0.4)
  const trackStyle = computed(() => {
    return {
      transform: `translateX(${offsetX.value}px)`,
      transition: `all ${duration.value}s ease-out`
    }
  })

  let clientWidth,
    startX,
    moveX,
    distance,
    slotCount,
    firstSlot,
    lastSlot,
    startTimeStamp,
    endTimeStamp,
    task,
    isTouching = false,
    curX = 0,
    index = 0

  const join = index => {
    if (index == 0) {
      lastSlot.style.transform = `translateX(${clientWidth * -slotCount}px)`
    } else if (index == slotCount - 1) {
      firstSlot.style.transform = `translateX(${clientWidth * slotCount}px)`
    } else {
      // firstSlot.style.transform = `translateX(0px)`
      // lastSlot.style.transform = `translateX(0px)`
    }
  }
  const touchstart = e => {
    isTouching = true
    startTimeStamp = e.timeStamp
    startX = e.touches[0].pageX
  }

  const touchmove = e => {
    duration.value = 0
    moveX = e.touches[0].pageX
    offsetX.value = curX + (moveX - startX)
  }

  const touchend = e => {
    isTouching = false
    duration.value = 0.5
    endTimeStamp = e.timeStamp

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
    endTimeStamp = Date.now()
    join(index)

    // setTimeout(() => {
    //   if (curX == clientWidth) {
    //     // duration.value = 0
    //     curX = offsetX.value = (slotCount - 1) * -clientWidth
    //     lastSlot.style.transform = `translateX(0px)`
    //     index = 3
    //   }
    //   if (curX == clientWidth * -slotCount) {
    //     duration.value = 0
    //     curX = offsetX.value = 0
    //     firstSlot.style.transform = `translateX(0px)`
    //     index = 0
    //   }
    // }, 0)
  }
  onMounted(() => {
    slotCount = trackRef.value.children.length
    firstSlot = trackRef.value.children[0]
    lastSlot = trackRef.value.children[slotCount - 1]
    clientWidth = document.body.clientWidth
    console.log(firstSlot, lastSlot)

    // task = setInterval(() => {
    //   if (isTouching || Date.now() - endTimeStamp < 3000) {
    //     return
    //   }

    //   index += index == 3 ? -3 : 1
    //   curX = offsetX.value = -index * clientWidth
    // }, 3000)
    join(0)
  })

  onUnmounted(() => {
    clearInterval(task)
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
