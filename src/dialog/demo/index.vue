<template>
  <!-- <demo-block title="组件用法">
    <dialog text="组件调用" :show="show"></dialog>
    <button @click="cpnClick">组件调用</button>
  </demo-block>

  <demo-block title="函数调用">
    <button @click="onClick">函数调用</button>
  </demo-block> -->

  <demo-block title="函数调用">
    <button @click="onClick">函数调用</button>
  </demo-block>
  <demo-block title="函数调用">
    <button @click="onClick">函数调用</button>
  </demo-block>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { dialog } from '../index'
import { toast } from '../../toast'
const show = ref(false)
function onClick() {
  dialog({
    text: '函数调用'
  })
    .then(() => {
      toast({ text: '点击了确定', show: true })
    })
    .catch(() => {
      toast({ text: '点击了取消', show: true })
    })
}
function cpnClick() {
  show.value = !show.value
}
</script>
