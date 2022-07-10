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
          offsetY > 50 ? '释放即可刷新...' : '下拉即可刷新...'
        }}</span>
        <span v-else><icon name="loading" /> 加载中...</span>
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

const props = {}
const components = { Icon }
function setup(props, { emit }) {
  const offsetY = ref(0)
  const duration = ref(0)
  const isLoading = ref(false)
  const trackStyle = computed(() => {
    return {
      transform: `translateY(${offsetY.value}px)`,
      transition: `all ${duration.value}s`
    }
  })
  let curY = 0,
    startY,
    moveY
  const touchstart = e => (startY = e.touches[0].pageY)
  const done = () => {
    offsetY.value = 0
    isLoading.value = false
  }
  const touchmove = e => {
    duration.value = 0
    moveY = e.touches[0].pageY
    let distance = moveY - startY

    if (distance < 0 && offsetY.value <= 0) {
      return
    }

    if (distance > 70) {
      if (distance < 70 * 2) {
        distance = 70 + (distance - 70) / 2
      } else {
        distance = 70 * 1.5 + (distance - 70 * 2) / 4
      }
    }

    offsetY.value = Math.round(distance)
  }
  const touchend = e => {
    isLoading.value = true
    if (offsetY.value < 50) {
      duration.value = 0.2
      return done()
    }
    duration.value = 0.2
    offsetY.value = 50
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
