<template>
  <demo-block title="基础用法">
    <swipe autoplay="2000">
      <swipe-item> 1 </swipe-item>
      <swipe-item>2</swipe-item>
      <swipe-item>3</swipe-item>
      <swipe-item>4</swipe-item>
    </swipe>
  </demo-block>
</template>

<script>
import swipe from '../index.vue'
import swipeItem from '../../swipe-item/index.vue'
export default {
  components: { swipe, swipeItem },
  setup() {}
}
</script>

<style lange="less" scoped></style>
