# InfiniteScroll 无限滚动

## 代码演示

### 基础用法

```html
<div class="list" v-infinite-list="load">
  <div v-for="i in count" :key="i">{{ i }}</div>
</div>
```
```js
const count = ref(20)
function load() {
  //下拉触底时，load函数将会被调用
  count.value++
}
```
