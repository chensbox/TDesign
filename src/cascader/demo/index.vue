<template>
  <demo-block title="基础用法">
    <cascader :options="options"></cascader>
  </demo-block>
</template>

<script>
import cascader from '../index.vue'
export default {
  components: { cascader },
  data() {
    return {
      loading: false,
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
    onclick() {}
  }
}
</script>

<style lange="less" scoped>
.show-btn {
  margin: 5px;
}
</style>
