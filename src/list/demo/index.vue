<template>
  <tabs v-model="active" line-animation tab-animation>
    <tab title="基础用法">
      <list v-model:loading="loading" :finished="finished" @load="onLoad">
        <div class="cell" v-for="item in listdata" :key="item">{{ item }}</div>
      </list>
    </tab>
    <tab title="错误提示">
      <list
        v-model:loading="err_loading"
        v-model:error="error"
        :finished="err_finished"
        @load="err_onLoad"
      >
        <div class="cell" v-for="item in err_listdata" :key="item">
          {{ item }}
        </div>
      </list>
    </tab>
    <tab title="下拉刷新">
      <pull-refresh @refresh="refresh">
        <list
          v-model:loading="pull_loading"
          :finished="pull_finished"
          @load="pull_onLoad"
        >
          <div class="cell" v-for="item in pull_listdata" :key="item">
            {{ item }}
          </div>
        </list>
      </pull-refresh>
    </tab>
  </tabs>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import list from '../index.vue'
import tab from '../../tab/index.vue'
import tabs from '../../tabs/index.vue'
import pullRefresh from '../../pull-refresh/index.vue'
import { watch } from '@vue/runtime-core'

const active = ref(0)

const loading = ref(false)
const err_loading = ref(true)
const pull_loading = ref(true)

const error = ref(false)

const finished = ref(false)
const err_finished = ref(false)
const pull_finished = ref(false)

const listdata = ref([])
const err_listdata = ref([])
const pull_listdata = ref([])

const refresh = done => {
  setTimeout(done, 2000)
}

const onLoad = () => {
  loading.value = true
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      listdata.value.push(listdata.value.length + 1)
    }
    loading.value = false

    if (listdata.value.length >= 40) {
      finished.value = true
      return
    }
  }, 1500)
}

const err_onLoad = () => {
  err_loading.value = true
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      err_listdata.value.push(err_listdata.value.length + 1)
    }
    err_loading.value = false

    if (err_listdata.value.length >= 40) {
      err_finished.value = true
      return
    }
  }, 1500)
}

const pull_onLoad = () => {
  pull_loading.value = true
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      pull_listdata.value.push(pull_listdata.value.length + 1)
    }
    pull_loading.value = false

    if (pull_listdata.value.length >= 40) {
      pull_finished.value = true
      return
    }
  }, 1500)
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
