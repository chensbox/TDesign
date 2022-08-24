<template>
  <div class="cell-group">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  emits: ['click']
}
</script>

<style lang="less">
.cell-group {
  overflow: hidden;
  border-radius: 10px;
  margin: 15px;
}
</style>
