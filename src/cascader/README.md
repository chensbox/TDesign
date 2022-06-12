# Cascader 级联选择器

### 介绍

cascader 级联选择器，用于多层级数据的选择，典型场景为省市区选择。

### 引入

```js
import Vue from 'vue'
import { cascader, cell, cellGroup, popup } from 'TDesign'

Vue.use(cascader)
Vue.use(cell)
Vue.use(cellGroup)
Vue.use(popup)
```

## 代码演示

### 基础用法

```html
<cell-group>
  <cell title="地区" placeholder="请选择地区" @click="show = true">
    {{ value }}
  </cell>
</cell-group>
<popup v-model="show" round position="bottom">
  <cascader :options="options" @finish="onFinish" />
</popup>
```

```js
export default {
  setup() {
    const value = ref()
    const show = ref(false)
    const options = [
      {
        text: '广东省',
        children: [
          {
            text: '广州市',
            children: [{ text: '天河区' }, { text: '越秀区' }]
          },
          {
            text: '深圳市',
            children: [{ text: '南山区' }, { text: '宝安区' }]
          }
        ]
      },
      {
        text: '浙江省',
        children: [
          {
            text: '杭州市',
            children: [{ text: '西湖区' }, { text: '余杭区' }]
          },
          {
            text: '温州市',
            children: [{ text: '鹿城区' }, { text: '瓯海区' }]
          }
        ]
      }
    ]

    const onFinish = event => {
      this.show = false
      this.value = e.map(i => i.text).join('/')
    }

    return {
      value,
      options,
      show,
      onFinish
    }
  }
}
```

## API

### Props

| 参数         | 说明                          | 类型               | 默认值                                                   |
| ------------ | ----------------------------- | ------------------ | -------------------------------------------------------- |
| title        | 顶部标题                      | _string_           | -                                                        |
| value        | 选中项的值                    | _string \| number_ | -                                                        |
| options      | 可选项数据源                  | _CascaderOption[]_ | `[]`                                                     |
| placeholder  | 未选中时的提示文案            | _string_           | `请选择`                                                 |
| active-color | 选中状态的高亮颜色            | _string_           | `#1989fa`                                                |
| closeable    | 是否显示关闭图标              | _boolean_          | `false`                                                  |
| show-header  | 是否展示标题栏                | _boolean_          | `true`                                                   |
| field-names  | 自定义 `options` 结构中的字段 | _object_           | `{ text: 'text', value: 'value', children: 'children' }` |

### Option 数据结构

`options` 属性是一个由对象构成的数组，数组中的每个对象配置一个可选项，对象可以包含以下值：

| 键名     | 说明                 | 类型               |
| -------- | -------------------- | ------------------ |
| text     | 选项文字（必填）     | _string_           |
| value    | 选项对应的值（必填） | _string \| number_ |
| children | 子选项列表           | _Option[]_         |

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| type          | 按钮类型 | _string_ | `primary` |
| color `1.0.0` | 按钮颜色 | _string_ | -         |

### Events

| 事件   | 说明                   | 回调参数                                                                           |
| ------ | ---------------------- | ---------------------------------------------------------------------------------- |
| change | 选中项变化时触发       | _{ value: string \| number, selectedOptions: CascaderOption[], tabIndex: number }_ |
| finish | 全部选项选择完成后触发 | _{ value: string \| number, selectedOptions: CascaderOption[], tabIndex: number }_ |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
