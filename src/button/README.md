# Button 按钮

### 介绍

Button 一般用来触发一些操作

### 引入

```js
import Vue from 'vue'
import { TButton } from 'TDesign'

Vue.use(TButton)
```

## 代码演示

### 基础用法

```html
<t-button type="primary">主要按钮</t-button>
<t-button type="danger">危险按钮</t-button>
<t-button type="info">信息按钮</t-button>
<t-button type="warning">警告按钮</t-button>
<t-button type="default"> 默认按钮</t-button>
```

### 自定义颜色

```html
<t-button color="#353535" plain>单色按钮</t-button>
<t-button color="#7232dd">单色按钮</t-button>
<t-button color="linear-gradient(to right, #ff6034, #ee0a24)">
  渐变色按钮
</t-button>
```

### 插入图标

```html
<t-button icon="add"></t-button>
<t-button icon="camera" type="info"></t-button>
<t-button icon="ashbin" type="danger">删除</t-button>
```

### 加载状态

```html
<t-button type="info" loading-type="loading" loading> </t-button>
<t-button type="info" loading-type="loading-spinner" loading> </t-button>
<t-button
  loading-type="loading"
  loading-text="加载中..."
  loading
  type="info"
  @click="onclick"
  >点我试试</t-button
>
```

### 朴素按钮

```html
<t-button type="info" plain> 朴素按钮</t-button>
<t-button type="primary" plain> 朴素按钮</t-button>
<t-button type="danger" plain> 朴素按钮</t-button>
```

### 按钮形状

```html
<t-button type="info" square>方形按钮</t-button>
<t-button type="primary" round>圆形按钮</t-button>
```

### 禁用状态

```html
<t-button type="primary" disabled>禁用状态</t-button>
<t-button type="danger" disabled>禁用状态</t-button>
<t-button type="info" disabled>禁用状态</t-button>
```

### 不同尺寸

```html
<t-button type="info" size="large"> 大号按钮</t-button>
<t-button type="info"> 普通按钮</t-button>
<t-button type="info" size="small"> 小型按钮</t-button>
<t-button type="info" size="mini"> 迷你按钮</t-button>
```

## API

### Props

| 参数          | 说明                               | 类型      | 默认值    |
| ------------- | ---------------------------------- | --------- | --------- |
| type          | 按钮类型                           | _string_  | `primary` |
| color `1.0.0` | 按钮颜色                           | _string_  | -         |
| size          | 按钮尺寸                           | _string_  | `normal`  |
| icon          | 按钮图标                           | _string_  | -         |
| loading       | 是否切换 loading 状态              | _Boolean_ | `false`   |
| loadingType   | loading 类型(可选 loading-spinner) | _string_  | `loading` |
| loadingText   | 加载文案                           | _string_  | -         |
| disabled      | 是否禁用按钮                       | _Boolean_ | `false`   |
| square        | 方形按钮                           | _Boolean_ | -         |
| round         | 圆形按钮                           | _Boolean_ | -         |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |

### Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 默认插槽，显示按钮文字内容 |
