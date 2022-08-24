<template>
  <demo-block>
    <collapse v-model="active" ref="collapseRef">
      <collapse-item title="标题1" name="1"> 标题1的内容 </collapse-item>
      <collapse-item title="标题2" name="2">
        标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容
      </collapse-item>
      <collapse-item title="标题3" name="3"> 标题3的内容 </collapse-item>
    </collapse>
  </demo-block>

  <button @click="onClick(true)">toggleAll(true)</button>
  <button @click="onClick()">toggleAll()</button>
  <button @click="onClick(false)">toggleAll(false)</button>
</template>
<script setup>
import collapse from '../index.vue'
import collapseItem from '../../collapse-item/index.vue'
import { ref } from 'vue'

const active = ref(['1', '3'])
const collapseRef = ref()

function onClick(state) {
  console.log(collapseRef.value.toggleAll(state))
}
</script>
