<template>
  <div class="virtual-list">
    <slot
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      :index="index"
    />
  </div>
</template>

<script>
import { nextTick, onMounted, ref } from '@vue/runtime-core'
const name = 'VirtualList'
const emits = ['save', 'reset']
const components = {}
const props = {
  list: { type: Array, default: () => [] }
}

function setup(props, { emit }) {
  return {}
}
export default {
  name,
  emits,
  components,
  props,
  setup
}
</script>

<style lang="less"></style>
