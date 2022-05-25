<template>
  <demo-block title="函数调用">
    <t-button @click="onClick">函数调用</t-button>
  </demo-block>
</template>

<script setup>
import TButton from '../../t-button/index.vue'

import { toast } from '../index'
function onClick() {
  toast({
    text: '函数调用'
  })
}
</script>
