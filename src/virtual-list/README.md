# VirtualList 虚拟列表


### 介绍
虚拟列表会按需渲染可视区内的列表项。组件会监听scroll事件，有一定的最低性能开销，适用于超长列表的场景，否则不建议使用。

### 实现原理
  组件内部没有直接渲染传入的`list`，而是通过计算去截取list的数据到`可视区列表`，在监听scroll的过程中不断替换这个`可视区列表`。
  你可能认为这将导致组件丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

### 引入

```js
import { createApp } from 'vue'
import { VirtualList  } from 'TDesign'
const app = createApp()
app.use(VirtualList)
```

## 代码演示

### 基础用法
默认作用域插槽会将列表项和索引传递过来，通过作用域插槽，你可以给列表项写任何你喜欢的样式，
```html
  <virtual-list :list="list">
    <template v-slot="slotProps">
      <div class="list-item" :key="slotProps.index">
        {{ slotProps.item}}
      </div>
    </template>
  </virtual-list>
```

```js
const list = new Array(10000).fill(0).map((item, index) => index + 1)
```




## API

### Props

| 参数         | 说明     | 类型     | 默认值       |
| ------------ | -------- | -------- | ------------ |
| list       | 数据列表	 | _Array_ |  -    |


### Slot

| 名称         | 说明     | 
| ------------ | -------- | 
| default       | 组件内部通过作用域插槽将列表项`item`和索引`index`传递给父组件	 |