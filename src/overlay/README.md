# Overlay 遮罩层

### 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

### 引入

```js
import { createApp } from 'vue'
import { Overlay } from 'TDesign'

const app = createApp()
app.use(Overlay)
```

## 代码演示

### 基础用法

```html
<TButton @click="onclick">显示遮罩层</TButton>
<overlay :show="show" @click="show = false" />
```

### 嵌入内容

```html
<div class="block-item">
  <TButton @click="slot = true">嵌入内容</TButton>
  <overlay :show="slot" @click="slot = false">
    <div class="block"></div>
  </overlay>
</div>
```

## API

### Props

| 参数        | 说明                                    | 类型               | 默认值  |
| ----------- | --------------------------------------- | ------------------ | ------- |
| show        | 是否展示遮罩层                          | _boolean_          | `false` |
| z-index     | z-index 层级                            | _number \| string_ | `1`     |
| duration    | 动画时长，单位秒，设置为 0 可以禁用动画 | _number \| string_ | `0.3`   |
| lock-scroll | 是否锁定背景滚                          | _boolean_          | `true`  |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |

### Slots

| 名称    | 说明                               |
| ------- | ---------------------------------- |
| default | 默认插槽，用于在遮罩层上方嵌入内容 |
