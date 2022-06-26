# Swipe 轮播


### 介绍

用于循环播放一组图片或内容。


### 引入

```js
import { createApp } from 'vue'
import { Swipe , SwipeItem } from 'TDesign'
const app = createApp()
app.use(Swipe)
app.use(SwipeItem)
```

## 代码演示

### 基础用法

```html
  <swipe>
      <swipe-item>1</swipe-item>
      <swipe-item>2</swipe-item>
      <swipe-item>3</swipe-item>
      <swipe-item>4</swipe-item>
    </swipe>
```

## API

### Props

| 参数         | 说明     | 类型     | 默认值       |
| ------------ | -------- | -------- | ------------ |
| autoplay         | 自动轮播间隔，单位为 ms	 | _string_  _number_ | -            |
| duration         | 动画时长，单位为 s | _string_  _number_ | `500`            |
| loop         | 是否开启循环播放	 | _boolean_  | `true`             |
| show-indicators	         | 是否显示指示器		 | _boolean_  | `true`  |
