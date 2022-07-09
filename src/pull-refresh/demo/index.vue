<template>
  <demo-block title="基础用法">
    <tabs v-model="active">
      <tab title="dfd">df</tab>
      <tab title="dfd">df</tab>
      <tab title="dfd">df</tab>
    </tabs>
    <pull-refresh></pull-refresh>
  </demo-block>
</template>

<script setup>
import tabs from '../../tabs/index.vue'
import tab from '../../tab/index.vue'
import PullRefresh from '../index.vue'
import { ref } from '@vue/reactivity'
console.log(tab, tabs)
const active = ref(0)
</script>
