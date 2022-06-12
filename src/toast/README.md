# Toast 轻提示

### 介绍

在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

### 引入

```js
import { createApp } from 'vue'
import { Toast } from 'TDesign'

const app = createApp()
app.use(Toast)
```

## 代码演示

### 基础用法

```html
<cell-group>
  <cell title="文字提示" @click="baseText"></cell>
  <cell title="加载提示" @click="loading"></cell>
  <cell title="成功提示" @click="success"></cell>
  <cell title="失败提示" @click="fail"></cell>
</cell-group>
```

```js
<script setup>
import cell from '../../cell/index.vue'
import cellGroup from '../../cell-group/index.vue'
import { Toast } from '../index'
function onClick() {
  const toast = Toast({
    message: '提示内容'
    // duration: 2000
  })
  let secode = 9
  const task = setInterval(() => {
    if (secode) {
      toast.state.message = secode--
    } else {
      toast.close()
      clearInterval(task)
    }
  }, 1000)
}

function baseText() {
  Toast('提示内容')
}

function loading() {
  Toast.loading({
    message: '加载中...',
    forbidClick: true
    // duration: 0
  })
}

function success() {
  Toast.success('成功提示')
}
function fail() {
  Toast.fail('失败提示')
}
function diyIcon() {
  Toast({
    message: '自定义图标',
    icon: 'info-circle'
  })
}

function diyIcon2() {
  Toast({
    message: '自定义图标',
    icon: 'github-fill'
  })
}

function updateMessage() {
  let second = 3
  const toast = Toast.loading({
    message: '倒计时 3 秒',
    duration: 0,
    forbidClick: true
  })

  const task = setInterval(() => {
    if (--second) {
      toast.message.value = `倒计时 ${second} 秒`
    } else {
      toast.message.value = 'success'
      toast.icon.value = 'check-circle'
      clearInterval(task)
      setTimeout(toast.close, 1000)
    }
  }, 1000)
}
</script>

```

### 自定义图标

```html
<cell-group>
  <cell title="自定义图标" @click="diyIcon"></cell>
  <cell title="自定义图标" @click="diyIcon2"></cell>
</cell-group>
```

```js
import cell from '../../cell/index.vue'
import cellGroup from '../../cell-group/index.vue'
import { Toast } from '../index'

function diyIcon() {
  Toast({
    message: '自定义图标',
    icon: 'info-circle'
  })
}

function diyIcon2() {
  Toast({
    message: '自定义图标',
    icon: 'github-fill'
  })
}
```

### 动态更新提示

```html
<cell-group>
  <cell title="动态更新" @click="updateMessage"></cell>
</cell-group>
```

```js
<script setup>
import cell from '../../cell/index.vue'
import cellGroup from '../../cell-group/index.vue'
import { Toast } from '../index'


function updateMessage() {
  let second = 3
  const toast = Toast.loading({
    message: '倒计时 3 秒',
    duration: 0,
    forbidClick: true
  })

  const task = setInterval(() => {
    if (--second) {
      toast.message.value = `倒计时 ${second} 秒`
    } else {
      toast.message.value = 'success'
      toast.icon.value = 'check-circle'
      clearInterval(task)
      setTimeout(toast.close, 1000)
    }
  }, 1000)
}
</script>
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| type          | 按钮类型 | _string_ | `primary` |
| color `1.0.0` | 按钮颜色 | _string_ | -         |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
