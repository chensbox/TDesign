<template>
  <div :class="bem()">
    <cell
      :class="bem('title', { expanded })"
      :title="title"
      @click="onclick"
    ></cell>
    <div :class="bem('wrapper')" ref="wrapper" :style="{ height }">
      <div :class="bem('content')" ref="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import cell from '../cell/index.vue'
import { ref, inject, watch, computed, nextTick, onMounted } from 'vue'
import { createNamespace, numericProp } from '../utils'
const props = {
  name: numericProp,
  title: String
}
const components = { cell }
const [name, bem] = createNamespace('collapse-item')
function setup(props) {
  const parent = inject('COLLAPSE')
  const wrapper = ref()
  const content = ref()
  const height = ref('0')
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
    onclick,
    expanded
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
    background: #fff;
    .icon {
      transition: all 0.2s;
      transform: rotate(0deg);
    }
    &--expanded {
      .icon {
        transform: rotate(90deg);
      }
    }
  }
  &__wrapper {
    overflow: hidden;
    height: 0;
    will-change: height;
  }
  &__content {
    position: relative;
    padding: 15px;
    font-size: 14px;
    color: #969799;
    line-height: 1.5;
    background: #fff;
    &::after {
      position: absolute;
      box-sizing: border-box;
      pointer-events: none;
      bottom: 0;
      left: 50%;
      transform: scaleY(0.5) translateX(-50%);
      width: 92%;
      height: 1px;
      background: #ebedf0;
      content: ' ';
    }
  }
}
</style>
