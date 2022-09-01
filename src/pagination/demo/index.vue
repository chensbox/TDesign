<template>
  <demo-block title="基础用法">
    <pagination
      v-model="page"
      :total-items="24"
      :items-per-page="5"
    ></pagination>
  </demo-block>
</template>

<script setup>
import pagination from '../index.vue'

let page = 1
</script>
