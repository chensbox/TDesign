# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

### 引入

通过以下方式来全局注册组件。

```js
import { createApp } from 'vue'
import { Popup } from 'TDesign'

const app = createApp()
app.use(Popup)
```

## 代码演示

### 基础用法

```html
<cell-gropu>
  <cell title="展示弹出层" @click="show = true"></cell>
</cell-gropu>
<popup v-model="show">内容</popup>
```

### 弹出位置

```html
<cell-gropu>
  <cell title="底部弹出" @click="bottom = true"></cell>
  <cell title="顶部弹出" @click="top = true"></cell>
  <cell title="左侧弹出" @click="left = true"></cell>
  <cell title="右侧弹出" @click="right = true"></cell>
</cell-gropu>
<popup v-model="bottom" position="bottom"></popup>
<popup v-model="top" position="top"></popup>
<popup v-model="left" position="left"></popup>
<popup v-model="right" position="right"></popup>
```

### 圆角弹窗

```html
<cell-gropu>
  <cell title="圆角弹窗" @click="show = true"> </cell>
</cell-gropu>
<popup v-model="show" round position="bottom" :style="{ height: '30%' }">
</popup>
```

### 关闭图标

```html
<cell-gropu>
  <cell title="关闭图标" @click="closeable = true"> </cell>
  <cell title="图标位置" @click="closeablePositon = true"> </cell>
</cell-gropu>

<popup
  v-model="closeable"
  position="bottom"
  :style="{ height: '30%' }"
  closeable
/>
<popup
  v-model="closeablePositon"
  position="bottom"
  :style="{ height: '30%' }"
  closeable
  close-icon-position="top-left"
/>
```

## API

### Props

| 参数              | 说明             | 类型      | 默认值                                                      |
| ----------------- | ---------------- | --------- | ----------------------------------------------------------- |
| closeable         | 是否展示关闭按钮 | _Boolean_ | `false`                                                     |
| round             | 圆角风格         | _Boolean_ | `false`                                                     |
| closeIconPosition | 关闭图标的位置   | _string_  | `top-right` 可选（`top-left`,`bottom-left`,`bottom-right`） |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| close  | 弹出层关闭事件 | -        |

### Slots

| 名称    | 说明                      |
| ------- | ------------------------- |
| default | 默认插槽,弹出层展示的内容 |
