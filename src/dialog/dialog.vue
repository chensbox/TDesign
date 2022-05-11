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
  console.log(dialogRef, '>>>>>>>>')
  setTimeout(() => {
    show.value = false
  }, 1000)
  // props.callback(action)

  setTimeout(props.callback, 0, action)
}
console.log(props)
</script>

<style lange="less" scoped>
.dialog-warp {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border: 1px solid #000;
  background: #ffff;
  /* animation: test 0.2s linear; */
}

@keyframes test {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
