<template>
  <demo-block title="基础用法">
    <picker></picker>
  </demo-block>
</template>

<script>
import picker from '../index.vue'
export default {
  components: { picker },
  data() {
    return {}
  },
  methods: {
    onclick() {}
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
