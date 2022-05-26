<template>
  <div class="toast" ref="toastRef">
    <span>{{ state.text }}</span>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
const name = 'toast'
const props = {
  size: Number,
  text: {
    type: String,
    default: 'default test~~'
  }
}

export default {
  name,
  props,
  setup(props, context) {
    const state = reactive({
      show: true,
      text: props.text
    })
    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  height: 30px;
  width: 100px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
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
