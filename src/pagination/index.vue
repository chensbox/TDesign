<template>
  <ul :class="bem()">
    <li :class="bem('pre-button', { disable: active == 1 })" @click="prePage">
      上一页
    </li>
    <li
      :class="bem('item', { active: active == i + offset })"
      v-for="i in 5"
      :key="i"
    >
      {{ i + offset }}
    </li>
    <li
      :class="bem('next-button', { disable: active == pagesCount })"
      @click="nextPage"
    >
      下一页
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue'
import { createNamespace } from '../utils'
const [name, bem] = createNamespace('pagination')
function setup(props) {
  const offset = ref(0)
  const pagesCount = ref(13)
  const active = ref(1)
  const middle = Math.floor(5 / 2)
  const prePage = () => {
    if (active.value == 1) {
      return
    }
    if (
      active.value > middle + 1 &&
      pagesCount.value - active.value >= middle
    ) {
      offset.value--
    }
    active.value--
  }
  const nextPage = () => {
    if (active.value == pagesCount.value) {
      return
    }
    if (active.value > middle && active.value + middle < pagesCount.value) {
      offset.value++
    }
    active.value++
  }
  return { bem, active, offset, prePage, nextPage, pagesCount }
}
export default {
  name,
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
