<template>
  <demo-block title="基础用法">
    <signature :line-width="width" :color="color"></signature>
    <picker :colums="colum" title="设置画笔" @change="onChange"></picker>
  </demo-block>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import signature from '../index.vue'
import picker from '../../picker/index.vue'
const width = ref(5)
const color = ref('blue')

const colum = [
  // 第一列
  {
    values: ['2', '4', '6', '8', '10'],
    defaultIndex: 2
  },
  // 第二列
  {
    values: ['red', 'blue', 'black'],
    defaultIndex: 1
  }
]

const onChange = e => {
  console.log(e)
  width.value = e[0]
  color.value = e[1]
}
</script>
