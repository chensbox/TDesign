<template>
  <div class="toast" v-if="show">{{ text }}</div>
</template>

<script>
const name = 'toast'
const props = {
  size: Number,
  text: {
    type: String,
    default: 'default test~~'
  },
  show: {
    type: Boolean,
    default: false
  }
}
export default {
  name,
  props
}
</script>

<style scoped>
.toast {
  height: 30px;
  width: 100px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  line-height: 30px;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
