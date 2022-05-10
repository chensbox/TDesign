<template>
  <demo-block title="组件用法">
    <toast text="组件调用" :show="show"></toast>
    <button @click="cpnClick">组件调用</button>
  </demo-block>

  <demo-block title="函数调用">
    <button @click="onClick">函数调用</button>
  </demo-block>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { toast } from '../index'
const show = ref(false)
function onClick() {
  toast({
    text: '函数调用',
    show: true
  })
}
function cpnClick() {
  show.value = !show.value
}
</script>
