<template>
  <div :class="bem()">
    <slot></slot>
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import { createNamespace } from '../utils'

const [name, bem] = createNamespace('collapse')
const props = {
  modelValue: [Number, String, Array],
  accordion: Boolean
}

function setup(props, { emit }) {
  const toggle = (name, expanded) => {
    let newValue
    const { modelValue } = props
    if (expanded) {
      newValue = modelValue.concat(name)
    } else {
      newValue = modelValue.filter(n => n !== name)
    }
    emit('update:modelValue', newValue)
  }
  const isExpanded = name => {
    const { modelValue } = props
    return modelValue.includes(name)
  }
  const childNames = []
  const activeList = ref(props.modelValue)
  provide('COLLAPSE', { toggle, isExpanded, childNames, activeList })
  return { bem }
}
export default { name, props, setup }
</script>
