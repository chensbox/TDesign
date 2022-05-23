<template>
  <demo-block title="基础用法">
    <button @click="onclick">点击</button>
    <overlay v-model="show"></overlay>
  </demo-block>
</template>

<script>
import overlay from '../index.vue'
export default {
  components: { overlay },
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
</style>
