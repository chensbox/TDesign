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
    slotCount,
    firstSlot,
    lastSlot,
    startTimeStamp,
    endTimeStamp,
    task,
    loopTimeOut,
    isTouching = false,
    curX = 0,
    index = 0
  const loop = () => {
    if (isTouching || Date.now() - endTimeStamp < 2400) {
      return
    }
    startX = clientWidth + 1
    moveX = clientWidth

    //人为调用touch事件函数模拟向右滑动
    touchstart()
    setTimeout(touchend) //必须在在下一轮事件循环触发
  }
  const join = () => {
    if (index == 0) {
      lastSlot.style.transform = `translateX(${clientWidth * -slotCount}px)`
    } else if (index == slotCount - 1) {
      firstSlot.style.transform = `translateX(${clientWidth * slotCount}px)`
    } else {
      lastSlot.style.transform = firstSlot.style.transform = ''
    }
  }
  const touchstart = e => {
    isTouching = true
    if (e) {
      startTimeStamp = e.timeStamp
      startX = e.touches[0].pageX
    }
    fixed()
    join()
  }
  const fixed = () => {
    if (curX == clientWidth || curX == clientWidth * -slotCount) {
      duration.value = 0
      firstSlot.style.transform = `translateX(0px)`
      lastSlot.style.transform = `translateX(0px)`
    }
    if (curX == clientWidth) {
      curX = offsetX.value = (slotCount - 1) * -clientWidth
      index = slotCount - 1
    }
    if (curX == clientWidth * -slotCount) {
      curX = offsetX.value = 0
      index = 0
    }
  }
  const touchmove = e => {
    duration.value = 0
    moveX = e.touches[0].pageX
    offsetX.value = curX + (moveX - startX)
    // clearInterval(task)
    // clearTimeout(loopTimeOut)
  }

  const touchend = e => {
    const distance = moveX - startX
    const mod = Math.abs(offsetX.value % clientWidth)
    isTouching = false
    duration.value = 0.5
    endTimeStamp = e && e.timeStamp

    //滑动距离太小回弹
    if (mod < clientWidth / 4 && endTimeStamp - startTimeStamp > 100) {
      offsetX.value -= mod * (offsetX.value > 0 ? 1 : -1)
    } else if (moveX) {
      index += distance > 0 ? -1 : 1
      offsetX.value = -index * clientWidth
    }

    curX = offsetX.value
    moveX = 0
    endTimeStamp = Date.now()
    // task = setInterval(loop, 1400)
    // setTimeout(fixed, 400)
    // fixed()
  }
  onMounted(() => {
    slotCount = trackRef.value.children.length
    firstSlot = trackRef.value.children[0]
    lastSlot = trackRef.value.children[slotCount - 1]
    clientWidth = document.body.clientWidth
    // console.log(firstSlot, lastSlot)

    task = setInterval(loop, 2400)
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
