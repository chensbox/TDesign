<template>
  <demo-block title="基础用法">
    <cell-group>
      <cell title="提示弹窗" @click="onClick2" />
      <cell title="提示弹窗(无标题)" @click="notTitle" />
      <cell title="确认弹窗" @click="onClick" />
    </cell-group>
  </demo-block>

  <demo-block title="异步关闭">
    <cell-group>
      <cell title="提示弹窗" @click="asyncClose" />
    </cell-group>
  </demo-block>

  <demo-block title="组件调用">
    <t-dialog v-model="show" title="标题">
      <div class="insert">
        组件用法可以通过默认插槽嵌入任意内容<br />(文字、html节点或者组件)
      </div>
    </t-dialog>
    <cell-group>
      <cell title="提示弹窗" @click="show = true" />
    </cell-group>
  </demo-block>
</template>
<script>
import { Dialog } from '../index'
import { Toast } from '../../toast/index'
import cell from '../../cell/index.vue'
import cellGroup from '../../cell-group/index.vue'
import { sleep } from '../../utils'

export default {
  components: { TDialog: Dialog.Component, cellGroup, cell },
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
    },
    notTitle() {
      Dialog.alert({
        message:
          '如果解决方法是丑陋的，那就肯定还有更好的解决方法，只是还没有发现而已。'
      }).then(() => {
        Toast('确定')
      })
    }
  }
}
</script>
