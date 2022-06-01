<template>
  <demo-block title="函数调用">
    <t-button @click="onClick">函数调用</t-button>
  </demo-block>
</template>

<script setup>
import TButton from '../../button/index.vue'

import { Toast } from '../index'
function onClick() {
  const toast = Toast({
    text: '10'
  })
  // console.log(toast._instance.ctx.$props.text)
  // console.warn(toast.state)

  // let secode = 9
  // const task = setInterval(() => {
  //   if (secode) {
  //     // toast._instance.ctx.state.text = secode--
  //     toast.state.text = secode--
  //   } else {
  //     clearInterval(task)
  //   }
  // }, 1000)
}
</script>
