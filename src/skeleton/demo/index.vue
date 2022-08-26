<template>
  <demo-block title="基础用法">
    <skeleton row="3"></skeleton>
  </demo-block>

  <demo-block title="显示头像">
    <skeleton avatar row="3"></skeleton>
  </demo-block>

  <demo-block title="占位图风格">
    <skeleton
      avatar
      row="3"
      avatar-shape="square"
      row-shape="square"
    ></skeleton>
  </demo-block>
  <demo-block title="自定义段落宽度">
    <skeleton
      avatar
      row="4"
      :row-width="['100%', '70%', '90%', '50%']"
    ></skeleton>
  </demo-block>

  <demo-block title="加载状态">
    <Button @click="loading = !loading" style="margin-left: 16px" size="small"
      >切换状态</Button
    >

    <skeleton avatar row="3" :loading="loading" :fullscreen="fullscreen">
      <div>
        <img
          class="avatar"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F77c6a7efce1b9d1639c61277fedeb48f8c5464a7.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664013467&t=5dc1a4aa5bc82a183c68969711f38f9b"
        />
      </div>
      <div>
        <p style="margin: 20px 0 8px 0; font-weight: bold">这是标题这是标题</p>
        <p style="line-height: 30px">
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准，在代码阅读过程中人们说脏话的
        </p>
      </div>
    </skeleton>
  </demo-block>
</template>
<script setup>
import { ref } from 'vue'
import skeleton from '../index.vue'
import Button from '../../button/index.vue'
const loading = ref(true)
const fullscreen = ref(false)

const openFullscreen = () => {
  fullscreen.value = true
  setTimeout(() => {
    fullscreen.value = false
  }, 2000)
}
</script>

<style lang="less">
.demo-skeleton {
  background: #fff;

  .avatar {
    margin-top: 15px;
    margin-right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>
