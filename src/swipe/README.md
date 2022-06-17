# Icon 字体图标

### 介绍

Icon 字体图标 是一个字体图标组件

### 引入

```js
import Vue from 'vue'
import { icon } from 'TDesign'

Vue.use(icon)
```

## 代码演示

### 基础用法

```html
<icon name="loading" size="50px"></icon>

<icon name="close" size="50px"></icon>

<icon name="attachment" size="50px"></icon>

<icon name="camera" size="50px"></icon>

<icon name="arrow-right" size="50px"></icon>

<icon name="bottom" size="50px"></icon>
```

## API

### Props

| 参数         | 说明     | 类型     | 默认值       |
| ------------ | -------- | -------- | ------------ |
| name         | 图标名称 | _string_ | -            |
| size `1.0.0` | 图标尺寸 | _string_ | `继承父元素` |
