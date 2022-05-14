<template>
  <!-- <demo-block title="组件用法">
    <dialog text="组件调用" :show="show"></dialog>
    <button @click="cpnClick">组件调用</button>
  </demo-block>

  <demo-block title="函数调用">
    <button @click="onClick">函数调用</button>
  </demo-block> -->

  <!-- <demo-block title="函数调用">
    <button @click="onClick">函数调用</button>
  </demo-block> -->
  <demo-block title="组件调用">
    <button @click="onClick">函数调用</button>
    <!-- <t-dialog :show="true"></t-dialog> -->
  </demo-block>
</template>
<script>
// import { dialog } from '../index'
// import { toast } from '../../toast/index'
import { dialog } from '../../../es/dialog/index'
import { toast } from '../../toast/index'
console.log(toast)
export default {
  components: { TDialog: dialog },
  methods: {
    onClick() {
      console.log(dialog)
      dialog({
        text: 'dfdf'
      })
        .then(() => {
          console.log('>>>>>>>>>')
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
    }
  }
}
</script>
