<template>
  <demo-block title="基础用法">
    <cell-group>
      <cell title="基础用法" @click="show1 = true"></cell>
      <cell title="展示取消按钮" @click="show2 = true"></cell>
      <cell title="展示描述信息" @click="show3 = true"></cell>
    </cell-group>
  </demo-block>

  <demo-block title="选项状态">
    <cell-group>
      <cell title="选项状态" @click="show4 = true"></cell>
      <cell title="异步关闭" @click="show5 = true"></cell>
    </cell-group>
  </demo-block>

  <demo-block title="自定义面板">
    <cell-group>
      <cell title="自定义面板" @click="show6 = true"></cell>
    </cell-group>
  </demo-block>

  <action-sheet
    v-model="show1"
    :actions="actions"
    @select="onSelect"
  ></action-sheet>
  <action-sheet
    v-model="show2"
    :actions="actions"
    cancel-text="取消"
    @select="onSelect"
  ></action-sheet>
  <action-sheet
    v-model="show3"
    :actions="actions3"
    cancel-text="取消"
    description="这是一段描述信息"
    @select="onSelect"
  ></action-sheet>

  <action-sheet v-model="show4" :actions="actions4" cancel-text="取消">
  </action-sheet>

  <action-sheet
    v-model="show5"
    :actions="actions5"
    cancel-text="取消"
    @select="onSelect2"
    :closeOnClickAction="false"
  ></action-sheet>

  <action-sheet v-model="show6" closeable>
    <div class="diy">自定义内容</div>
  </action-sheet>
</template>

<script setup>
import ActionSheet from '../index.vue'
import cellGroup from '../../cell-group/index.vue'
import cell from '../../cell/index.vue'
import { ref } from '@vue/reactivity'

const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]

const actions2 = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息', disabled: true, loading: true }
]

const actions3 = [
  { name: '选项一' },
  { name: '选项二' },
  { name: '选项三', subname: '描述信息' }
]

const actions4 = [
  { name: '着色选项', color: 'red' },
  { name: '禁用选项', disabled: true },
  { name: '选项三', subname: '描述信息', loading: true }
]

const actions5 = ref([
  { name: '选项一' },
  { name: '禁用选项', disabled: true },
  { name: '异步关闭', loading: false }
])

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)

const onSelect = (item, index) => {
  console.log(item, index)
}

const onSelect2 = item => {
  if (item.name === '异步关闭') {
    actions5.value[2].loading = true
    setTimeout(() => {
      actions5.value[2].loading = false
      show5.value = false
    }, 3000)
  } else {
    show5.value = false
  }
}
</script>

<style>
.diy {
  padding: 40px 20px;
  height: 100px;
}
</style>
