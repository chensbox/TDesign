<template>
  <demo-block title="基础用法">
    <cell-group>
      <cell title="文字提示" @click="baseText"></cell>
      <cell title="加载提示" @click="loading"></cell>
      <cell title="成功提示" @click="success"></cell>
      <cell title="失败提示" @click="fail"></cell>
    </cell-group>
  </demo-block>

  <demo-block title="自定义图标">
    <cell-group>
      <cell title="自定义图标" @click="diyIcon"></cell>
      <cell title="自定义图标" @click="diyIcon2"></cell>
    </cell-group>
  </demo-block>
</template>

<script setup>
import cell from '../../cell/index.vue'
import cellGroup from '../../cell-group/index.vue'
import { Toast } from '../index'
function onClick() {
  const toast = Toast({
    message: '提示内容'
    // duration: 2000
  })
  let secode = 9
  const task = setInterval(() => {
    if (secode) {
      toast.state.message = secode--
    } else {
      toast.close()
      clearInterval(task)
    }
  }, 1000)
}

function baseText() {
  Toast({ message: '提示内容' })
}

function loading() {
  Toast.loading({
    message: '加载中...',
    forbidClick: true
    // duration: 0
  })
}

function success() {
  Toast.success({
    message: '成功提示'
  })
}
function fail() {
  Toast.fail({
    message: '失败提示'
  })
}
function diyIcon() {
  Toast({
    message: '自定义图标',
    icon: 'info-circle'
  })
}

function diyIcon2() {
  Toast({
    message: '自定义图标',
    icon: 'github-fill'
  })
}
</script>
