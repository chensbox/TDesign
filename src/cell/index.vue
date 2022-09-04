<template>
  <div :class="bem()" @click="$emit('click', $event)">
    <div :class="[bem('title'), bem('item')]">
      <icon :class="bem('left-icon')" :name="icon" size="17px" v-if="icon" />
      {{ title }}
    </div>
    <div :class="[bem('input-value'), bem('item')]">
      <slot>
        <span :class="bem('placeholder')">{{ placeholder }}</span>
      </slot>
    </div>
    <div :class="[bem('value'), bem('item')]">
      {{ value }}
      <icon name="right" />
    </div>
  </div>
</template>

<script>
import icon from '../icon/index.vue'
import { createNamespace } from '../utils'
const [name, bem] = createNamespace('cell')
export default {
  name,
  components: { icon },
  props: {
    title: String,
    value: String,
    icon: String,
    placeholder: String
  },
  emits: ['click'],
  setup() {
    return { bem }
  }
}
</script>

<style lang="less" scoped>
.t-cell {
  display: flex;
  position: relative;
  padding: 0 15px;
  min-height: 43px;
  justify-content: space-between;
  align-content: center;
  cursor: pointer;
  user-select: none;
  background: #fff;
  &__input-value {
    color: #323233;
    font-size: 16px;
    font-weight: 200;
  }
  &__title {
    color: #323233;
  }
  &__left-icon {
    margin: 0 3px 3px 0;
  }
  &__value {
    color: #969799;
  }
  &__item {
    font-size: 14px;
    line-height: 43px;
  }
  &__placeholder {
    color: #c8c9cc;
  }
  &:not(.cell:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    pointer-events: none;
    bottom: 0;
    left: 50%;
    transform: scaleY(0.5) translateX(-50%);
    width: 92%;
    height: 1px;
    background: #ebedf0;
    content: ' ';
  }
}
</style>
