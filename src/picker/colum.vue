<template>
  <div
    class="picker-columns-col"
    @touchstart.prevent="touchstart"
    @touchmove.prevent="touchmove"
    @touchend.prevent="touchend"
  >
    <ul class="picker-columns-col-wrap" :style="scrollerStyle">
      <li
        class="picker-columns-col-wrap-item"
        v-for="(li, i) in list"
        :key="i + 1"
      >
        {{ li.text || li }}
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from '@vue/runtime-core'

const name = 'colum'

const props = {
  index: Number,
  initY: Number,
  itemHeight: Number,
  list: Array
}

const emits = ['columChange']

const setup = function (props, { emit }) {
  const duration = ref()
  const offsetY = ref()
  const scrollerStyle = computed(() => {
    return {
      transition: `all ${duration.value}s ease-out`,
      transform: `translateY(${offsetY.value}px)`
    }
  })
  let startY, moveY, curY, maxY, minY, toY, startTime

  const touchstart = e => {
    startTime = e.timeStamp
    startY = e.touches[0].pageY
  }

  const touchmove = e => {
    duration.value = 0
    moveY = e.touches[0].pageY
    toY = Math.round(curY + moveY - startY) //浮点数会影响渲染速度
    if (toY <= maxY && toY >= minY) {
      offsetY.value = toY
    }
  }

  const roundByItmeHeight = (m, distance) => {
    if (m < props.itemHeight >> 1) {
      toY = props.initY - (distance - m)
    } else if (m) {
      toY = props.initY - (distance + (props.itemHeight - m))
    }
  }

  const mockClickByTouch = e => {
    const index = e.target.__vnode.key
    if (!index) {
      return
    }
    toY = props.initY - (index - 1) * props.itemHeight
  }

  const touchend = e => {
    duration.value = 0.2
    const distance = moveY - startY

    const isClickEvent =
      !moveY || (Math.abs(distance) < 10 && e.timeStamp - startTime < 100)

    if (isClickEvent) {
      mockClickByTouch(e)
    }

    const isFastMoving =
      moveY && Math.abs(distance) > 70 && e.timeStamp - startTime < 300

    if (isFastMoving) {
      duration.value = 0.5
      toY = Math.round(curY + distance * 3)
    }

    const isUpperLimitExceeded = toY > maxY - props.itemHeight
    const isLowerLimitExceeded = toY < minY + props.itemHeight

    if (isUpperLimitExceeded) {
      toY = maxY - props.itemHeight
    } else if (isLowerLimitExceeded) {
      toY = minY + props.itemHeight
    }

    const transformY = Math.abs(props.initY - toY)
    const MOD = transformY % props.itemHeight
    if (MOD !== 0) {
      roundByItmeHeight(MOD, transformY)
    }

    moveY = 0
    curY = toY
    offsetY.value = toY
    const changeIndex = Math.abs(props.initY - curY) / props.itemHeight
    emit('columChange', props.list, changeIndex, props.index)
  }

  watch(props, () => {
    maxY = props.initY + props.itemHeight
    minY = props.initY - props.itemHeight * props.list.length

    offsetY.value = props.initY
  })

  onMounted(() => {
    curY = props.initY
    offsetY.value = props.initY
    maxY = props.initY + props.itemHeight
    minY = props.initY - props.itemHeight * props.list.length
    moveY = 0
  })

  return {
    scrollerStyle,
    touchstart,
    touchmove,
    touchend
  }
}
export default {
  name,
  props,
  emits,
  setup
}
</script>
