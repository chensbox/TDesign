<template>
  <demo-block title="组件用法">
    <t-dialog title="组件调用" v-model="show"> </t-dialog>
    <button @click="cpnClick">组件调用</button>
  </demo-block>

  <demo-block title="函数调用">
    <t-button @click="onClick">函数调用</t-button>
  </demo-block>
</template>
<script>
import { dialog } from '../index'
// import { toast } from '../../toast/index'
// import { dialog } from '../../../es/dialog/index'
import { toast } from '../../toast/index'
import TButton from '../../t-button/index.vue'

export default {
  components: { TDialog: dialog, TButton },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onClick() {
      dialog({
        text: 'dfdf'
      })
        .then(() => {
          toast({
            text: '确定',
            show: true
          })
        })
        .catch(() => {
          toast({
            text: '取消',
            show: true
          })
        })
    },
    cpnClick() {
      this.show = !this.show
    }
  }
}
</script>
