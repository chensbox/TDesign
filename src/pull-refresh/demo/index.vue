<template>
  <tabs v-model="active" line-animation>
    <tab title="基础用法">
      <pull-refresh class="demo-pull" @refresh="refresh" v-model="loading1">
        <p>下拉刷新次数:{{ count }}</p>
      </pull-refresh>
    </tab>
    <tab title="成功提示">
      <pull-refresh
        class="demo-pull"
        @refresh="onRefresh"
        success-text="刷新成功"
        v-model="loading2"
      >
        <p>下拉刷新次数:{{ count2 }}</p>
      </pull-refresh>
    </tab>
    <tab title="自定义提示">
      <pull-refresh
        class="demo-pull"
        :head-height="80"
        @refresh="onRefresh2"
        v-model="loading3"
      >
        <template #pulling="props">
          <img
            class="doge"
            src="https://img01.yzcdn.cn/vant/doge.png"
            :style="{ transform: `scale(${props.distance / 80})` }"
          />
        </template>

        <template #loading>
          <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg" />
        </template>
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
const loading1 = ref(false)
const loading2 = ref(false)
const loading3 = ref(false)

const refresh = done => {
  sleep(2000).then(() => {
    done()
    count.value++
    Toast('刷新成功')
  })
}
const onRefresh = function (done) {
  sleep(2000).then(() => {
    done()
    count2.value++
    Toast('刷新成功')
  })
}
const onRefresh2 = function (done) {
  sleep(2000).then(() => {
    done()
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
  padding: 0 !important;
}

.demo-pull-refresh {
  p {
    line-height: 50px;
    margin-left: 20px;
  }
}
.doge {
  line-height: 0;
  display: block;
  margin: 0 auto;
  border-radius: 10px;
  height: 80px;
}
</style>
