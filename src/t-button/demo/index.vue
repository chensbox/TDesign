<template>
  <demo-block title="基础用法">
    <t-button type="primary" style="margin-left: 15px">按钮</t-button>
  </demo-block>

  <demo-block title="自定义颜色">
    <t-button color="#03a9f4" style="margin-left: 15px">按钮</t-button>
  </demo-block>
</template>

<script>
import TButton from '../index.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { TButton }
})
</script>
