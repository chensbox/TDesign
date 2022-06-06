<template>
  <div class="cell" @click="$emit('click')">
    <div class="cell-title cell-item">
      <icon class="left-icon" name="setting" size="17px" v-if="icon" />
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
  position: relative;
  padding: 0 15px;
  min-height: 43px;
  cursor: pointer;
  background: #fff;
  &-input-value {
    color: #323233;
    font-size: 16px;
    font-weight: 200;
  }
  &-title {
    color: #646566;
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
