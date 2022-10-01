<template>
  <demo-block title="基础用法">
    <input type="text" v-model="select" />
    <cell-group>
      <cell title="地区" placeholder="请选择地区" @click="show = true">{{
        value
      }}</cell>
    </cell-group>
    <popup v-model="show" round position="bottom" closeable>
      <cascader
        v-model="select"
        :options="options"
        @finish="onFinish"
        title="请选择地区"
      />
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
      select: '',
      show: false,
      loading: false,
      value: '请选择地区',
      options: [
        {
          text: '广东省',
          value: '100',
          children: [
            {
              text: '广州市',
              value: '1001',
              children: [
                { text: '天河区', value: '10011' },
                { text: '越秀区', value: '10012' }
              ]
            },
            {
              text: '深圳市',
              value: '1002',
              children: [
                { text: '南山区', value: '10021' },
                { text: '宝安区', value: '10022' }
              ]
            }
          ]
        },
        {
          text: '浙江省',
          value: '200',
          children: [
            {
              text: '杭州市',
              value: '2001',
              children: [
                { text: '西湖区', value: '20011' },
                { text: '余杭区', value: '20012' }
              ]
            },
            {
              text: '温州市',
              value: '2002',
              children: [
                { text: '鹿城区', value: '20021' },
                { text: '瓯海区', value: '20022' }
              ]
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
