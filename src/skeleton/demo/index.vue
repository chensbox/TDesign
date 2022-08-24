<template>
  <button @click="loading = !loading">切换</button>
  <demo-block title="基础用法">
    <skeleton :loading="loading" row="3" :row-width="['100%', '100%', '100%']">
      NIMAMA
    </skeleton>
  </demo-block>
</template>
<script setup>
import { ref } from 'vue'
import skeleton from '../index.vue'

const loading = ref(false)
</script>

<style lang="less">
.demo-skeleton {
  background: #fff;
}
</style>
