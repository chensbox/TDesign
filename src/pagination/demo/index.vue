<template>
  <demo-block title="基础用法">
    <pagination
      v-model="page"
      :total-items="100"
      :items-per-page="5"
    ></pagination>
  </demo-block>

  <demo-block title="显示省略号">
    <pagination
      v-model="page2"
      :total-items="100"
      :items-per-page="5"
      force-ellipses
    ></pagination>
  </demo-block>

  <demo-block title="自定义按钮">
    <pagination v-model="page3" :total-items="100" :items-per-page="5">
      <template #prev-text>
        <icon name="left" />
      </template>
      <template #default="{ page }">
        {{ page.text }}
      </template>
      <template #next-text>
        <icon name="right" />
      </template>
    </pagination>
  </demo-block>
</template>

<script setup>
import icon from '../../icon/index.vue'
import { ref } from '@vue/reactivity'
import pagination from '../index.vue'

let page = ref(1)
let page2 = ref(1)
let page3 = ref(1)
</script>
