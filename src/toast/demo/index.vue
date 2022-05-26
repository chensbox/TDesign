<template>
  <demo-block title="函数调用">
    <t-button @click="onClick">函数调用</t-button>
  </demo-block>
</template>

<script setup>
import TButton from '../../t-button/index.vue'

import { Toast } from '../index'
function onClick() {
  Toast({
    text: '函数调用'
  })
}
</script>
