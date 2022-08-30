<template>
  <demo-block title="基础用法">
    <div
      class="list"
      v-infinite-list="load"
      :infinite-scroll-disabled="false"
      :infinite-scroll-distance="300"
      infinite-scroll-immediate
    >
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
  overflow-y: scroll;
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
  &::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
    border-left: 1px solid rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(138, 138, 138);
    background-clip: padding-box;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    //min-height: 28px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
}
</style>
