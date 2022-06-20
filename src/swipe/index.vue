<template>
  <div class="swipe">
    <slot />
  </div>
</template>

<script>
const name = 'swipe'
const props = {}

function setup(props, ctx) {}

export default {
  name,
  props,
  setup
}
</script>

<style lang="less">
.swipe {
  height: 30vh;
  width: 100%;
  background: pink;
}
</style>
