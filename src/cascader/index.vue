<template>
  <div class="t-cascader">
    <span class="t-cascader-title"> 请选择所在地区 </span>
    <div class="t-cascader-tab">
      <span
        class="t-cascader-tab-item"
        v-for="(item, index) in selected"
        :key="index"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import icon from '../icon/index.vue'
const components = { icon }
const props = {
  options: Array
}
const setup = props => {
  const selected = ref(['请选择'])

  console.log(props)
  return {
    selected
  }
}
export default {
  props,
  setup
}
</script>
<style lang="less" scoped>
.t-cascader {
  position: relative;
  background: #fff;
  &-title {
    padding: 15px;
  }
  &-tab {
    margin: 15px 0;
    padding: 0 5px;

    &-item {
      padding: 0 10px;
      font-size: 14px;
      &:last-child {
        color: #969799;
      }
    }
  }
}
</style>
