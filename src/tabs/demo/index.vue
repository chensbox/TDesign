<template>
  <demo-block title="基础用法">
    <tabs v-model="active1">
      <tab :title="'标签' + i" v-for="i in 4" :key="i"> </tab>
    </tabs>
  </demo-block>

  <demo-block title="自定义颜色">
    <tabs v-model="active2" color="#41d291">
      <tab :title="'标签' + i" v-for="i in 4" :key="i"> </tab>
    </tabs>
  </demo-block>

  <demo-block title="切换动画">
    <tabs v-model="active3" animation>
      <tab :title="'标签' + i" v-for="i in 4" :key="i"> </tab>
    </tabs>
  </demo-block>

  <demo-block title="样式风格">
    <tabs v-model="active8" animation cover>
      <tab :title="'标签' + i" v-for="i in 4" :key="i"> </tab>
    </tabs>
  </demo-block>

  <demo-block title="自定义图标">
    <tabs v-model="active6" animation>
      <tab title="标签1" icon="setting">标签1内容区</tab>
      <tab title="标签2" icon="info-circle">标签2内容区</tab>
      <tab title="标签3" icon="question-circle">标签3内容区</tab>
    </tabs>
  </demo-block>

  <demo-block title="禁用标签">
    <tabs v-model="active7" animation>
      <tab title="标签1" icon="setting"></tab>
      <tab title="标签2" icon="info-circle" disabled></tab>
      <tab title="标签3" icon="question-circle"></tab>
    </tabs>
  </demo-block>

  <demo-block title="标签栏自滚动居中">
    <tabs v-model="active4" animation>
      <tab :title="'标签' + i" v-for="i in 8" :key="i"> </tab>
    </tabs>
  </demo-block>

  <demo-block title="手势滑动切换">
    <tabs v-model="active5" animation swipeable>
      <tab :title="'标签' + i" v-for="i in 8" :key="i"> </tab>
    </tabs>
  </demo-block>
</template>

<script setup>
import tabs from '../index.vue'
import tab from '../../tab/index.vue'
import { ref } from '@vue/reactivity'
const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)
const active5 = ref(0)
const active6 = ref(0)
const active7 = ref(1)
const active8 = ref(0)
const active9 = ref(0)
</script>
