<template>
  <demo-block title="基础用法">
    <t-button type="primary" style="margin: 10px">主要按钮</t-button>
    <t-button type="danger" class="show-btn">危险按钮</t-button>
    <t-button type="info" class="show-btn">信息按钮</t-button>
    <t-button type="warning" class="show-btn">警告按钮</t-button>
    <t-button type="default" class="show-btn"> 默认按钮</t-button>
  </demo-block>

  <demo-block title="自定义颜色">
    <t-button color="#353535" class="show-btn">按钮</t-button>
  </demo-block>

  <demo-block title="插入图标">
    <t-button icon="add" class="show-btn"> 添加按钮</t-button>
  </demo-block>

  <demo-block title="朴素按钮">
    <t-button class="show-btn" plain type="primary"> 添加按钮</t-button>
  </demo-block>
</template>

<script>
import TButton from '../index.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { TButton }
})
</script>

<style lange="less" scoped>
.show-btn {
  margin: 10px;
}
</style>
