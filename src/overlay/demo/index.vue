<template>
  <demo-block title="基础用法">
    <div class="block-item">
      <TButton @click="onclick">显示遮罩层</TButton>
      <overlay :show="show" @click="show = false"></overlay>
    </div>
  </demo-block>

  <demo-block title="嵌入内容">
    <div class="block-item">
      <TButton @click="slot = true">嵌入内容</TButton>
      <overlay :show="slot" @click="slot = false">
        <div class="block"></div>
      </overlay>
    </div>
  </demo-block>
</template>

<script>
import TButton from '../../button/index.vue'
import overlay from '../index.vue'
export default {
  components: { overlay, TButton },
  data() {
    return {
      show: false,
      slot: false
    }
  },
  methods: {
    onclick() {
      console.log('1')
      this.show = !this.show
    }
  }
}
</script>

<style lange="less" scoped>
.show-btn {
  margin: 5px;
}
.block-item {
  padding: 0 16px;
}
.block {
  height: 100px;
  width: 100px;
  background: #fff;
}
</style>
