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

function setup(props, { emit, expose }) {
  const toggle = (name, expand) => {
    let newValue
    const { modelValue, accordion } = props
    if (accordion) {
      newValue = modelValue === name ? '' : name
    } else if (expand) {
      newValue = modelValue.concat(name)
    } else {
      newValue = modelValue.filter(n => n !== name)
    }

    emit('update:modelValue', newValue)
  }
  const isExpanded = name => {
    const { modelValue, accordion } = props
    if (accordion) {
      return name === modelValue
    }
    return modelValue.includes(name)
  }
  const childState = Object.create(null)
  const updateState = (name, state) => {
    childState[name] = state
  }
  provide('COLLAPSE', { toggle, isExpanded, updateState })

  const toggleAll = expand => {
    if (props.accordion) {
      return
    }
    const newValue = []
    const names = Object.keys(childState)
    if (expand === undefined) {
      for (const name in childState) {
        !childState[name] && newValue.push(name)
      }
      return emit('update:modelValue', newValue)
    }

    if (expand) {
      emit('update:modelValue', names)
    } else {
      emit('update:modelValue', newValue)
    }
  }

  expose({ toggleAll })

  return { bem }
}
export default { name, props, setup }
</script>
