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
<cell-gropu>
  <cell title="单元格" value="内容"></cell>
  <cell title="单元格" value="内容"></cell>
  <cell title="单元格" value="内容"></cell>
</cell-gropu>
```

### 插入图标

```html
<cell-gropu>
  <cell title="单元格" value="内容" icon="location"></cell>
  <cell title="单元格" value="内容" icon="question-circle"></cell>
  <cell title="单元格" value="内容" icon="ashbin"></cell>
</cell-gropu>
```

### 插入值

```html
<cell-gropu>
  <cell title="地区" placeholder="请选择地区"></cell>
  <cell title="地区">广东/广州/天河区</cell>
</cell-gropu>
```

### 基础用法

```html
<cell-gropu>
  <cell title="单元格" value="内容"></cell>
  <cell title="单元格" value="内容"></cell>
  <cell title="单元格" value="内容"></cell>
</cell-gropu>
```

## API

### Props

| 参数        | 说明           | 类型     | 默认值 |
| ----------- | -------------- | -------- | ------ |
| title       | 单元格标题     | _string_ | -      |
| value       | 单元格右侧文案 | _string_ | -      |
| icon        | 左侧图标名称   | _string_ | -      |
| placeholder | 占位文字       | _string_ | -      |
