<template>
  <demo-block title="基础用法">
    <virtual-list :list="list">
      <template v-slot="slotProps">
        <div class="list-item">
          {{ slotProps.item + '' }}
        </div>
      </template>
    </virtual-list>
  </demo-block>
</template>

<script setup>
import VirtualList from '../index.vue'
import cell from '../../cell/index.vue'
const list = new Array(100).fill(0).map((item, index) => index + 1)
</script>

<style>
.dis-scroll {
  overflow: hidden !important;
}
.list-item {
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 5px 0;
  border-top: 1px solid rgb(217, 217, 217);
  /* border-bottom: 1px solid gray; */
  background: #fff;
}
</style>
