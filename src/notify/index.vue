<template>
  <transition appear>
    <div :class="bem()" v-if="modelValue">消息通知</div>
  </transition>
</template>

<script>
import { ref, watch } from 'vue'
import { createNamespace } from '../utils'
const [name, bem] = createNamespace('notify ')
const emits = ['update:modelValue']
const props = {
  modelValue: Boolean
}
function setup(props, { emit }) {
  let timer
  const close = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      emit('update:modelValue', false)
    }, 2000)
  }
  watch(
    () => props.modelValue,
    val => val && close(),
    { immediate: true }
  )
  return { bem }
}
export default {
  name,
  emits,
  props,
  setup
}
</script>

<style lang="less">
.t-notify {
  position: fixed;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
  background: #ee0a24;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-100%);
}
</style>
