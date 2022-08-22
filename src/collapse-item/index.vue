<template>
  <div :class="bem()">{{ name }}</div>
</template>

<script>
import { inject } from 'vue'
import { createNamespace, makeNumericProp } from '../utils'
const props = {
  name: makeNumericProp()
}
const [name, bem] = createNamespace('collapse-item')
function setup(props) {
  const parent = inject('COLLAPSE')
  console.log(parent)
  return { bem }
}
export default {
  name,
  props,
  setup
}
</script>
