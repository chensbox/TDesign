<template>
  <tabs v-model="active" line-animation tab-animation>
    <tab title="基础用法">
      <List></List>
    </tab>
    <tab title="错误提示">
      <List></List>
    </tab>
    <tab title="下拉刷新">
      <PullRefresh @refresh="refresh">
        <List></List>
      </PullRefresh>
    </tab>
  </tabs>
</template>

<script setup>
import { ref } from '@vue/reactivity'

import list from '../index.vue'
import tab from '../../tab/index.vue'
import tabs from '../../tabs/index.vue'
import pullRefresh from '../../pull-refresh/index.vue'
import PullRefresh from '../../pull-refresh/index.vue'
import List from '../index.vue'
const active = ref(0)

const refresh = done => {
  setTimeout(done, 2000)
}
</script>

<style lang="less">
.demo-list {
  background: #fff;
  .tabs-body {
    padding: 0;
  }
}
</style>
