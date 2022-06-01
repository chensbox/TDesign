<template>
  <demo-block title="基础用法">
    <t-button @click="onclick">点击</t-button>

    <popup v-model="show"></popup>
  </demo-block>
</template>

<script>
import TButton from '../../button/index.vue'
import popup from '../index.vue'
export default {
  components: { popup, TButton },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onclick() {
      console.log('1')
      this.show = !this.show
      console.warn(this.show)
    }
  }
}
</script>

<style lange="less" scoped>
.show-btn {
  margin: 5px;
}
</style>
