<template>
  <popup
    round
    position="bottom"
    :class="bem()"
    :modelValue="modelValue"
    @update:modelValue="close"
  >
    <div :class="bem('description')">{{ description }}</div>
    <div :class="bem('content')">
      <button
        v-for="(item, index) in actions"
        :key="index"
        :class="bem('item')"
      >
        <span :class="bem('name')">{{ item.name }}</span>
        <p :class="bem('subname')" v-if="item.subname">{{ item.subname }}</p>
      </button>
    </div>
    <button :class="bem('cancel')" v-if="cancelText">{{ cancelText }}</button>
  </popup>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import Popup from '../popup/index.vue'
import { falseProp, truthProp, makeArrayProp, createNamespace } from '../utils'

const [name, bem] = createNamespace('action-sheet')
const props = {
  modelValue: Boolean,
  closeable: Boolean,
  round: Boolean,
  overlay: Boolean,
  title: String,
  description: String,
  cancelText: String,
  beforeClose: Function,
  safeAreainsetBottom: truthProp,
  closeOnClickAction: falseProp,
  actions: makeArrayProp()
}
const components = { Popup }

function setup(props, { emit }) {
  const updateModelValue = event => {
    emit('update:modelValue', event)
  }

  const close = () => updateModelValue(false)

  window.addEventListener('popstate', close)
  onUnmounted(() => {
    window.removeEventListener('popstate', close)
  })

  return {
    bem,
    close
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
      &:active {
        //filter: brightness(100%) !important;
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
    background: #fff;

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
