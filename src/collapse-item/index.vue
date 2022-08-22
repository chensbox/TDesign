<template>
  <div :class="bem()">
    <div :class="bem('title')" @click="onclick">{{ title }}</div>
    <div :class="bem('wrapper')" ref="wrapper" :style="{ height }">
      <div :class="bem('content')">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import { createNamespace, makeNumericProp } from '../utils'
const props = {
  title: String,
  name: makeNumericProp()
}
const [name, bem] = createNamespace('collapse-item')
function setup(props) {
  const parent = inject('COLLAPSE')
  const wrapper = ref()
  console.log(parent)
  const height = ref('')
  const onclick = () => {
    console.log(1)
    // wrapper.value.style.height = wrapper.value.style.height === '' ? '0px' : ''
    height.value = height.value === '' ? '0px' : ''
  }
  return { bem, wrapper, onclick, height }
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
    transition: height 0.4s ease-in-out;
  }
  &__content {
    padding: 30px 10px;
    border: 1px solid #ccc;
    border-width: 1px 0 1px 0;
    background: #fff;
  }
}
</style>
