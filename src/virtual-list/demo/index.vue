<template>
  <demo-block title="基础用法">
    <virtual-list :list="list">
      <template v-slot="slotProps">
        <div class="list-item" :key="slotProps.index">
          {{ slotProps.item + '' }}
        </div>
      </template>
    </virtual-list>
  </demo-block>
</template>

<script setup>
import VirtualList from '../index.vue'
import cell from '../../cell/index.vue'
const list = new Array(1000).fill(0).map((item, index) => index + 1)
</script>

<style>
.dis-scroll {
  overflow: hidden !important;
}
.list-item {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-top: 1px solid rgb(245, 243, 243);
  background: #fff;
}
</style>
