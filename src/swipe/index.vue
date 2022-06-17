<template></template>

<script>
const name = 'icon'
const props = {
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'inherit'
  }
}

export default {
  name,
  props,
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped></style>
