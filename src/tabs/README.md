# Tabs 标签页

### 介绍

选项卡组件，用于在不同的内容区域之间进行切换。

### 引入

```js
import { createApp } from 'vue'
import { Tab, Tabs } from 'TDesign'

const app = createApp()
app.use(Tab)
app.use(Tabs)
```

## 代码演示

### 基础用法

```html
<tabs v-model="active1">
  <tab :title="'标签' + i" v-for="i in 4" :key="i">
    {{ `标签${i}内容区` }}
  </tab>
</tabs>
```

### 自定义颜色

```html
<tabs v-model="active2" color="red">
  <tab :title="'标签' + i" v-for="i in 4" :key="i">
    {{ `标签${i}内容区` }}
  </tab>
</tabs>
```

### 切换动画

```html
<tabs v-model="active1">
  <tab :title="'标签' + i" v-for="i in 4" :key="i">
    {{ `标签${i}内容区` }}
  </tab>
</tabs>
```

### 样式风格

```html
<tabs v-model="active1">
  <tab :title="'标签' + i" v-for="i in 4" :key="i">
    {{ `标签${i}内容区` }}
  </tab>
</tabs>
```

### 自定义图标

```html
<tabs v-model="active1">
  <tab :title="'标签' + i" v-for="i in 4" :key="i">
    {{ `标签${i}内容区` }}
  </tab>
</tabs>
```

### 禁用标签

```html
<tabs v-model="active1">
  <tab :title="'标签' + i" v-for="i in 4" :key="i">
    {{ `标签${i}内容区` }}
  </tab>
</tabs>
```

## API

### Props

| 参数           | 说明             | 类型              | 默认值    |
| -------------- | ---------------- | ----------------- | --------- |
| color          | 下划线颜色       | _string_          | `#0052d9` |
| cover          | 切换风格样式     | _Boolean_         | -         |
| swipeable      | 手势滑动         | _Boolean_         | `false`   |
| swipeThreshold | 超出数量滚动居中 | _number_ _string_ | `5`       |
| lineAnimation  | 下划线过渡动画   | _Boolean_         | `true`    |
| tabAnimation   | 切换 tab 动画    | _Boolean_         | `false`   |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
