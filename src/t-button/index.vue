<template>
  <button
    :class="classList"
    :style="style"
    @click="onClick"
    :disabled="disabled"
  >
    <icon :name="icon || loadingType" class="btn-icon" v-if="icon || loading" />
    <span class="btn-text" v-if="!loading && slot.default"><slot /></span
    ><span class="btn-text" v-if="loading && loadingText">{{
      loadingText
    }}</span>
  </button>
</template>

<script setup>
import { useSlots } from '@vue/runtime-core'
import Icon from '../icon/index.vue'
const emit = defineEmits(['click'])
const slot = useSlots()
const props = defineProps({
  color: String,
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'normal'
  },
  plain: {
    type: Boolean,
    default: false
  },
  icon: String,
  loading: Boolean,
  loadingType: String,
  loadingText: String,
  disabled: Boolean,
  square: Boolean,
  round: Boolean
})
// console.log(props.loadingType, props.loading)
const colorMap = {
  info: '#1989fa',
  warning: '#ff976a',
  danger: '#ee0a24',
  primary: '#07c160'
}
const classList = [
  't-button',
  props.type,
  props.size,
  props.disabled ? 'disabled' : '',
  props.square ? 'square' : '',
  props.round ? 'round' : ''
]
const style = { background: props.color }
if (props.plain) {
  const color = props.color ? props.color : colorMap[props.type]
  style.color = color
  style.border = `1px solid ${color}`
  style.background = '#ffffff'
}
const onClick = function (event) {
  if (props.loading) {
    return
  }
  emit('click', event)
}
</script>

<style lang="less">
.t-button {
  color: #fff;
  font-size: 16px;
  line-height: 36px;
  background-color: #f44;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn-text {
  margin: 0 2px;
  vertical-align: middle;
}

.default {
  border: 1px solid #ebedf0;
  background: #ffffff;
  color: #323233;
}
.info {
  background: #1989fa;
}
.warning {
  background: #ff976a;
}
.danger {
  background: #ee0a24;
}
.primary {
  background: #07c160;
}

.large {
  width: 100%;
  margin: 0 auto;
  padding: 5px 15px;
  font-size: 20px;
}
.normal {
  height: 42px;
  padding: 0 15px;
  line-height: 42px;
  font-size: 18px;
}
.small {
  height: 32px;
  padding: 0 8px;
  line-height: 32px;
}
.mini {
  height: 24px;
  padding: 0 4px;
  line-height: 24px;
  font-size: 10px;
}
.plain {
  color: inherit;
  background: #ffffff;
}
button:active {
  -webkit-filter: brightness(90%);
  filter: brightness(90%);
  transform: scale(0.99);
}
.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
.square {
  border-radius: 0;
}
.round {
  border-radius: 999rem;
}
</style>
