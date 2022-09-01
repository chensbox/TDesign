<template>
  <demo-block title="基础用法">
    <pagination
      v-model="page"
      :total-items="100"
      :items-per-page="5"
    ></pagination>
  </demo-block>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import pagination from '../index.vue'

let page = ref(1)
</script>
