<template>
  <demo-block title="基础用法">
    <cell-group>
      <cell title="单元格" placeholder="请选择地区" @click="show = true">{{
        value
      }}</cell>
    </cell-group>
    <popup v-model="show" round position="bottom">
      <cascader :options="options" @finish="onFinish" />
    </popup>
  </demo-block>
</template>

<script>
import cascader from '../index.vue'
import cell from '../../cell/index.vue'
import cellGroup from '../../cell-group/index.vue'
import popup from '../../popup/index.vue'

export default {
  components: { cascader, cell, cellGroup, popup },
  data() {
    return {
      show: false,
      loading: false,
      value: '请选择地区',
      options: [
        {
          text: '广东省',
          children: [
            {
              text: '广州市',
              children: [{ text: '天河区' }, { text: '越秀区' }]
            },
            {
              text: '深圳市',
              children: [{ text: '南山区' }, { text: '宝安区' }]
            }
          ]
        },
        {
          text: '浙江省',
          children: [
            {
              text: '杭州市',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州市',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        }
      ]
    }
  },
  methods: {
    onclick() {},
    onFinish(e) {
      console.log(e)
      this.show = false
      this.value = e.map(i => i.text).join('/')
    }
  }
}
</script>

<style lange="less" scoped>
.show-btn {
  margin: 5px;
}
</style>
