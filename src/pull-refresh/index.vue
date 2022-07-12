<template>
  <div
    :class="['pull-refresh', isLoading ? 'disable-touch' : '']"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <div class="pull-refresh-track" :style="trackStyle">
      <div class="pull-refresh-track-header">
        <span v-if="!isLoading">{{
          offsetY > 50 ? loosingText : pullingText
        }}</span>
        <span v-else><icon name="loading" /> {{ loadingText }}</span>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script>
import Icon from '../icon/index.vue'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

const name = 'pull-refresh'

const emits = ['refresh']

const props = {
  pullingText: { type: String, default: '下拉即可刷新...' },
  loosingText: { type: String, default: '释放即可刷新...' },
  loadingText: { type: String, default: '加载中...' },
  successText: { type: String, default: '刷新成功' },
  successDuration: { type: [String, Number], default: 0.2 },
  animationDuration: { type: [String, Number], default: 0.2 },
  headHeight: { type: [String, Number], default: 50 },
  pullDistance: [String, Number]
}

const components = { Icon }

function setup(props, { emit }) {
  const offsetY = ref(0)
  const duration = ref(+props.animationDuration)
  const isLoading = ref(false)
  const pullDistance = props.pullDistance ?? props.headHeight
  const trackStyle = computed(() => {
    return {
      transform: `translateY(${offsetY.value}px)`,
      transition: `all ${duration.value}s`
    }
  })
  let startY, moveY
  const touchstart = e => (startY = e.touches[0].pageY)
  const done = () => {
    offsetY.value = 0
    isLoading.value = false
  }
  const touchmove = e => {
    moveY = e.touches[0].pageY
    let distance = moveY - startY
    if (distance < 0 && offsetY.value <= 0) {
      return
    }
    duration.value = 0

    if (distance > pullDistance) {
      if (distance < pullDistance * 2) {
        distance = pullDistance + (distance - pullDistance) / 2
      } else {
        distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4
      }
    }

    offsetY.value = Math.round(distance)
  }

  const touchend = () => {
    isLoading.value = true
    if (offsetY.value < pullDistance) {
      duration.value = props.animationDuration
      return done()
    }
    duration.value = props.animationDuration
    offsetY.value = pullDistance
    emit('refresh', done)
  }
  return { touchstart, touchmove, touchend, trackStyle, offsetY, isLoading }
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
      width: 100%;
      height: 50px;
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
