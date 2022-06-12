<template>
  <demo-block title="组件用法">
    <t-dialog title="组件调用" v-model="show">
      如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。
    </t-dialog>
    <t-button @click="show = !show" type="info">组件调用</t-button>
  </demo-block>

  <demo-block title="函数调用">
    <t-button @click="onClick" type="info">确认弹框</t-button>
    <t-button @click="onClick2" type="info">普通弹框</t-button>
    <t-button @click="asyncClose" type="info">异步关闭</t-button>
  </demo-block>
</template>
<script>
import { Dialog } from '../index'
import { Toast } from '../../toast/index'
import TButton from '../../button/index.vue'
import { sleep } from '../../utils'

export default {
  components: { TDialog: Dialog.Component, TButton },
  data() {
    return {
      show: false
    }
  },
  methods: {
    beforClose(action, done) {
      if (action == 'confirm') {
        sleep(2000).then(done)
      } else {
        done()
      }
    },
    asyncClose() {
      Dialog.confirm({
        title: '标题',
        message:
          '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。',
        beforClose: this.beforClose
      })
        .then(() => {
          Toast('确定')
        })
        .catch(() => {
          Toast('取消')
        })
    },
    onClick() {
      Dialog.confirm({
        title: '标题',
        message:
          '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。'
      })
        .then(() => {
          Toast('确定')
        })
        .catch(() => {
          Toast('取消')
        })
    },
    onClick2() {
      Dialog.alert({
        title: '标题',
        message:
          '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。'
      }).then(() => {
        Toast('确定')
      })
    }
  }
}
</script>
