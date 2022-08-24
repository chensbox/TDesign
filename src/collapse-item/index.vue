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
import icon from '../icon/index.vue'
import { ref, inject, watch, computed, nextTick, onMounted } from 'vue'
import { createNamespace, makeNumericProp } from '../utils'
const props = {
  title: String,
  name: makeNumericProp()
}
const components = { icon }
const [name, bem] = createNamespace('collapse-item')
function setup(props) {
  const parent = inject('COLLAPSE')
  const wrapper = ref()
  const content = ref()
  const height = ref('0')
  console.log(parent)
  const expanded = computed(() => parent.isExpanded(props.name))

  const setWrapperHeight = () => {
    const { offsetHeight } = content.value
    const contentHeitht = `${offsetHeight}px`
    height.value = expanded.value ? contentHeitht : '0'
    parent.updateState(props.name, expanded.value)
  }
  watch(expanded, () => setWrapperHeight())

  const toggle = (newValue = !expanded.value) => {
    parent.toggle(props.name, newValue)
  }

  const onclick = () => toggle()

  onMounted(() => {
    setWrapperHeight()
    setTimeout(() => (wrapper.value.style.transition = 'height 0.25s ease-out'))
  })

  return {
    bem,
    height,
    wrapper,
    content,
    onclick
  }
}
export default {
  name,
  components,
  props,
  setup
}
</script>

<style lang="less">
.t-collapse-item {
  &__title {
    padding: 0 10px;
    line-height: 40px;
    border: 1px solid #ccc;
    border-width: 0px 0 0.5px 0;
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
    border-width: 0px 0 0.5px 0;
    background: #fff;
  }
}
</style>
