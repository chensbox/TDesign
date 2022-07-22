<template>
  <div :class="bem()">
    <div
      :class="bem('track')"
      ref="trackRef"
      :style="trackStyle"
      @touchstart.prevent="touchstart"
      @touchmove.prevent="touchmove"
      @touchend.prevent="touchend"
    >
      <slot />
    </div>
    <div :class="bem('dot')" v-if="showIndicators">
      <div
        :class="
          bem('dot-item', {
            active: (active % 4) + 1 == i
          })
        "
        v-for="i in dotCount"
        :key="i"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { makeNumericProp, truthProp, createNamespace } from '../utils'

const [name, bem] = createNamespace('swipe')

const emits = ['change']
const props = {
  autoplay: makeNumericProp(2000),
  duration: makeNumericProp(0.5),
  loop: truthProp,
  showIndicators: truthProp
}

function setup(props, { emit }) {
  const trackRef = ref()
  const offsetX = ref(0)
  const duration = ref(props.duration)
  const active = ref(0)
  const dotCount = ref()
  const trackStyle = computed(() => {
    return {
      transform: `translateX(${offsetX.value}px)`,
      transition: `all ${duration.value}s ease-out`
    }
  })

  let clientWidth,
    startX,
    moveX,
    task,
    slotCount,
    firstSlot,
    lastSlot,
    startTimeStamp,
    endTimeStamp,
    isTouching = false,
    curX = 0,
    index = 0
  const loop = () => {
    if (isTouching || Date.now() - endTimeStamp < props.autoplay) {
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
      lastSlot.style.transform = firstSlot.style.transform = ''
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
  }

  const touchend = e => {
    const distance = moveX - startX
    const mod = Math.abs(offsetX.value % clientWidth)
    isTouching = false
    duration.value = props.duration
    endTimeStamp = e && e.timeStamp

    //滑动距离太小回弹
    if (mod < clientWidth / 4 && endTimeStamp - startTimeStamp > 100) {
      offsetX.value -= mod * (offsetX.value > 0 ? 1 : -1)
    } else if (moveX) {
      index += distance > 0 ? -1 : 1
      offsetX.value = -index * clientWidth
    }
    active.value = index == -1 ? slotCount - 1 : index
    curX = offsetX.value
    moveX = 0
    endTimeStamp = Date.now()
    emit('change', (active.value % 4) + 1)
  }
  onMounted(() => {
    dotCount.value = slotCount = trackRef.value.children.length
    firstSlot = trackRef.value.children[0]
    lastSlot = trackRef.value.children[slotCount - 1]
    clientWidth = document.body.clientWidth
    if (props.loop) {
      task = setInterval(loop, props.autoplay)
    }
  })

  onUnmounted(() => {
    clearInterval(task)
  })
  return {
    bem,
    active,
    touchend,
    trackRef,
    dotCount,
    touchmove,
    touchstart,
    trackStyle
  }
}

export default {
  name,
  props,
  emits,
  setup
}
</script>

<style lang="less">
.t-swipe {
  position: relative;
  overflow: hidden;
  height: 30vh;
  width: 100%;
  &__track {
    display: flex;
    height: 100%;
    width: 100%;
    cursor: grab;
  }
  &__dot {
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    &-item {
      user-select: none;
      margin: 0 2px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      transition: all 0.4s;
      background: rgba(235, 237, 240, 0.5);
      &--active {
        background: white;
      }
    }
  }
}
</style>
