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
    ['loading-spinner', 'icon icon-loading-spinner loading'],
    ['check', 'icon icon-check '],
    ['github-fill', 'icon icon-github-fill '],
    ['info-circle', 'icon icon-info-circle '],
    ['left', 'icon icon-left '],
    ['location', 'icon icon-location '],
    ['question-circle', 'icon icon-question-circle '],
    ['right', 'icon icon-right '],
    ['search', 'icon icon-search '],
    ['setting', 'icon icon-setting '],
    ['up', 'icon icon-up '],
    ['user', 'icon icon-user ']
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
  color: inherit;
  line-height: 100%;
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
  // font-weight: inherit;
  line-height: 100%;
  display: inline-block;
}
</style>
