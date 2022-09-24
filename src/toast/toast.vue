<template>
  <transition name="slide-fade" appear>
    <div :class="bem({ padding: !!icon })" v-if="modelValue">
      <icon :name="icon" :class="bem('icon')" v-if="icon" />
      <p>{{ message }}</p>
      <overlay transparent :show="forbidClick && modelValue" />
    </div>
  </transition>
</template>

<script>
import { watch } from 'vue'
import { createNamespace, makeNumericProp, falseProp } from '../utils'
import icon from '../icon/index.vue'
import overlay from '../overlay/index.vue'

const [name, bem] = createNamespace('toast')

const components = { icon, overlay }

const props = {
  modelValue: falseProp,
  message: String,
  position: String,
  icon: String,
  duration: makeNumericProp(2000),
  forbidClick: falseProp,
  loadingType: makeNumericProp('circle')
}

let timer
function setup(props, { emit }) {
  const close = () => emit('close')

  if (props.duration) {
    timer = setTimeout(close, props.duration)
  }

  watch(props, () => {
    clearTimeout(timer)
    if (props.modelValue && props.duration > 0) {
      timer = setTimeout(close, props.duration)
    }
  })
  return { bem }
}
export default {
  name,
  props,
  components,
  setup
}
</script>

<style lang="less" scoped>
.t-toast {
  z-index: 1000;
  position: fixed;
  left: 50%;
  top: 50%;
  min-height: 30px;
  min-width: 100px;
  padding: 5px 10px;
  border-radius: 10px;
  line-height: 30px;
  text-align: center;
  pointer-events: none;
  user-select: none;
  transform: translate(-50%, -50%);
  color: #ffff;

  // background: #4a4a4b;
  background: rgba(0, 0, 0, 0.7);
  &__icon {
    margin-bottom: 5px;
    font-size: 40px !important;
  }
  &--padding {
    padding: 20px 10px;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
