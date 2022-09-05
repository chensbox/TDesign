<template>
  <transition name="slide-fade">
    <div :class="bem()" ref="dialogRef" v-show="modelValue">
      <div :class="bem('content')">
        <p :class="bem('title')">{{ title }}</p>
        <div :class="bem('text')">
          <slot>
            {{ message }}
          </slot>
        </div>
      </div>

      <div :class="bem('footer', { 'button-border': showConfirmButton })">
        <t-button
          v-if="showCancelButton"
          :class="bem('cancel-button')"
          square
          loading-type="loading"
          :loading="cancelLoading"
          @click="onClick('cancel')"
        >
          {{ cancelButtonText }}
        </t-button>

        <t-button
          v-if="showConfirmButton"
          :class="bem('confirm-button')"
          square
          loading-type="loading"
          :loading="confirmLoading"
          @click="onClick('confirm')"
          >{{ confirmButtonText }}</t-button
        >
      </div>
    </div>
  </transition>

  <overlay :show="modelValue && overlay"></overlay>
</template>

<script>
import { ref } from 'vue'
import overlay from '../overlay/index.vue'
import TButton from '../button/index.vue'
import {
  createNamespace,
  makeStringProp,
  sleep,
  truthProp,
  falseProp
} from '../utils'

const [name, bem] = createNamespace('dialog')

const props = {
  callback: Function,
  modelValue: Boolean,
  title: String,
  message: String,
  beforClose: Function,
  overlay: truthProp,
  showConfirmButton: truthProp,
  showCancelButton: falseProp,
  confirmButtonText: makeStringProp('确认'),
  cancelButtonText: makeStringProp('取消')
}

const emits = ['confirm', 'cancel', 'update:modelValue']

const components = { overlay, TButton }

function setup(props, { emit }) {
  const dialogRef = ref()
  const confirmLoading = ref(false)
  const cancelLoading = ref(false)

  function onClick(action) {
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
      props.callback(action)
    } else {
      emit(action)
    }
    sleep().then(() => {
      emit('update:modelValue', false)
    })
  }

  return {
    bem,
    onClick,
    dialogRef,
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
.t-dialog {
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
  // transition: opacity 0.2s ease-out;
  // animation: scaleIn 0.2s ease-out;
  &__content {
    padding: 20px;
  }
  &__text {
    max-height: 50vh;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
  }
  &__title {
    font-weight: 400;
    margin-bottom: 10px;
    text-align: center;
  }
  &__footer {
    display: flex;
    border-top: 0.5px solid #ebedf0;
    &--button-border {
      .t-button:last-child {
        border-left: 0.5px solid #ebedf0;
      }
    }
    .t-button {
      flex: 1;
      height: 45px;
      background: #fff;
    }
  }
  &__confirm-button {
    color: red;
  }
  &__cancel-button {
    flex: 1;
    color: #333 !important;
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
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.7);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>
