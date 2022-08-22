<template>
  <div :class="bem()">
    <slot></slot>
  </div>
</template>

<script>
import { provide } from 'vue'
import { createNamespace } from '../utils'

const [name, bem] = createNamespace('collapse')
const props = {
  modelValue: [Number, String, Array],
  accordion: Boolean
}

function setup(props) {
  const toggle = () => {}
  const isExpanded = () => {}

  provide('COLLAPSE', { toggle, isExpanded })
  return { bem }
}
export default { name, props, setup }
</script>
