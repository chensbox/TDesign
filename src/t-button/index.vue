<template>
  <button class="t-button" :style="{ background: color }">
    <icon name="loading" class="icon" size="mini"></icon>
    <slot />
  </button>
</template>

<script>
import icon from '../icon/index.vue'

export default {
  name: 't-button',
  components: { icon },
  props: {
    color: String,
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="less">
.t-button {
  padding: 0px 20px;
  color: #fff;
  font-size: 16px;
  line-height: 36px;
  background-color: #f44;
  border: none;
  border-radius: 20px;
}
.icon {
  line-height: 36px;
  font-size: 16px;
}
</style>
