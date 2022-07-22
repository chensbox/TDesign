<script>
import { createNamespace, makeStringProp, falseProp } from '../utils'
import Icon from '../icon/index.vue'

const [name, bem] = createNamespace('button')

const props = {
  type: makeStringProp('primary'),
  size: makeStringProp('normal'),
  plain: falseProp,
  color: String,
  icon: String,
  loading: Boolean,
  loadingType: String,
  loadingText: String,
  disabled: Boolean,
  square: Boolean,
  round: Boolean
}

const emits = ['click']

const components = { Icon }

const colorMap = {
  info: '#1989fa',
  warning: '#ff976a',
  danger: '#ee0a24',
  primary: '#07c160'
}

function setup(props, { slots, emit }) {
  const style = { background: props.color }

  if (props.plain) {
    const color = props.color ? props.color : colorMap[props.type]
    style.color = color
    style.border = `1px solid ${color}`
    style.background = '#ffffff'
    style['line-height'] = 0
  }

  const onClick = event => {
    if (props.loading) {
      return
    }
    emit('click', event)
  }

  return {
    bem,
    style,
    slots,
    onClick
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

<template>
  <button
    :class="
      bem({
        [type]: type,
        [size]: size,
        disabled,
        square,
        round
      })
    "
    :style="style"
    @click="onClick"
    :disabled="disabled"
  >
    <icon :name="icon || loadingType" class="btn-icon" v-if="icon || loading" />
    <span :class="{ 'btn-text': icon }" v-if="!loading && slots.default">
      <slot />
    </span>
    <span class="btn-text" v-if="loading && loadingText">
      {{ loadingText }}
    </span>
  </button>
</template>

<style lang="less">
.t-button {
  color: #fff;
  font-size: 16px;
  line-height: 100%;
  background-color: #f44;
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;

  &--default {
    border: 1px solid #ebedf0;
    background: #ffffff;
    color: #323233;
  }
  &--info {
    background: #1989fa;
  }
  &--warning {
    background: #ff976a;
  }
  &--danger {
    background: #ee0a24;
  }
  &--primary {
    background: #07c160;
  }

  &--large {
    height: 50px;
    width: 100%;
    padding: 5px 15px;
    font-size: 20px;
  }
  &--normal {
    height: 42px;
    padding: 0 15px;
    font-size: 16px;
  }
  &--small {
    height: 32px;
    padding: 0 8px;
  }
  &--mini {
    height: 24px;
    padding: 0 4px;
    font-size: 10px;
  }

  &--square {
    border-radius: 0;
  }
  &--round {
    border-radius: 999rem;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    &:active {
      filter: brightness(100%) !important;
    }
  }

  &:active {
    filter: brightness(90%);
  }
}

.btn-text {
  margin: 0 2px;
  vertical-align: middle;
}

* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
</style>
