<template>
  <transition :name="animation">
    <div :class="bem({ round, [position]: true })" v-show="modelValue">
      <icon
        name="close"
        class="close-icon"
        :style="iconPositon"
        size="20px"
        v-if="closeable"
        @click="onclick"
      />
      <template v-if="shouldRender">
        <slot></slot>
      </template>
      <overlay :show="modelValue" @click="onclick" />
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue'
import overlay from '../overlay/index.vue'
import icon from '../icon/index.vue'
import {
  makeStringProp,
  createNamespace,
  useLazyRender,
  truthProp
} from '../utils'
const [name, bem] = createNamespace('popup')
const components = { overlay, icon }
const props = {
  modelValue: Boolean,
  round: Boolean,
  closeable: Boolean,
  lazyRender: truthProp,
  position: makeStringProp('center'),
  closeIconPosition: makeStringProp('top-right')
}
const emits = ['close']

const animationMap = {
  center: 'fade-in',
  bottom: 'slide-fade-bottom',
  top: 'slide-fade-top',
  left: 'slide-fade-left',
  right: 'slide-fade-right'
}
const setup = (props, { emit }) => {
  const animation = ref('')
  const iconPositon = {}

  if (props.closeable) {
    iconPositon.color = '#c8c9cc'
    iconPositon['font-weight'] = 'bold'

    if (props.closeIconPosition) {
      const [ordinate, abscissa] = props.closeIconPosition.split('-')
      iconPositon[ordinate] = '10px'
      iconPositon[abscissa] = '15px'
    }
  }

  animation.value = animationMap[props.position]

  const { shouldRender } = useLazyRender(() => {
    return props.modelValue || !props.lazyRender
  })
  const onclick = () => emit('update:modelValue', false)

  return { bem, animation, shouldRender, iconPositon, onclick }
}

export default {
  name,
  components,
  emits,
  props,
  setup
}
</script>

<style lang="less" scoped>
.t-popup {
  overflow: hidden;
  position: fixed;
  z-index: 100;
  min-width: 150px;
  min-height: 120px;
  background: #fff;

  &--center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &--top {
    left: 0;
    top: 0;
    width: 100%;
  }
  &--left {
    left: 0;
    top: 0;
    height: 100%;
  }
  &--bottom {
    left: 0;
    bottom: 0;
    width: 100%;
  }
  &--right {
    right: 0;
    top: 0;
    height: 100%;
  }

  &--round {
    border-radius: 16px 16px 0 0;
  }
}

.close-icon {
  z-index: 100;
  position: absolute;
  cursor: pointer;
  color: '#c8c9cc' !important;
}

.fade-in-enter-active,
.fade-in-leave-active,
.slide-fade-bottom-enter-active,
.slide-fade-bottom-leave-active,
.slide-fade-top-enter-active,
.slide-fade-top-leave-active,
.slide-fade-left-enter-active,
.slide-fade-left-leave-active,
.slide-fade-right-enter-active,
.slide-fade-right-leave-active {
  transition: all 0.25s ease-out;
}

.slide-fade-bottom-enter-from,
.slide-fade-bottom-leave-to {
  transform: translateY(100%);
}

.slide-fade-top-enter-from,
.slide-fade-top-leave-to {
  transform: translateY(-100%);
}
.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
  transform: translateX(-100%);
}
.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  transform: translateX(100%);
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 1;
}
</style>
