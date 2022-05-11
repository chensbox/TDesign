<template>
  <div class="dialog-warp" v-if="show" ref="dialogRef">
    <div class="dialog-content">
      <h3 class="dialog-content-title">标题</h3>
      <div class="dialog-content-text">这是一个弹出对话框</div>
    </div>
    <div class="dialog-button">
      <button @click="handleClick('confirm')">确定</button>
      <button @click="handleClick('cancel')">取消</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { nextTick } from '@vue/runtime-core'
const show = ref(true)
const props = defineProps({
  callback: Function
})
const dialogRef = ref()
function handleClick(action) {
  dialogRef.value.style.opacity = 0
  setTimeout(() => {
    show.value = false
  }, 100)
  props.callback(action)

  // setTimeout(props.callback, 200, action)
}
console.log(props)
</script>

<style lang="less" scoped>
.dialog-warp {
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
