# cell 单元格

### 介绍

单元格为列表中的单个展示项,需配合单元格组(cellGroup)组件使用

### 引入

```js
import Vue from 'vue'
import { cell, cellGroup } from 'TDesign'

Vue.use(cellGroup)
Vue.use(cell)
```

## 代码演示

### 基础用法

```html
<t-button type="primary" />
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
