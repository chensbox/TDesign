<template>
  <demo-block title="基础图标">
    <h1 @click="reset">css module test</h1>
    <icon name="loading" size="50px"></icon>

    <icon name="close" size="50px"></icon>

    <icon name="attachment" size="50px"></icon>

    <icon name="camera" size="50px"></icon>

    <icon name="arrow-right" size="50px"></icon>

    <icon name="bottom" size="50px"></icon>

    <icon name="ashbin" size="50px"></icon>

    <icon name="down" size="50px"></icon>

    <icon name="loading-spinner" size="50px"></icon>

    <icon name="check" size="50px"></icon>

    <icon name="check-circle" size="50px"></icon>

    <icon name="close-circle" size="50px"></icon>

    <icon name="github-fill" size="50px"></icon>

    <icon name="info-circle" size="50px"></icon>

    <icon name="left" size="50px"></icon>

    <icon name="question-circle" size="50px"></icon>

    <icon name="right" size="50px"></icon>

    <icon name="search" size="50px"></icon>

    <icon name="setting" size="50px"></icon>

    <icon name="up" size="50px"></icon>

    <icon name="user" size="50px"></icon>
    <icon name="setting" size="50px"></icon>

    <icon name="setting" size="50px"></icon>

    <icon name="setting" size="50px"></icon>

    <t-button type="danger" size="mini">按钮</t-button>
    <t-button type="danger" size="mini">按钮</t-button>
    <t-button type="info" icon="setting" round>按钮</t-button>
  </demo-block>
</template>

<script setup>
import TButton from '../../button/index.vue'
import { ref } from '@vue/reactivity'
import icon from '../index.vue'

let red = ref('red')

function reset() {
  const { value } = red
  if (value == 'pink') {
    red.value = 'red'
  } else {
    red.value = 'pink'
  }
}
</script>

<style lange="less" scoped>
h1 {
  color: v-bind(red);
}
</style>
