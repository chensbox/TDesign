<template>
  <div class="dialog-warp" ref="dialogRef" v-if="attrs.modelValue">
    <div class="dialog-content">
      <h3 class="dialog-content-title"></h3>
      <div class="dialog-content-text">这是一个弹出对话框</div>
    </div>
    <div class="dialog-button">
      <button @click="handleClick('confirm')">确定</button>
      <button @click="handleClick('cancel')">取消</button>
    </div>
    <overlay :show="maskShow">{{ maskShow }}</overlay>
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import overlay from '../overlay/index.vue'
import { sleep } from '../utils'
const name = 'TDialog'
const props = {
  callback: Function
}
const emits = ['confirm', 'cancel', 'update:modelValue']
const components = { overlay }
const setup = (props, { attrs, slots, emit }) => {
  const dialogRef = ref()
  const maskShow = ref(true)
  console.log(maskShow.value)
  function handleClick(action) {
    dialogRef.value.style.opacity = 0
    if (props.callback) {
      props.callback(action)
    } else {
      emit(action)
    }
    sleep().then(() => {
      maskShow.value = false
      emit('update:modelValue', false)
    })
  }

  return {
    handleClick,
    attrs,
    dialogRef,
    maskShow
  }
}
export default {
  name,
  props,
  emits,
  components,
  setup
}
</script>

<style lang="less" scoped>
.dialog-warp {
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border: 1px solid #000;
  background: #ffff;
  transition: opacity 0.1s linear;
  animation: scaleIn 0.1s linear;
}

@keyframes scaleIn {
  0% {
    /* opacity: 0; */
    transform: translate(-50%, -50%) scale(0);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
