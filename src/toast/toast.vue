<template>
  <transition name="slide-fade" appear>
    <div class="toast" ref="toastRef" :style="style">
      <icon
        :name="state.icon"
        class="toast-icon"
        v-if="showLoading || state.icon"
      />
      <p>{{ state.message }}</p>
      <overlay :transparent="true" :show="forbidClick" />
    </div>
  </transition>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { sleep } from '../utils'
import { onMounted } from '@vue/runtime-core'
import icon from '../icon/index.vue'
import overlay from '../overlay/index.vue'

const name = 'toast'

const components = { icon, overlay }

const props = {
  success: Boolean,
  fail: Boolean,
  destroy: Function,
  position: String,
  showLoading: Boolean,
  icon: String,
  duration: { type: Number, default: 2000 },
  message: { type: String, require: true },
  forbidClick: { type: Boolean, default: false },
  loadingType: { type: String, default: 'circle' }
}

const setup = (props, { expose }) => {
  const style = reactive({})
  const state = reactive({
    message: props.message,
    icon: props.icon
  })
  const toastRef = ref()

  const close = () => {
    if (toastRef.value) {
      toastRef.value.style.opacity = 0
      sleep(250).then(props.destroy)
    }
  }

  if (props.showLoading || props.icon.value) {
    style.padding = '25px 15px'
  }

  onMounted(() => {
    if (props.duration > 0) {
      sleep(props.duration).then(close)
    }
  })

  expose({ close })
  return { state, toastRef, style }
}
export default {
  name,
  props,
  components,
  setup
}
</script>

<style lang="less" scoped>
.toast {
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
  transition: opacity 0.25s ease-in;
  color: #ffff;
  // background: rgba(0, 0, 0, 0.7);
  background: #4a4a4b;

  &-icon {
    margin-bottom: 5px;
    font-size: 40px !important;
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
