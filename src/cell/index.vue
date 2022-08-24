<template>
  <div class="cell" @click="$emit('click', $event)">
    <div class="cell-title cell-item">
      <icon class="left-icon" :name="icon" size="17px" v-if="icon" />
      {{ title }}
    </div>
    <div class="cell-input-value cell-item">
      <slot>
        <span class="cell-placeholder">{{ placeholder }}</span>
      </slot>
    </div>
    <div class="cell-value cell-item">
      {{ value }}
      <icon name="right" />
    </div>
  </div>
</template>

<script>
import icon from '../icon/index.vue'
export default {
  components: { icon },
  props: {
    title: String,
    value: String,
    icon: String,
    placeholder: String
  },
  data() {
    return {}
  },
  emits: ['click']
}
</script>

<style lang="less" scoped>
.cell {
  display: flex;
  position: relative;
  padding: 0 15px;
  min-height: 43px;
  justify-content: space-between;
  align-content: center;
  cursor: pointer;
  background: #fff;
  &-input-value {
    color: #323233;
    font-size: 16px;
    font-weight: 200;
  }
  &-title {
    color: #323233;
    .left-icon {
      margin: 0 3px 3px 0;
    }
  }
  &-value {
    color: #969799;
  }
  &-item {
    font-size: 14px;
    line-height: 43px;
  }
  &-placeholder {
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

* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
</style>
