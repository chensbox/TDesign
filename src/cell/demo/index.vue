<template>
  <demo-block title="基础用法">
    <cell-gropu>
      <cell title="单元格" value="内容"></cell>
      <cell title="单元格" value="内容"></cell>
      <cell title="单元格" value="内容"></cell>
    </cell-gropu>
  </demo-block>

  <demo-block title="插入图标">
    <cell-gropu>
      <cell title="单元格" value="内容" icon="location"></cell>
      <cell title="单元格" value="内容" icon="question-circle"></cell>
      <cell title="单元格" value="内容" icon="ashbin"></cell>
    </cell-gropu>
  </demo-block>

  <demo-block title="按钮单元格">
    <cell-gropu>
      <cell title="Action"></cell>
      <cell title="Action"></cell>
      <cell title="Action"></cell>
    </cell-gropu>
  </demo-block>

  <demo-block title="插入值">
    <cell-gropu>
      <cell title="地区" placeholder="请选择地区"></cell>
      <cell title="地区">广东/广州/天河区</cell>
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
