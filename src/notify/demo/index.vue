<template>
  <demo-block title="基础用法">
    <cell-group>
      <cell title="基础用法" @click="functionCall('基础用法')" />
    </cell-group>
  </demo-block>

  <demo-block title="通知类型">
    <cell-group>
      <cell title="主要通知" @click="functionCall('主要通知', 'primary')" />
      <cell title="成功通知" @click="functionCall('成功通知', 'success')" />
      <cell title="危险通知" @click="functionCall('危险通知', 'danger')" />
      <cell title="警告通知" @click="functionCall('警告通知', 'warning')" />
    </cell-group>
  </demo-block>

  <demo-block title="自定义配置">
    <cell-group>
      <cell title="自定义颜色" @click="functionCall('主要通知', '', 'pink')" />
      <cell
        title="自定义位置"
        @click="functionCall('自定义位置', 'primary', '', 3000, 'bottom')"
      />
      <cell
        title="自定义时长"
        @click="functionCall('自定义时长', 'danger', '', 1000)"
      />
    </cell-group>
  </demo-block>

  <demo-block title="组件用法">
    <t-notify :show="show">
      <span>:) 组件用法</span>
    </t-notify>
    <cell-group>
      <cell title="组件用法" @click="onclick" />
    </cell-group>
  </demo-block>
</template>

<script setup>
import { ref } from 'vue'
import cell from '../../cell/index.vue'
import cellGroup from '../../cell-group/index.vue'
import { Notify } from '..'
import TNotify from '../index.vue'
const show = ref(false)
function onclick() {
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 2000)
}
function functionCall(message, type, background, duration, position) {
  const instance = Notify({
    message,
    type,
    background,
    duration,
    position
  })
}
</script>

<style></style>
