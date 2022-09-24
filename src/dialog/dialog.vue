<template>
  <transition name="slide-fade" appear>
    <div :class="bem()" v-if="modelValue">
      <div :class="bem('content')">
        <p :class="bem('title')">{{ title }}</p>
        <div :class="bem('text')">
          <slot>
            {{ message }}
          </slot>
        </div>
      </div>

      <div :class="bem('footer', { 'button-border': showComfirmButton })">
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
          v-if="showComfirmButton"
          :class="bem('comfirm-button')"
          square
          loading-type="loading"
          :loading="comfirmLoading"
          @click="onClick('comfirm')"
          >{{ comfirmButtonText }}</t-button
        >
      </div>
    </div>
  </transition>
  <overlay :show="modelValue && overlay"></overlay>
</template>

<script>
import { computed, ref } from 'vue'
import overlay from '../overlay/index.vue'
import TButton from '../button/index.vue'
import { createNamespace, makeStringProp, truthProp, falseProp } from '../utils'

const [name, bem] = createNamespace('dialog')

const props = {
  callback: Function,
  modelValue: Boolean,
  title: String,
  message: String,
  beforClose: Function,
  overlay: truthProp,
  showComfirmButton: truthProp,
  showCancelButton: falseProp,
  comfirmButtonText: makeStringProp('确认'),
  cancelButtonText: makeStringProp('取消')
}

const emits = ['comfirm', 'cancel', 'update:modelValue']

const components = { overlay, TButton }

function setup(props, { emit }) {
  const loading = ref(false)
  const comfirmLoading = computed(() => loading.value === 'comfirm')
  const cancelLoading = computed(() => loading.value === 'cancel')

  const onClick = action => {
    if (loading.value) {
      return
    }

    if (props.beforClose) {
      loading.value = action
      return props.beforClose(action, close.bind(null, action))
    }

    close(action)
  }

  const close = action => {
    loading.value = false

    if (props.callback) {
      props.callback(action)
    }

    emit(action)
    emit('update:modelValue', false)
  }

  return {
    bem,
    onClick,
    comfirmLoading,
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
  &__comfirm-button {
    color: #165dff;
  }
  &__cancel-button {
    flex: 1;
    color: #333 !important;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>
