<template>
  <demo-block title="单列">
    <picker
      :columns="colums"
      title="标题"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    ></picker>
  </demo-block>

  <demo-block title="多列">
    <picker
      :columns="columns2"
      title="标题"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    ></picker>
  </demo-block>

  <demo-block title="级联选择器">
    <picker
      :columns="colums3"
      title="标题"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    ></picker>
  </demo-block>
</template>

<script>
import picker from '../index.vue'
import { Toast } from '../../toast/index'
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
                { text: '海珠区' },
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
            },
            {
              text: '肇庆',
              children: [
                { text: '端州区' },
                { text: '高要区' },
                { text: '四会市' },
                { text: '怀集县' }
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
    onclick() {},
    onChange(value) {
      let index = value.map(item => item.index)
      value = value.map(item => item.value)

      const msg = '当前值：' + value.join() + '      索引:' + index.join()

      console.log(msg)
    },
    onConfirm(value) {
      this.onChange(value)
    },
    onCancel(value) {
      this.onChange(value)
    }
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
