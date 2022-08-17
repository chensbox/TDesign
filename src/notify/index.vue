<template>
  <transition appear>
    <div :class="bem()" v-if="modelValue">{{ message }}</div>
  </transition>
</template>

<script>
import { ref, watch } from 'vue'
import { createNamespace, makeNumericProp, makeStringProp } from '../utils'
const [name, bem] = createNamespace('notify ')
const emits = ['update:modelValue']
const props = {
  modelValue: Boolean,
  type: makeStringProp('danger'),
  message: String,
  color: String,
  background: String,
  onOpened: Function,
  onClose: Function,
  duration: makeNumericProp(2000)
}
function setup(props, { emit }) {
  return { bem }
}
export default {
  name,
  emits,
  props,
  setup
}
</script>

<style lang="less" scoped>
.t-notify {
  position: fixed;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
  text-align: center;
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
