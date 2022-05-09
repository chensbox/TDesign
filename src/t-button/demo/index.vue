<template>
  <demo-block title="基础用法">
    <t-button type="primary" style="margin: 10px">主要按钮</t-button>
    <t-button type="danger" class="show-btn">危险按钮</t-button>
    <t-button type="info" class="show-btn">信息按钮</t-button>
    <t-button type="warning" class="show-btn">警告按钮</t-button>
    <t-button type="default" class="show-btn"> 默认按钮</t-button>
  </demo-block>

  <demo-block title="自定义颜色">
    <t-button color="#353535" class="show-btn" plain>单色按钮</t-button>
    <t-button color="#7232dd" class="show-btn">单色按钮</t-button>
    <t-button
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      class="show-btn"
      >渐变色按钮</t-button
    >
  </demo-block>

  <demo-block title="插入图标">
    <t-button icon="add" class="show-btn"> 按钮</t-button>
    <t-button icon="camera" class="show-btn" type="info"> 按钮</t-button>
    <t-button icon="ashbin" class="show-btn" type="danger"> 按钮</t-button>
  </demo-block>
  <demo-block title="加载状态">
    <t-button
      class="show-btn"
      type="info"
      loading-type="loading"
      loading
      size="normal"
    >
    </t-button>
    <t-button
      class="show-btn"
      type="info"
      loading-type="loading-spinner"
      loading
      size="normal"
    >
    </t-button>
    <t-button
      class="show-btn"
      loading-type="loading"
      loading-text="加载中..."
      loading
      type="info"
      @click="onclick"
    >
      点我试试</t-button
    >
  </demo-block>
  <demo-block title="朴素按钮">
    <t-button class="show-btn" plain type="info"> 朴素按钮</t-button>
    <t-button class="show-btn" plain type="primary"> 朴素按钮</t-button>
    <t-button class="show-btn" type="warning" plain> 朴素按钮</t-button>
  </demo-block>

  <demo-block title="不同尺寸">
    <t-button class="show-btn" type="primary" size="large"> 大号按钮</t-button>
    <t-button class="show-btn" type="primary"> 普通按钮</t-button>
    <t-button class="show-btn" type="primary" size="small"> 小型按钮</t-button>

    <t-button class="show-btn" type="primary" size="mini"> 迷你按钮</t-button>
  </demo-block>
</template>

<script>
import TButton from '../index.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { TButton },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onclick() {
      console.log('1')
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
  }
})
</script>

<style lange="less" scoped>
.show-btn {
  margin: 5px;
}
</style>
