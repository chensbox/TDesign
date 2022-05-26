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
  .cell {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .cell:not(.cell:last-child)::after {
    position: absolute;
    box-sizing: border-box;
    pointer-events: none;
    bottom: 0;
    left: 50%;
    transform: scaleY(0.5) translateX(-50%);
    width: 90%;
    height: 1px;
    background: #ebedf0;
    content: ' ';
  }
}
</style>
