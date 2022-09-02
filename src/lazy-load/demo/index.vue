<template>
  <img
    v-lazy-load="
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F77c6a7efce1b9d1639c61277fedeb48f8c5464a7.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664013467&t=5dc1a4aa5bc82a183c68969711f38f9b'
    "
  />
</template>

<script setup>
import { lazyLoad } from '..'

const vLazyLoad = lazyLoad
</script>
<style lang="less">
.demo-lazy-load {
  width: 100%;
  padding-top: 1000px;
}
</style>
