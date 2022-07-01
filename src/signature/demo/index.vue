<template>
  <demo-block title="基础用法">
    <cell-group>
      <cell title="自定义画笔" @click="show = true"></cell>
    </cell-group>
    <signature :line-width="width" :color="color"></signature>

    <popup v-model="show" position="bottom">
      <picker
        :colums="colum"
        title="设置线宽和颜色"
        @change="onChange"
        @cancel="show = false"
        @confirm="show = false"
      ></picker
    ></popup>
  </demo-block>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import cellGroup from '../../cell-group/index.vue'
import cell from '../../cell/index.vue'
import popup from '../../popup/index.vue'
import signature from '../index.vue'
import picker from '../../picker/index.vue'
const width = ref(5)
const color = ref('black')
const show = ref(false)
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
