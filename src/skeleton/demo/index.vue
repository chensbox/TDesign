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
  <demo-block title="自定义每一行宽度">
    <skeleton
      avatar
      row="4"
      :row-width="['100%', '70%', '90%', '50%']"
    ></skeleton>
  </demo-block>

  <demo-block title="加载状态">
    <Button @click="loading = !loading" style="margin-left: 16px" size="small"
      >切换</Button
    >
    <skeleton avatar row="3" :loading="loading">
      <div>
        <img
          class="avatar"
          src="https://assets.leetcode.cn/aliyun-lc-upload/users/libra-c1/avatar_1622085699.png?x-oss-process=image%2Fformat%2Cwebp"
        />
      </div>
      <div>
        <p style="margin: 20px 0 8px 0; font-weight: bold">这是标题这是标题</p>
        <p style="line-height: 30px">
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准，在代码阅读过程中人们说脏话的频率是衡量代码质量
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
