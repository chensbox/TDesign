<template>
  <div
    class="picker-columns-col"
    @touchstart.prevent="touchstart"
    @touchmove.prevent="touchmove"
    @touchend.prevent="touchend"
  >
    <ul class="picker-columns-col-wrap" ref="scrollerRef">
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
import { onMounted, ref } from '@vue/runtime-core'
const setPositon = (y, el, duration = 0) => {
  el.value.style.transition = `all ${duration}s ease-out`
  el.value.style.transform = `translateY(${y}px)`
}
const name = 'colum'

const props = {
  initY: Number,
  itemHeight: Number,
  list: Array
}

const emits = ['change']

const setup = function (props, { emit }) {
  const scrollerRef = ref()
  let startY, moveY, curY, maxY, minY, toY, startTime

  const touchstart = e => {
    startTime = e.timeStamp
    startY = e.touches[0].pageY
  }

  const touchmove = e => {
    moveY = e.touches[0].pageY
    toY = Math.round(curY + moveY - startY) //浮点数会影响渲染速度
    if (toY <= maxY && toY >= minY) {
      setPositon(toY, scrollerRef)
    }
  }

  const touchend = e => {
    let duration = 0.2
    if (!moveY) {
      const index = e.target.__vnode.key
      if (!index) {
        return
      }
      toY = props.initY - (index - 1) * props.itemHeight
    }

    // 启用惯性加速
    if (moveY > 50 && e.timeStamp - startTime < 300) {
      toY -= curY
      toY *= 3
      toY += curY
      duration = 0.5
    }

    //超出极限距离Y坐标修正
    if (toY > maxY - props.itemHeight) {
      toY = maxY - props.itemHeight
    } else if (toY < minY + props.itemHeight) {
      toY = minY + props.itemHeight
    }

    const distance = Math.abs(props.initY - toY)
    const m = distance % props.itemHeight

    if (m < props.itemHeight >> 1) {
      toY = props.initY - (distance - m)
    } else {
      toY = props.initY - (distance + (props.itemHeight - m))
    }

    setPositon(toY, scrollerRef, duration)
    curY = toY
    moveY = 0
    const index = Math.abs(props.initY - curY)
  }

  onMounted(() => {
    curY = props.initY
    scrollerRef.value.style.transform = `translateY(${props.initY}px)`
    maxY = props.initY + props.itemHeight
    minY = props.initY - props.itemHeight * props.list.length
  })

  return {
    scrollerRef,
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
