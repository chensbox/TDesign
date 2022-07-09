<template>
  <div
    class="pull-refresh"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <div class="pull-refresh-track" :style="trackStyle">
      <div class="pull-refresh-track-header">
        <span v-if="!modelValue">{{
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
import { sleep } from '../utils'
const name = 'pull-refresh'
const emits = ['update:modelValue', 'refresh']

const props = {
  modelValue: Boolean
}
const components = { Icon }
function setup(props, { emit }) {
  const offsetY = ref(0)
  const duration = ref(0)
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
  const done = () => (offsetY.value = 0)
  const touchmove = e => {
    duration.value = 0
    moveY = e.touches[0].pageY
    if (moveY - startY < 0 || props.modelValue) {
      return
    }
    const distance = moveY - startY
    offsetY.value = distance
    console.log(moveY)
  }
  const touchend = async e => {
    if (props.modelValue) {
      return
    }

    if (offsetY.value < 50) {
      duration.value = 0.2
      return done()
    }
    duration.value = 0.2
    offsetY.value = 50
    emit('update:modelValue', true)
    emit('refresh', done)
  }
  return { touchstart, touchmove, touchend, trackStyle, offsetY }
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
}
</style>
