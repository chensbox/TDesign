<template>
  <button
    :class="['t-button', type, size, disabled ? 'disabled' : '']"
    :style="style"
    @click="onClick"
    :disabled="disabled"
  >
    <icon :name="icon || loadingType" class="btn-icon" v-if="icon || loading" />
    <span class="btn-text" v-if="!loading"><slot /></span>
    <span class="btn-text" v-if="loading && loadingText">{{
      loadingText
    }}</span>
  </button>
</template>

<script setup>
import Icon from '../icon/index.vue'
const emit = defineEmits(['click'])
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
  disabled: Boolean
})
// console.log(props.loadingType, props.loading)
const colorMap = {
  info: '#1989fa',
  warning: '#ff976a',
  danger: '#ee0a24',
  primary: '#07c160'
}
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
  padding: 0 15px;
  font-size: 18px;
}
.small {
  height: 32px;
  padding: 0 8px;
  line-height: 0;
}
.mini {
  padding: 4px 2px;
  line-height: 12px;
  font-size: 12px;
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
  opacity: 0.7;
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
