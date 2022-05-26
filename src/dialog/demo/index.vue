<template>
  <demo-block title="组件用法">
    <t-dialog title="组件调用" v-model="show"> </t-dialog>
    <t-button @click="show = !show" type="info">组件调用</t-button>
  </demo-block>

  <demo-block title="函数调用">
    <t-button @click="onClick">函数调用</t-button>
  </demo-block>
</template>
<script>
import { Dialog } from '../index'
// import { toast } from '../../toast/index'
// import { dialog } from '../../../es/dialog/index'
import { Toast } from '../../toast/index'
import TButton from '../../t-button/index.vue'

export default {
  components: { TDialog: Dialog.Component, TButton },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onClick() {
      Dialog({
        text: 'dfdf'
      })
        .then(() => {
          Toast({
            text: '确定'
          })
        })
        .catch(() => {
          Toast({
            text: '取消'
          })
        })
    }
  }
}
</script>
