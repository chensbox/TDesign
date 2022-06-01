<template>
  <transition name="slide-fade" appear>
    <div class="toast" ref="toastRef">
      <span>{{ state.message }}</span>
    </div>
  </transition>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
const name = 'toast'
const props = {
  duration: Number,
  message: String,
  forbidClick: Boolean,
  success: Boolean,
  fail: Boolean,
  loadingType: String,
  close: Function
}
const setup = (props, context) => {
  const state = reactive({
    show: true,
    message: props.message
  })
  console.log(props.close)
  setTimeout(() => {
    props.close()
  }, 5000)
  return { state }
}
export default {
  name,
  props,
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
  border-radius: 5px;
  line-height: 30px;
  text-align: center;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 0.25s ease-in;
  color: white;
  background: rgba(0, 0, 0, 0.7);
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
