<template>
  <demo-block title="基础用法">
    <tabs v-model="active1">
      <tab title="标签1">标签1内容区</tab>
      <tab title="标签2">标签2内容区</tab>
      <tab title="标签3">标签3内容区</tab>
      <tab title="标签4">标签4内容区</tab>
    </tabs>
  </demo-block>

  <demo-block title="自定义颜色">
    <tabs v-model="active2" color="red">
      <tab title="标签1">标签1内容区</tab>
      <tab title="标签2">标签2内容区</tab>
      <tab title="标签3">标签3内容区</tab>
      <tab title="标签4">标签4内容区</tab>
    </tabs>
  </demo-block>

  <demo-block title="切换动画">
    <tabs v-model="active3" lineAnimation tabAnimation>
      <tab title="标签1">标签1内容区</tab>
      <tab title="标签2">标签2内容区</tab>
      <tab title="标签3">标签3内容区</tab>
      <tab title="标签4">标签4内容区</tab>
    </tabs>
  </demo-block>
  <demo-block title="自定义图标">
    <tabs v-model="active6" lineAnimation tabAnimation>
      <tab title="标签1" icon="setting">标签1内容区</tab>
      <tab title="标签2" icon="info-circle">标签2内容区</tab>
      <tab title="标签3" icon="question-circle">标签3内容区</tab>
    </tabs>
  </demo-block>
  <demo-block title="禁用标签">
    <tabs v-model="active7" lineAnimation tabAnimation>
      <tab title="标签1" icon="setting">标签1内容区</tab>
      <tab title="标签2" icon="info-circle" disable>标签2内容区</tab>
      <tab title="标签3" icon="question-circle">标签3内容区</tab>
    </tabs>
  </demo-block>
  <demo-block title="标签栏自滚动居中">
    <tabs v-model="active4" lineAnimation tabAnimation>
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

  <demo-block title="手势滑动切换">
    <tabs v-model="active5" lineAnimation tabAnimation swipeable>
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
import tabs from '../index.vue'
import tab from '../../tab/index.vue'
import { ref } from '@vue/reactivity'
import { hello } from '../hooks'
hello()
const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)
const active5 = ref(0)
const active6 = ref(0)
const active7 = ref(0)
</script>
