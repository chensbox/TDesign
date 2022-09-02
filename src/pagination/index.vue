<template>
  <ul :class="bem()">
    <li
      :class="bem('pre-button', { disable: modelValue == 1 })"
      @click="updateModelValue(modelValue - 1)"
    >
      <slot name="prev-text">{{ prevText }}</slot>
    </li>

    <li
      :class="bem('item', { active: page.active })"
      v-for="page in pages"
      :key="page.number"
      @click="updateModelValue(page.number)"
    >
      <slot :page="page">{{ page.text }}</slot>
    </li>

    <li
      :class="bem('next-button', { disable: modelValue == count })"
      @click="updateModelValue(modelValue + 1)"
    >
      <slot name="next-text">{{ nextText }}</slot>
    </li>
  </ul>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import {
  createNamespace,
  falseProp,
  makeNumericProp,
  makeStringProp,
  numericProp
} from '../utils'

const [name, bem] = createNamespace('pagination')

const emits = ['change', 'update:modelValue']

const makePage = (number, text, active) => ({ number, text, active })
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
const props = {
  modelValue: Number,
  prevText: makeStringProp('上一页'),
  nextText: makeStringProp('下一页'),
  pageCount: numericProp,
  totalItems: makeNumericProp(0),
  itemsPerPage: makeNumericProp(10),
  showPageSize: makeNumericProp(5),
  forceEllipses: falseProp
}
function setup(props, { emit }) {
  const count = computed(() => {
    const { pageCount, totalItems, itemsPerPage } = props
    const count = +pageCount || Math.ceil(+totalItems / +itemsPerPage)
    return Math.max(1, count)
  })

  const pages = computed(() => {
    const items = []
    const pageCount = count.value
    const showPageSize = +props.showPageSize
    const { modelValue, forceEllipses } = props

    let startPage = 1
    let endPage = pageCount
    const isMaxSized = showPageSize < pageCount

    if (isMaxSized) {
      startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1)
      endPage = startPage + showPageSize - 1

      if (endPage > pageCount) {
        endPage = pageCount
        startPage = endPage - showPageSize + 1
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      const page = makePage(number, number, number === modelValue)
      items.push(page)
    }

    if (isMaxSized && showPageSize > 0 && forceEllipses) {
      if (startPage > 1) {
        const prevPages = makePage(startPage - 1, '...')
        items.unshift(prevPages)
      }

      if (endPage < pageCount) {
        const nextPages = makePage(endPage + 1, '...')
        items.push(nextPages)
      }
    }
    return items
  })

  const updateModelValue = (value, emitChange = true) => {
    value = clamp(value, 1, count.value)

    if (props.modelValue !== value) {
      emit('update:modelValue', value)

      if (emitChange) {
        emit('change', value)
      }
    }
  }
  watchEffect(() => updateModelValue(props.modelValue, false))
  return {
    bem,
    count,
    pages,
    updateModelValue
  }
}
export default {
  name,
  props,
  emits,
  setup
}
</script>

<style lang="less" scoped>
.t-pagination {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 0 10px;
  color: #1989fa;
  user-select: none;
  &__pre-button,
  &__next-button {
    width: 100px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    border: 0.5px solid #ebedf0;
    &:active {
      color: #fff;
      background: #1989fa;
    }

    &--disable {
      color: #646566;
      opacity: 0.5;
      cursor: not-allowed;
      border: none;
      background-color: #f7f8fa;
      &:active {
        color: #646566;
        background-color: #f7f8fa;
      }
    }
  }
  &__next-button {
    border-left: none;
  }

  &__item {
    text-align: center;
    line-height: 40px;
    flex: 1;
    border: 0.5px solid #ebedf0;
    border-left: none;
    background: #fff;
    &--active {
      color: #fff;
      background: #1989fa;
    }
  }
}
</style>
