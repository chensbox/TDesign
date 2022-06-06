<template>
  <demo-block title="基础用法">
    <cell-gropu>
      <cell title="单元格" value="内容">顶顶顶顶顶顶顶</cell>
      <cell title="单元格" value="内容" placeholder="请选择地区"></cell>
      <cell title="单元格" value="内容"></cell>
    </cell-gropu>
  </demo-block>
</template>

<script>
// import TButton from '../../t-button/index.vue'
import cellGropu from '../../cell-group/index.vue'
import cell from '../index.vue'
export default {
  components: { cell, cellGropu },
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
