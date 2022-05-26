<template>
  <div class="cell">
    <div class="cell-title cell-item">
      <icon class="left-icon" name="setting" size="17px" v-if="icon" />{{
        title
      }}
    </div>
    <div class="cell-value cell-item">{{ value }} <icon name="right" /></div>
  </div>
</template>

<script>
import icon from '../icon/index.vue'
export default {
  components: { icon },
  props: {
    title: String,
    value: String,
    icon: String
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
  background: #fff;
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
}
</style>
