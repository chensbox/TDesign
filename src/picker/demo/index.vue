<template>
  <demo-block title="单列">
    <picker :colums="colums"></picker>
  </demo-block>

  <demo-block title="多列">
    <picker :colums="columns2"></picker>
  </demo-block>

  <demo-block title="级联选择器">
    <picker :colums="colums3"></picker>
  </demo-block>
</template>

<script>
import picker from '../index.vue'
export default {
  components: { picker },
  data() {
    return {
      colums: [
        'javaScript',
        'HTML',
        'CSS',
        'TypeScript',
        'Vue',
        'React',
        'WebPack',
        'Uniapp',
        'React navite',
        'canvas',
        'WebGl'
      ],
      columns2: [
        // 第一列
        {
          values: ['周一', '周二', '周三', '周四', '周五'],
          defaultIndex: 2
        },
        // 第二列
        {
          values: ['上午', '下午', '晚上'],
          defaultIndex: 1
        }
      ],
      colums3: [
        {
          text: '广东',
          children: [
            {
              text: '广州',
              children: [
                { text: '天河区' },
                { text: '越秀区' },
                { text: '琶洲区' },
                { text: '白云区' }
              ]
            },
            {
              text: '深圳',
              children: [
                { text: '南山区' },
                { text: '宝安区' },
                { text: '福田区' },
                { text: '龙华区' }
              ]
            },
            {
              text: '珠海',
              children: [
                { text: '香洲区' },
                { text: '金湾区' },
                { text: '斗门区' },
                { text: '横琴区' }
              ]
            }
          ]
        },
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
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
.block-item {
  padding: 0 16px;
}
</style>
