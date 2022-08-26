<template>
  <popup
    round
    position="bottom"
    :class="bem()"
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
  >
    <div :class="bem('content')"></div>
  </popup>
</template>

<script>
import { ref } from 'vue'
import Popup from '../popup/index.vue'
import { createNamespace } from '../utils'

const [name, bem] = createNamespace('action-sheet')
const props = {
  modelValue: Boolean
}
const components = { Popup }

function setup(props, { emit }) {
  const updateModelValue = event => {
    emit('update:modelValue', event)
  }
  return {
    bem,
    updateModelValue
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
}
</style>
