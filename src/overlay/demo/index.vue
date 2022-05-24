<template>
  <demo-block title="基础用法">
    <div class="block-item">
      <TButton @click="onclick">显示遮罩层</TButton>
      <overlay v-model="show"></overlay>
    </div>
  </demo-block>
</template>

<script>
import TButton from '../../t-button/index.vue'
import overlay from '../index.vue'
export default {
  components: { overlay, TButton },
  data() {
    return {
      show: false
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
</style>
