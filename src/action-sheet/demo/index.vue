<template>
  <demo-block title="基础用法">
    <cell-group>
      <cell title="基础用法" @click="show = true"></cell>
      <cell title="展示取消按钮"></cell>
      <cell title="展示描述信息"></cell>
    </cell-group>
  </demo-block>

  <demo-block title="选项状态">
    <cell-group>
      <cell title="选项状态"></cell>
    </cell-group>
  </demo-block>

  <demo-block title="自定义面板">
    <cell-group>
      <cell title="自定义面板"></cell>
    </cell-group>
  </demo-block>
  <action-sheet
    v-model="show"
    :actions="actions"
    cancel-text="取消"
    description="这是一段描述信息"
  ></action-sheet>
</template>

<script setup>
import ActionSheet from '../index.vue'
import cellGroup from '../../cell-group/index.vue'
import cell from '../../cell/index.vue'
import { ref } from '@vue/reactivity'

const actions = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息' }
]
const show = ref(false)
</script>
