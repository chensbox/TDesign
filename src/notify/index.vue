<template>
  <div :class="bem()">消息通知</div>
</template>

<script>
import { createNamespace } from '../utils'
const [name, bem] = createNamespace('notify ')
console.log(bem(), name)

function setup(props) {
  return { bem }
}
export default {
  name,
  setup
}
</script>
