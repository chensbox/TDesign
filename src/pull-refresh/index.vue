<template>
  <div
    :class="bem({ 'disable-touch': modelValue })"
    @touchstart="touchstart"
    @touchmove.stop="touchmove"
    @touchend="touchend"
  >
    <div :class="bem('track')" :style="trackStyle">
      <div :class="bem('header')" v-show="slotDistance">
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
import {
  sleep,
  createNamespace,
  makeStringProp,
  makeNumericProp,
  numericProp
} from '../utils'

const [name, bem] = createNamespace('pull-refresh')

const emits = ['refresh', 'update:modelValue']

const props = {
  modelValue: Boolean,
  pullingText: makeStringProp('下拉即可刷新...'),
  loosingText: makeStringProp('释放即可刷新...'),
  loadingText: makeStringProp('加载中...'),
  successDuration: makeNumericProp(0.5),
  animationDuration: makeNumericProp(0.2),
  headHeight: makeNumericProp(50),
  pullDistance: numericProp,
  successText: String
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
    const isReachTop = !(
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      window.pageYOffset
    )
    // console.log(isReachTop)
    moveY = e.touches[0].pageY
    let distance = moveY - startY

    if (distance < 0 && isReachTop) {
      e.preventDefault()
    }

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
    bem,
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
.t-pull-refresh {
  overflow: hidden;

  &__track {
    position: relative;
    height: 100%;
    .icon-loading {
      margin-bottom: 3px;
    }
  }

  &__header {
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

  &--disable-touch {
    pointer-events: none;
  }
}
</style>
