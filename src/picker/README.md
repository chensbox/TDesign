# Picker 选择器

### 介绍

提供多个选项集合供用户选择，支持单列选择和多列级联，通常与弹出层组件配合使用。

### 引入

```js
import { createApp } from 'vue'
import { Picker } from 'vant'
const app = createApp()
app.use(Picker)
```

## 代码演示

### 基础用法

```html
<picker
  :colums="colums"
  title="标题"
  @change="onChange"
  @confirm="onConfirm"
  @cancel="onCancel"
/>
```

```js
export default {
  setup() {
    const colums = [
      'javaScript',
      'HTML',
      'CSS',
      'TypeScript',
      'Vue',
      'React',
      'WebPack',
      'Uniapp',
      'React navite',
      'canvas',
      'WebGl'
    ]

    return {
      colums
    }
  }
}
```

### 多列数据

```html
<picker
  :colums="columns2"
  title="标题"
  @change="onChange"
  @confirm="onConfirm"
  @cancel="onCancel"
/>
```

```js
export default {
  setup() {
   const columns = [
        // 第一列
        {
          values: ['周一', '周二', '周三', '周四', '周五'],
          defaultIndex: 2
        },
        // 第二列
        {
          values: ['上午', '下午', '晚上'],
          defaultIndex: 1
        }
      ],

    return {
      colums
    }
  }
}
```

### 多列数据

```html
<picker
  :colums="columns2"
  title="标题"
  @change="onChange"
  @confirm="onConfirm"
  @cancel="onCancel"
/>
```

```js
export default {
  setup() {
    const columns = [
      {
        text: '广东',
        children: [
          {
            text: '广州',
            children: [
              { text: '天河区' },
              { text: '越秀区' },
          },
          {
            text: '深圳',
            children: [
              { text: '南山区' },
              { text: '宝安区' },
            ]
          },
        ]
      },
      {
        text: '浙江',
        children: [
          {
            text: '杭州',
            children: [{ text: '西湖区' }, { text: '余杭区' }]
          },
          {
            text: '温州',
            children: [{ text: '鹿城区' }, { text: '瓯海区' }]
          }
        ]
      },
    ]

    return {
      colums
    }
  }
}
```

## API

### Props

| 参数                | 说明                           | 类型               | 默认值                                                     |
| ------------------- | ------------------------------ | ------------------ | ---------------------------------------------------------- |
| columns             | 对象数组，配置每一列显示的数据 | _Column[]_         | `[]`                                                       |
| columns-field-names | 自定义 `columns` 结构中的字段  | _object_           | `{ text: 'text', values: 'values', children: 'children' }` |
| title               | 顶部栏标题                     | _string_           | -                                                          |
| confirm-button-text | 确认按钮文字                   | _string_           | `确认`                                                     |
| cancel-button-text  | 取消按钮文字                   | _string_           | `取消`                                                     |
| show-toolbar        | 是否显示顶部栏                 | _boolean_          | `true`                                                     |
| default-index       | 单列选择时，默认选中项的索引   | _number \| string_ | `0`                                                        |

### Column 数据结构

当传入多列数据时，`columns` 为一个对象数组，数组中的每一个对象配置每一列，每一列有以下 `key`:

| 键名         | 说明                       | 类型                      |
| ------------ | -------------------------- | ------------------------- |
| values       | 列中对应的备选值           | _Array<string \| number>_ |
| defaultIndex | 初始选中项的索引，默认为 0 | _number_                  |
| children     | 级联选项                   | _Column_                  |

### Events

当选择器有多列时，事件回调参数会返回数组。

| 事件名  | 说明               | 回调参数                                                                     |
| ------- | ------------------ | ---------------------------------------------------------------------------- |
| confirm | 点击完成按钮时触发 | 单列：选中值，选中值对应的索引<br>多列：所有列选中值，所有列选中值对应的索引 |
| cancel  | 点击取消按钮时触发 | 单列：选中值，选中值对应的索引<br>多列：所有列选中值，所有列选中值对应的索引 |
| change  | 选项改变时触发     | 单列：选中值，选中值对应的索引<br>多列：所有列选中值，当前列对应的索引       |
