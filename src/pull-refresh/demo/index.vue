<template>
  <tabs v-model="active" line-animation>
    <tab title="基础用法">
      <pull-refresh v-model="isLoading" class="demo-pull" @refresh="refresh">
        <p>下拉刷新次数:{{ count }}</p>
      </pull-refresh>
    </tab>
    <tab title="成功提示">
      <pull-refresh class="demo-pull" v-model="isLoading" @refresh="onRefresh">
        <p>下拉刷新次数:{{ count2 }}</p>
      </pull-refresh>
    </tab>
    <tab title="自定义提示">
      <pull-refresh class="demo-pull">
        <p>下拉试试</p>
      </pull-refresh>
    </tab>
  </tabs>
</template>

<script setup>
import tabs from '../../tabs/index.vue'
import tab from '../../tab/index.vue'
import PullRefresh from '../index.vue'
import { Toast } from '../../toast/index'
import { ref } from '@vue/reactivity'
import { sleep } from '../../utils'
const active = ref(0)
const count = ref(0)
const count2 = ref(0)
const isLoading = ref(false)
const refresh = done => {
  sleep(2000).then(() => {
    console.log('done')
    done()
    count.value++

    isLoading.value = false
  })
}
const onRefresh = function (done) {
  sleep(2000).then(() => {
    done()
    isLoading.value = false
    count2.value++
    Toast('刷新成功')
  })
}
</script>

<style lang="less">
.demo-pull-refresh {
  padding-bottom: 0;
}
.demo-pull {
  height: calc(100vh - 95px);
}
.tabs-body {
  padding: 0;
}

.demo-pull-refresh {
  p {
    line-height: 50px;
    margin-left: 20px;
  }
}
</style>
