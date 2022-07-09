<template>
  <div
    class="pull-refresh"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <slot></slot>
  </div>
</template>

<script>
const name = 'pull-refresh'
const props = {}
function setup(props, context) {
  const touchstart = e => {
    console.log(touchstart)
  }
  const touchmove = e => {
    console.log(touchmove)
  }
  const touchend = e => {
    console.log(touchend)
  }
  return { touchstart, touchmove, touchend }
}
export default {
  name,
  props,
  setup
}
</script>
