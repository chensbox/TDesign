<template>
  <popup
    :class="bem()"
    :round="round"
    position="bottom"
    :closeable="closeable"
    :modelValue="modelValue"
    @update:modelValue="close"
  >
    <slot>
      <div :class="bem('description')" v-if="description">
        {{ description }}
      </div>
      <div :class="bem('content')">
        <button
          v-for="(item, index) in actions"
          :key="index"
          :class="
            bem('item', {
              loading: item.loading,
              disabled: item.disabled
            })
          "
          @click="onClickAction(item, index)"
        >
          <template v-if="!item.loading">
            <span :class="bem('name')" :style="{ color: item.color }">
              {{ item.name }}
            </span>
            <p :class="bem('subname')" v-if="item.subname">
              {{ item.subname }}
            </p>
          </template>

          <template v-else>
            <icon name="loading"></icon>
          </template>
        </button>
      </div>
      <button :class="bem('cancel')" v-if="cancelText" @click="onClickAction">
        {{ cancelText }}
      </button>
    </slot>
  </popup>
</template>

<script>
import { ref, onUnmounted, watchEffect } from 'vue'
import Icon from '../icon/index.vue'
import Popup from '../popup/index.vue'
import { truthProp, makeArrayProp, createNamespace } from '../utils'

const [name, bem] = createNamespace('action-sheet')
const props = {
  modelValue: Boolean,
  closeable: Boolean,
  overlay: Boolean,
  title: String,
  description: String,
  cancelText: String,
  beforeClose: Function,
  round: truthProp,
  safeAreainsetBottom: truthProp,
  closeOnClickAction: truthProp,
  actions: makeArrayProp()
}
const components = { Popup, Icon }

function setup(props, { emit }) {
  const close = async (item, index) => {
    const { beforeClose } = props
    if (beforeClose) {
      const res = await beforeClose(item, index)
      if (!res) return
    }
    emit('update:modelValue', false)
  }

  const onClickAction = (item, index) => {
    const { disabled, loading } = item
    const { closeOnClickAction } = props
    if (disabled || loading) {
      return
    }

    emit('select', item, index)
    if (closeOnClickAction) {
      close(item, index)
    }
  }

  watchEffect(() => {
    const { modelValue } = props
    emit(modelValue ? 'open' : 'close')
  })

  window.addEventListener('popstate', close)
  onUnmounted(() => {
    window.removeEventListener('popstate', close)
  })

  return {
    bem,
    close,
    onClickAction
  }
}

export default {
  name,
  props,
  components,
  setup
}
</script>

<style lang="less" scoped>
.t-action-sheet {
  min-height: 0;
  &__item {
    display: block;
    padding: 14px 16px;
    font-size: 16px;
    width: 100%;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    border: none;
    background: #fff;
    &--disabled {
      cursor: not-allowed;
      opacity: 0.6;
      color: #c8c9cc;
      &:active {
        background: #fff !important;
      }
    }
    &--loading {
      color: #c8c9cc;
      cursor: default;
      &:active {
        background: #fff !important;
      }
    }
    &:active {
      background: #f2f3f5;
    }
  }
  &__subname {
    margin-top: 8px;
    color: #969799;
    font-size: 12px;
    line-height: 18px;
  }
  &__cancel {
    width: 100%;
    padding: 14px 16px;
    font-size: 16px;
    background-color: #fff;
    border-top: 8px solid #f7f8fa;
    border-width: 8px 0 0 0;
    cursor: pointer;
    &:active {
      background: #f2f3f5;
    }
  }

  &__description {
    display: block;
    position: relative;
    padding: 20px 16px;
    color: #969799;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    border: none;

    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 16px;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid #ebedf0;
      transform: scaleY(0.5);
    }
  }
}
</style>
