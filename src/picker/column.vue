<template>
  <div
    :class="bem('column')"
    @touchstart.prevent="touchstart"
    @touchmove.prevent="touchmove"
    @touchend.prevent="touchend"
  >
    <ul :class="bem('column-wrapper')" :style="scrollerStyle">
      <li
        :class="bem('column-item')"
        v-for="(item, index) in list"
        :key="index"
        :data-index="index"
      >
        {{ item.text || item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { createNamespace, makeArrayProp, numericProp } from '../utils'
import { computed, onMounted, reactive, ref, watch } from 'vue'
const [, bem] = createNamespace('picker')

const name = 't-picker-column'

const props = {
  index: numericProp,
  initialOffset: numericProp,
  itemHeight: numericProp,
  list: makeArrayProp()
}

const emits = ['columnChange']

function setup(props, { emit }) {
  const state = reactive({
    duration: '',
    offset: ''
  })
  const scrollerStyle = computed(() => ({
    transition: `all ${state.duration}s ease-out`,
    transform: `translateY(${state.offset}px)`
  }))

  let offset,
    curOffset,
    maxOffset,
    minOffset,
    startTime,
    moveOffset,
    startOffset

  const { initialOffset, itemHeight } = props

  const touchstart = e => {
    startTime = e.timeStamp
    startOffset = e.touches[0].pageY
  }

  const touchmove = event => {
    state.duration = 0
    moveOffset = event.touches[0].pageY
    offset = Math.round(curOffset + moveOffset - startOffset)
    if (offset <= maxOffset && offset >= minOffset) {
      state.offset = offset
    }
  }

  const roundOffsetByItemHeight = (mod, distance) => {
    if (mod < itemHeight / 2) {
      offset = initialOffset - (distance - mod)
    } else if (mod) {
      offset = initialOffset - (distance + (itemHeight - mod))
    }
  }

  const mockClick = e => {
    const { index } = e.target.dataset
    if (!index) {
      return
    }
    offset = initialOffset - index * itemHeight
  }

  const touchend = event => {
    state.duration = 0.2
    const distance = moveOffset - startOffset
    const isClick =
      !moveOffset ||
      (Math.abs(distance) < 10 && event.timeStamp - startTime < 100)

    if (isClick) {
      mockClick(event)
    }

    const isFastMoving =
      moveOffset && Math.abs(distance) > 70 && event.timeStamp - startTime < 300

    if (isFastMoving) {
      state.duration = 0.5
      offset = Math.round(curOffset + distance * 3)
    }

    const isUpperLimitExceeded = offset > maxOffset - itemHeight
    const isLowerLimitExceeded = offset < minOffset + itemHeight

    if (isUpperLimitExceeded) {
      offset = maxOffset - itemHeight
    } else if (isLowerLimitExceeded) {
      offset = minOffset + itemHeight
    }

    const transformY = Math.abs(initialOffset - offset)
    const MOD = transformY % itemHeight
    if (MOD !== 0) {
      roundOffsetByItemHeight(MOD, transformY)
    }

    moveOffset = 0
    curOffset = offset
    state.offset = offset
    const changeIndex = Math.abs(initialOffset - curOffset) / itemHeight
    emit('columnChange', props.list, changeIndex, props.index)
  }

  const initState = () => {
    const { initialOffset, itemHeight, list } = props
    moveOffset = 0
    state.offset = curOffset = initialOffset
    maxOffset = initialOffset + itemHeight
    minOffset = initialOffset - itemHeight * list.length
  }

  watch(props, initState)
  onMounted(initState)

  return {
    bem,
    touchend,
    touchmove,
    touchstart,
    scrollerStyle
  }
}
export default {
  name,
  props,
  emits,
  setup
}
</script>
