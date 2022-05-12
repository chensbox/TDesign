<template>
  <div class="dialog-warp" v-if="show" ref="dialogRef">
    <div class="dialog-content">
      <h3 class="dialog-content-title"></h3>
      <div class="dialog-content-text">这是一个弹出对话框</div>
    </div>
    <div class="dialog-button">
      <button @click="handleClick('confirm')">确定</button>
      <button @click="handleClick('cancel')">取消</button>
    </div>
  </div>
</template>

<script>
const props = {
  callback: Function,
  show: {
    type: Boolean,
    default: true
  }
}
import { reactive, ref } from '@vue/reactivity'

const setup = (props, context) => {
  const show = ref(true)
  const dialogRef = ref()
  console.log(dialogRef)
  function handleClick(action) {
    dialogRef.value.style.opacity = 0
    setTimeout(() => {
      show.value = false
    }, 100)
    props.callback(action)
  }

  return {
    handleClick,
    show,
    dialogRef
  }
}
export default {
  name: 'TDialog',
  props,
  setup
}
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
