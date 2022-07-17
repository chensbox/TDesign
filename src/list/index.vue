<template>
  <div class="list">
    <div class="place_holder">底部</div>
  </div>
</template>

<script>
const name = 'list'

const emits = ['load']

const props = {
  loading: Boolean,
  error: Boolean,
  finished: Boolean,
  error: Boolean,
  loadingText: String,
  finishedText: String,
  errorText: String,
  direction: { type: String, default: 'down' },
  offset: { type: [String, Number], default: 0 }
}

function setup(props) {}
export default {
  name,
  emits,
  props,
  setup
}
</script>

<style lang="less" scoped>
.list {
  // min-height: 100vh;
  width: 100%;
  background: #fff;
}
</style>
