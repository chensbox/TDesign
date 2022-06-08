<template>
  <transition :name="animation">
    <div class="popup" v-show="modelValue" :style="style">
      <icon
        name="close"
        class="close-icon"
        :style="iconPositon"
        size="20px"
        v-if="closeable"
        @click="onclick"
      />
      <template v-if="lazyLoad">
        <slot />
      </template>
      <overlay :show="modelValue" @click="onclick" />
    </div>
  </transition>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import overlay from '../overlay/index.vue'
import icon from '../icon/index.vue'
import { watchEffect } from '@vue/runtime-core'
const components = { overlay, icon }
const props = {
  modelValue: Boolean,
  position: String,
  round: Boolean,
  closeable: Boolean,
  closeIconPosition: { type: String, default: 'top-right' }
}
const emits = ['close']
//top bottom right left
const setup = (props, { emit }) => {
  const animation = ref('slide-fade-bottom')
  const style = reactive({})
  const iconPositon = reactive({})
  const lazyLoad = ref()
  if (!props.position) {
    animation.value = 'fade-in'
    style.left = '50%'
    style.top = '50%'
    style.transform = 'translate(-50%, -50%)'
  }

  if (props.position == 'bottom') {
    style.left = '0px'
    style.bottom = '0px'
    style.width = '100%'
    animation.value = 'slide-fade-bottom'
  }
  if (props.position == 'top') {
    style.left = '0px'
    style.top = '0px'
    style.width = '100%'
    animation.value = 'slide-fade-top'
  }
  if (props.position == 'left') {
    style.left = '0px'
    style.top = '0px'
    style.height = '100%'
    animation.value = 'slide-fade-left'
  }
  if (props.position == 'right') {
    style.right = '0px'
    style.top = '0px'
    style.height = '100%'
    animation.value = 'slide-fade-right'
  }
  if (props.round) {
    style['border-radius'] = '16px 16px 0 0 '
  }

  if (props.closeable) {
    iconPositon.color = '#c8c9cc'
    iconPositon['font-weight'] = 'bold'

    if (props.closeIconPosition) {
      const [ordinate, abscissa] = props.closeIconPosition.split('-')
      iconPositon[ordinate] = '10px'
      iconPositon[abscissa] = '15px'
    }
  }
  const stop = watchEffect(() => {
    if (props.modelValue) {
      lazyLoad.value = props.modelValue
      stop()
    }
  })
  const onclick = event => {
    emit('update:modelValue', false)
  }
  return { style, animation, iconPositon, lazyLoad, onclick }
}
export default {
  components,
  props,
  setup
}
</script>

<style lang="less" scoped>
.popup {
  overflow: hidden;
  position: fixed;
  z-index: 100;
  min-width: 150px;
  min-height: 120px;
  background: #fff;
}

.close-icon {
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
