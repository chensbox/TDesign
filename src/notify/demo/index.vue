<template>
  <demo-block title="基础用法">
    <t-notify v-model="show"></t-notify>

    <button @click="onclick">toggle</button>
  </demo-block>

  <demo-block title="函数调用">
    <button @click="functionCall">调用</button>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue'
import TNotify from '../index.vue'
import { notify } from '..'
const show = ref(false)
function onclick() {
  show.value = true
}
function functionCall() {
  const app = notify({ message: 'nih' })
}
</script>

<style></style>
