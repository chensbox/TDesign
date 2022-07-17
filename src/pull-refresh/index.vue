<template>
  <div
    :class="['pull-refresh', modelValue ? 'disable-touch' : '']"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <div class="pull-refresh-track" :style="trackStyle">
      <div class="pull-refresh-track-header">
        <slot
          v-if="!modelValue && !isDone"
          name="pulling"
          :distance="slotDistance"
        >
          <span>{{ statusText }}</span>
        </slot>
        <slot name="success">
          <span v-if="successText && isDone"> {{ successText }}</span>
        </slot>
        <slot name="loading" v-if="modelValue">
          <span> <icon name="loading" /> {{ loadingText }} </span>
        </slot>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import Icon from '../icon/index.vue'
import { ref, computed } from 'vue'
import { sleep } from '../utils'

const name = 'pull-refresh'

const emits = ['refresh', 'update:modelValue']

const props = {
  modelValue: Boolean,
  pullingText: { type: String, default: '下拉即可刷新...' },
  loosingText: { type: String, default: '释放即可刷新...' },
  loadingText: { type: String, default: '加载中...' },
  successDuration: { type: [String, Number], default: 0.5 },
  animationDuration: { type: [String, Number], default: 0.2 },
  headHeight: { type: [String, Number], default: 50 },
  pullDistance: [String, Number],
  successText: { type: String }
}

const components = { Icon }

function setup(props, { emit }) {
  const offsetY = ref(0)
  const duration = ref()
  const isDone = ref(false)
  const pullDistance = props.pullDistance ?? props.headHeight
  const trackStyle = computed(() => {
    return {
      transform: `translateY(${offsetY.value}px)`,
      transition: `all ${duration.value}s`
    }
  })
  const statusText = computed(() => {
    return offsetY.value < pullDistance ? props.pullingText : props.loosingText
  })
  const slotDistance = computed(() => {
    return offsetY.value > pullDistance ? pullDistance : offsetY.value
  })
  let startY, moveY
  const touchstart = e => (startY = e.touches[0].pageY)

  const done = async () => {
    emit('update:modelValue', false)
    if (props.successText && offsetY.value >= pullDistance) {
      isDone.value = true
      await sleep(props.successDuration * 1000)
    }
    offsetY.value = 0
    isDone.value = false
  }
  const touchmove = e => {
    moveY = e.touches[0].pageY
    let distance = moveY - startY
    if (distance < 0 && offsetY.value <= 0) {
      return
    }

    if (distance > pullDistance) {
      if (distance < pullDistance * 2) {
        distance = pullDistance + (distance - pullDistance) / 2
      } else {
        distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4
      }
    }

    duration.value = 0
    offsetY.value = Math.round(distance)
  }

  const touchend = () => {
    duration.value = props.animationDuration
    if (offsetY.value < pullDistance) {
      return done()
    }
    offsetY.value = pullDistance
    emit('update:modelValue', true)
    emit('refresh', done)
  }

  return {
    touchstart,
    touchmove,
    touchend,
    isDone,
    trackStyle,
    offsetY,
    statusText,
    slotDistance
  }
}
export default {
  name,
  components,
  props,
  emits,
  setup
}
</script>

<style lang="less">
.pull-refresh {
  overflow: hidden;
  &-track {
    position: relative;
    height: 100%;
    &-header {
      position: absolute;
      left: 0;
      top: 0;
      min-height: 50px;
      width: 100%;
      overflow: hidden;
      color: #969799;
      font-size: 14px;
      line-height: 50px;
      text-align: center;
      -webkit-transform: translateY(-100%);
      transform: translateY(-100%);
    }
    .icon-loading {
      margin-bottom: 3px;
    }
  }
  &.disable-touch {
    pointer-events: none;
  }
}
</style>
