# VirtualList 虚拟列表


### 介绍

手动阀手动阀


### 引入

```js
import { createApp } from 'vue'
import { signature  } from 'TDesign'
const app = createApp()
app.use(signature)
```

## 代码演示

### 基础用法
监听sava事件，可以在事件对象接收到保存的img的file格式和dataUrl格式，支持自定义filename和图片格式。
```html
  <signature @save="save" @reset="reset"></signature>
```
```js
function save(event) {
  console.log(event)
  const imgWrap = document.querySelector('.img-wrap')
  const img = document.createElement('img')
  img.setAttribute('src', event.url)
  imgWrap.appendChild(img)
}
function reset() {
  const imgWrap = document.querySelector('.img-wrap')
  imgWrap.innerHTML = ''
}
```

### 配合popup使用
 配合popup使用时可以指定fullscreen字段，让画板铺满全屏
```html
<cell title="弹出signatrue" @click="signShow = true"></cell>
<popup v-model="signShow" position="left">
  <signature :height="height" @save="signShow = false" fullscreen/>
</popup>
```
### 自定义线宽和颜色

```html
<signature :line-width="width" :color="color"/>
<popup v-model="show" position="bottom">
  <picker :colums="colums" title="设置线宽和颜色" @change="onChange" />
</popup>
```
```js
const colums = [
  {
    values: ['2', '4', '6', '8', '10'],
  },
  {
    values: ['red', 'blue', 'black'],
  }
]
const width = ref(5)
const color = ref('black')
const onChange = e => {
  width.value = e[0]
  color.value = e[1]
}
```


## API

### Props

| 参数         | 说明     | 类型     | 默认值       |
| ------------ | -------- | -------- | ------------ |
| width       | 画布宽度	 | _string_  _number_ | `设备最大宽度`    |
| height      | 画布高度 | _string_  _number_ | `500`            |
| lineWidth   |线宽	 | _string_  _number_  | `2`             |
| color        | 画线颜色		 | _string_  | `black`  |
|filename      | 保存的文件名     | _string_| `signature`|
|fullscreen | 是否开启全屏画布| _Boolean_| `false`|
|imgType|   保存的图片格式| _string_| `png`(可选png、jpeg、webp)|