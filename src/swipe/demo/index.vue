<template>
  <demo-block title="基础用法">
    <swipe>
      <swipe-item> 1 </swipe-item>
      <swipe-item>2</swipe-item>
      <swipe-item>3</swipe-item>
      <swipe-item>4</swipe-item>
    </swipe>
  </demo-block>

  <demo-block title="监听切换事件">
    <swipe @change="change" :loop="false">
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
import { Toast } from '../../toast/index.js'
export default {
  components: { swipe, swipeItem },
  setup() {
    const change = e => {
      Toast(`当前索引是 ${e} `)
    }

    return { change }
  }
}
</script>

<style lange="less" scoped></style>
