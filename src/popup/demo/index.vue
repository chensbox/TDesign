<template>
  <demo-block title="基础用法">
    <cell-gropu>
      <cell title="展示弹出层" @click="show = true"></cell>
    </cell-gropu>
    <popup v-model="show">内容</popup>
  </demo-block>

  <demo-block title="弹出位置">
    <cell-gropu>
      <cell title="底部弹出" @click="onclick('bottom')"></cell>
      <cell title="顶部弹出" @click="onclick('top')"></cell>
      <cell title="左侧弹出" @click="onclick('left')"></cell>
      <cell title="右侧弹出" @click="onclick('right')"></cell>
    </cell-gropu>
    <popup v-model="bottom" position="bottom"></popup>
    <popup v-model="top" position="top"></popup>
    <popup v-model="left" position="left"></popup>
    <popup v-model="right" position="right"></popup>
  </demo-block>

  <demo-block title="圆角弹窗">
    <cell-gropu>
      <cell title="底部弹出" @click="round = true"> </cell>
    </cell-gropu>
    <popup v-model="round" round position="bottom" :style="{ height: '30%' }">
    </popup>
  </demo-block>

  <demo-block title="关闭图标">
    <cell-gropu>
      <cell title="关闭图标" @click="closeable = true"> </cell>
      <cell title="图标位置" @click="closeablePositon = true"> </cell>
    </cell-gropu>
    <popup
      v-model="closeable"
      position="bottom"
      :style="{ height: '30%' }"
      closeable
    />
    <popup
      v-model="closeablePositon"
      position="bottom"
      :style="{ height: '30%' }"
      closeable
      close-icon-position="top-left"
    />
  </demo-block>
</template>

<script>
import cell from '../../cell/index.vue'
import cellGropu from '../../cell-group/index.vue'
import TButton from '../../button/index.vue'
import popup from '../index.vue'
export default {
  components: { popup, TButton, cell, cellGropu },
  data() {
    return {
      show: false,
      left: false,
      right: false,
      top: false,
      bottom: false,
      round: false,
      closeable: false,
      closeablePositon: false
    }
  },
  methods: {
    onclick(position) {
      this[position] = true
    }
  }
}
</script>

<style lange="less" scoped>
.show-btn {
  margin: 5px;
}
</style>
