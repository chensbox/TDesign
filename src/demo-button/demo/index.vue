<template>
  <demo-block title="基础用法">
    <demo-button type="primary" style="margin-left: 15px">按钮</demo-button>
  </demo-block>

  <demo-block title="自定义颜色">
    <demo-button color="#03a9f4" style="margin-left: 15px">按钮</demo-button>
  </demo-block>
</template>

<script>
import demoButton from '../index.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { demoButton },
});
</script>
