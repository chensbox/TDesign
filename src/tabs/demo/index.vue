<template>
  <demo-block title="基础用法">
    <tabs v-model="active" lineAnimation tabAnimation swipeable>
      <tab title="标签1">标签1内容区</tab>
      <tab title="标签2">标签2内容区</tab>
      <tab title="标签3">标签3内容区</tab>
      <tab title="标签4">标签4内容区</tab>
      <tab title="标签5">标签5内容区</tab>
      <tab title="标签6">标签6内容区</tab>
      <tab title="标签7">标签7内容区</tab>
      <tab title="标签8">标签8内容区</tab>
    </tabs>
  </demo-block>
</template>

<script setup>
import tabs from '../index.vue';
import tab from '../../tab/index.vue';
import { ref } from '@vue/reactivity';
const active = ref(0);
</script>
