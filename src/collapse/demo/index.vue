<template>
  <demo-block title="基础用法" style="margin-bottom: 15px">
    <collapse v-model="active">
      <collapse-item title="标题1" name="1"> 标题1的内容 </collapse-item>
      <collapse-item title="标题2" name="2">
        标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题
      </collapse-item>
      <collapse-item title="标题3" name="3" disabled>
        标题3的内容
      </collapse-item>
    </collapse>
  </demo-block>

  <demo-block title="手风琴模式" style="margin-bottom: 15px">
    <collapse v-model="name" accordion>
      <collapse-item title="标题1" name="1"> 标题1的内容 </collapse-item>
      <collapse-item title="标题2" name="2">
        标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容
      </collapse-item>
      <collapse-item title="标题3" name="3" disabled>
        标题3的内容
      </collapse-item>
    </collapse>
  </demo-block>

  <demo-block title="全部展开与全部切换">
    <collapse v-model="active2" ref="collapseRef">
      <collapse-item title="标题1" name="1"> 标题1的内容 </collapse-item>
      <collapse-item title="标题2" name="2">
        标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题2的内容标题
      </collapse-item>
      <collapse-item title="标题3" name="3" disabled>
        标题3的内容
      </collapse-item>
      <collapse-item title="标题4" name="4" disabled>
        标题4的内容
      </collapse-item>
    </collapse>
  </demo-block>
  <Button type="info" style="margin: 10px" @click="onClick(true)"
    >全部展开</Button
  >
  <Button type="info" style="margin: 10px" @click="onClick()">全部切换</Button>
  <Button type="info" style="margin: 10px" @click="onClick(false)"
    >全部关闭</Button
  >
</template>
<script setup>
import Button from '../../button/index.vue'
import collapse from '../index.vue'
import collapseItem from '../../collapse-item/index.vue'
import { ref } from 'vue'

const active = ref(['1', '3'])
const name = ref('2')
const active2 = ref(['1', '3'])

const collapseRef = ref()

function onClick(state) {
  console.log(collapseRef.value.toggleAll(state))
}
</script>
