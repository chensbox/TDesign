<template>
  <span :class="[classMap.get(name)]" :style="{ 'font-size': size }" />
</template>

<script setup>
import { reactive } from '@vue/reactivity'

const classMap = reactive(
  new Map([
    ['loading', 'icon icon-loading loading'],
    ['close', 'icon icon-close'],
    ['attachment', 'icon icon-attachment'],
    ['camera', 'icon icon-camera '],
    ['arrow-right', 'icon icon-arrow-right'],
    ['bottom', 'icon icon-bottom'],
    ['add', 'icon icon-add'],
    ['ashbin', 'icon icon-ashbin'],
    ['down', 'icon icon-down '],
    ['loading-spinner', 'icon icon-loading-spinner loading']
  ])
)

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'inherit'
  }
})
</script>

<style lang="less" scoped>
@import 'style.css';
.loading {
  display: inline-block;
  // color: rgb(236, 232, 232);
  color: inherit;
  animation: rotate 2s infinite linear;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
.icon {
  vertical-align: middle;
  font-size: inherit;
  // font-size: 180px;
}
</style>
