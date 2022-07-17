<template>
  <tabs v-model="active" line-animation tab-animation>
    <tab title="基础用法">
      <list v-model:loading="loading" v-model:error="error" @load="onLoad">
        <div class="cell" v-for="item in listdata" :key="item">{{ item }}</div>
      </list>
    </tab>
    <tab title="错误提示">
      <!-- <list></list> -->
    </tab>
    <tab title="下拉刷新">
      <!-- <pull-refresh @refresh="refresh"> -->
      <!-- <list></list> -->
      <!-- </pull-refresh> -->
    </tab>
  </tabs>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import list from '../index.vue'
import tab from '../../tab/index.vue'
import tabs from '../../tabs/index.vue'
import pullRefresh from '../../pull-refresh/index.vue'

const active = ref(0)
const loading = ref(false)
const error = ref(false)

const listdata = ref(new Array(20).fill(0).map((it, id) => id))
const refresh = done => {
  setTimeout(done, 2000)
}

const onLoad = () => {
  console.log('拉到底部了')
  for (let i = 0; i < 20; i++) {
    listdata.value.push(listdata.value.length)
  }
}
</script>

<style lang="less">
.demo-list {
  background: #fff;
  .tabs-body {
    padding: 0;
  }
  .cell {
    height: 40px;
    line-height: 40px;
    border-bottom: 0.5px solid #ebedf0;
    text-align: center;
  }
}
</style>
