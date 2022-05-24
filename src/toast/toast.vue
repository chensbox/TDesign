<template>
  <div class="toast" ref="toastRef">{{ text }}</div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from '@vue/runtime-core'
const name = 'toast'
const props = {
  size: Number,
  text: {
    type: String,
    default: 'default test~~'
  },
  show: {
    type: Boolean,
    default: false
  }
}

export default {
  name,
  props
}
</script>

<style lang="less" scoped>
.toast {
  height: 30px;
  width: 100px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  line-height: 30px;
  text-align: center;
  transform: translate(-50%, -50%);
  transition: opacity 0.25s ease-in;
  animation: fade-in 0.25s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
