<template>
  <demo-block title="基础用法">
    <tabs v-model="active" lineAnimation tabAnimation swipeable>
      <tab title="标签1">22123</tab>
      <tab title="标签2">22123</tab>
      <tab title="标签3">22123</tab>
      <tab title="标签4">22123</tab>
      <tab title="标签5">22123</tab>
      <tab title="标签6">22123</tab>
      <tab title="标签7">22123</tab>
      <tab title="标签8">22123</tab>
    </tabs>
  </demo-block>
</template>

<script>
import tabs from '../index.vue';
import tab from '../../tab/index.vue';

import { defineComponent } from 'vue';
export default defineComponent({
  components: { tab, tabs },
  data() {
    return {
      active: 0,
    };
  },
});
</script>
