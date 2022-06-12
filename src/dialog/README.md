# Dialog 对话框

### 介绍

弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。

支持函数调用和组件调用两种方式。

### 引入

```js
import Vue from 'vue'
import { Dialog } from 'TDesign'

Vue.use(Dialog)
```

## 代码演示

### 基础用法

```html
<cell-group>
  <cell title="提示弹窗" @click="alert" />
  <cell title="提示弹窗(无标题)" @click="notTitle" />
  <cell title="确认弹窗" @click="confirm" />
</cell-group>
```

```js
export default {
  components: { cellGroup, cell },
  data() {
    return {
      show: false
    }
  },
  methods: {
    confirm() {
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
    alert() {
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
```

### 异步关闭

```html
<cell-group>
  <cell title="异步关闭" @click="asyncClose" />
</cell-group>
```

```js
export default {
  components: { cellGroup, cell },
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
    }
  }
}
```

### 组件调用

```html
<t-dialog v-model="show" title="标题">
  <div>组件用法可以通过默认插槽嵌入任意内容<br />(文字、html节点或者组件)</div>
</t-dialog>
```

## API

### Props

| 参数       | 说明                                   | 类型       | 默认值  |
| ---------- | -------------------------------------- | ---------- | ------- |
| title      | 标题                                   | _string_   | -       |
| message    | 弹窗内容                               | _string_   | -       |
| beforClose | 关闭前的回调                           | _function_ | -       |
| type       | 弹窗类型(alert 提示框，confirm 确认框) | _string_   | `alert` |

### Events

| 事件名  | 说明           | 回调参数 |
| ------- | -------------- | -------- |
| confirm | 点击确认时触发 | -        |
| cancel  | 点击取消时触发 | -        |

### Slots

| 名称    | 说明                           |
| ------- | ------------------------------ |
| default | 默认插槽(组件用法插入展示内容) |
