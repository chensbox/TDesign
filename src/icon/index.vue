<template>
  <span :class="[classMap.get(name)]" :style="{ 'font-size': sizeMap[size] }" />
</template>

<script setup>
import { reactive } from '@vue/reactivity'

const classMap = reactive(
  new Map([
    ['loading', 'icon-loading loading'],
    ['close', 'icon-close'],
    ['attachment', 'icon-attachment'],
    ['camera', 'icon-camera '],
    ['arrow-right', 'icon-arrow-right'],
    ['bottom', 'icon-bottom'],
    ['add', 'icon-add'],
    ['ashbin', 'icon-ashbin'],
    ['down', 'icon-down ']
  ])
)
const sizeMap = reactive({
  mini: '16px',
  default: '30px',
  middle: '50px'
})
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'default'
  }
})
</script>

<style lang="less" scoped>
@import 'style.css';
.loading {
  display: inline-block;
  font-size: 18px;
  color: rgb(236, 232, 232);
  animation: rotate 2s infinite linear;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
