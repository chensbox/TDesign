<template>
  <demo-block title="基础用法">
    <div class="list" v-infinite-list="load" hah hi>
      <div v-for="i in count" :key="i">{{ i }}</div>
    </div>
  </demo-block>
</template>
<script>
import { infiniteList } from '..'

export default {
  data() {
    return {
      count: 20
    }
  },
  directives: {
    infiniteList
  },
  methods: {
    load() {
      console.log(1)
      this.count++
    }
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
.list {
  overflow: scroll;
  height: 300px;
  background: #ccc;

  & > div {
    padding: 0;
    color: #fff;
    // margin: 5px 0;
    text-align: center;
    line-height: 40px;
    &:nth-child(2n) {
      background: #66c6f2;
    }
    &:nth-child(2n + 1) {
      background: #39a9ed;
    }
  }
}
</style>
