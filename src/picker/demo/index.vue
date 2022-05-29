<template>
  <demo-block title=" ">
    <picker :colums="colums"></picker>
  </demo-block>

  <demo-block title=" ">
    <picker :colums="columns2"></picker>
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
        'WebPack'
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
