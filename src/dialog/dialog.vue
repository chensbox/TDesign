<template>
  <div class="dialog-warp" ref="dialogRef" v-show="modelValue">
    <div class="dialog-content">
      <h3 class="dialog-content-title">{{ title }}</h3>
      <div class="dialog-content-text">
        <slot>
          {{ message }}
        </slot>
      </div>
    </div>
    <div class="dialog-button" :class="{ 'button-border': type == 'confirm' }">
      <t-button
        v-if="type == 'confirm'"
        class="dialog-button-cancel"
        square
        loading-type="loading"
        :loading="cancelLoading"
        @click="handleClick('cancel')"
        >取消</t-button
      >
      <t-button
        class="dialog-button-confirm"
        square
        loading-type="loading"
        :loading="confirmLoading"
        @click="handleClick('confirm')"
        >确定</t-button
      >
    </div>
    <overlay :show="modelValue && maskShow"></overlay>
  </div>
</template>

<script>
import { ref, toRef, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import overlay from '../overlay/index.vue'
import TButton from '../button/index.vue'
import { sleep } from '../utils'
const name = 'TDialog'
const props = {
  callback: Function,
  modelValue: Boolean,
  title: String,
  message: String,
  beforClose: Function,
  type: { type: String, default: 'alert' }
}
const emits = ['confirm', 'cancel', 'update:modelValue']
const components = { overlay, TButton }
const setup = (props, { attrs, slots, emit }) => {
  const dialogRef = ref()
  const maskShow = ref(true)
  const confirmLoading = ref(false)
  const cancelLoading = ref(false)
  function handleClick(action) {
    // dialogRef.value.style.opacity = 0
    if (confirmLoading.value || cancelLoading.value) {
      return
    }
    if (props.beforClose) {
      if (action == 'confirm') {
        confirmLoading.value = true
      } else {
        cancelLoading.value = true
      }
      return props.beforClose(action, close.bind(null, action))
    }
    close(action)
  }

  function close(action) {
    confirmLoading.value = false
    cancelLoading.value = false
    if (props.callback) {
      maskShow.value = false
      props.callback(action)
    } else {
      emit(action)
    }
    sleep().then(() => {
      emit('update:modelValue', false)
    })
  }

  return {
    handleClick,
    dialogRef,
    maskShow,
    confirmLoading,
    cancelLoading
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
  overflow: hidden;
  box-sizing: border-box;
  z-index: 100;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 320px;
  border-radius: 16px;
  transform: translate(-50%, -50%);
  background: #fff;
  transition: opacity 0.2s ease-out;
  animation: scaleIn 0.2s ease-out;
  .dialog-content {
    padding: 20px;
    &-text {
      max-height: 50vh;
      font-size: 14px;
      line-height: 20px;
      white-space: pre-wrap;
      text-align: center;
      word-wrap: break-word;
    }
    &-title {
      font-weight: 400;
      margin-bottom: 10px;
      text-align: center;
    }
  }
  .dialog-button {
    display: flex;
    border-top: 0.5px solid #ebedf0;
    .t-button {
      flex: 1;
      height: 45px;
      background: #fff;
    }
    &-confirm {
      color: red;
    }
    &-cancel {
      flex: 1;
      color: #333;
    }
  }
}
.button-border {
  .t-button:last-child {
    border-left: 0.5px solid #ebedf0;
  }
}
@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
