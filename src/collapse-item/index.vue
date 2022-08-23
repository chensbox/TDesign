<template>
  <div :class="bem()">
    <div :class="bem('title')" @click="onclick">{{ title }}</div>
    <div :class="bem('wrapper')" ref="wrapper" :style="{ height }">
      <div :class="bem('content')" ref="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, watch, computed, nextTick, onMounted } from 'vue'
import { createNamespace, makeNumericProp } from '../utils'
const props = {
  title: String,
  name: makeNumericProp()
}
const [name, bem] = createNamespace('collapse-item')
function setup(props) {
  const parent = inject('COLLAPSE')
  const wrapper = ref()
  const content = ref()
  const height = ref('0')
  console.log(parent)
  const expanded = computed(() => parent.isExpanded(props.name))
  watch(expanded, (newValue, oldValue) => {
    const { offsetHeight } = content.value
    const contentHeitht = `${offsetHeight}px`
    height.value = newValue ? contentHeitht : '0'
  })

  const toggle = (newValue = !expanded.value) => {
    parent.toggle(props.name, newValue)
  }
  const onclick = () => toggle()
  onMounted(() => {
    const { offsetHeight } = content.value
    const contentHeitht = `${offsetHeight}px`
    height.value = expanded.value ? contentHeitht : '0'
    setTimeout(() => {
      wrapper.value.style.transition = 'height 0.25s ease-out'
    })
  })
  return { bem, wrapper, content, onclick, height }
}
export default {
  name,
  props,
  setup
}
</script>

<style lang="less">
.t-collapse-item {
  &__title {
    padding: 0 10px;
    line-height: 40px;
    background: #fff;
  }
  &__wrapper {
    overflow: hidden;
    height: 0;
    will-change: height;
  }
  &__content {
    padding: 30px 10px;
    border: 1px solid #ccc;
    border-width: 1px 0 1px 0;
    background: #fff;
  }
}
</style>
