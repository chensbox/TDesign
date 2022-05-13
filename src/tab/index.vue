<template>
  <div class="tabs-body">
    <slot>
      <div class="empty">{{ title }}内容区</div>
    </slot>
  </div>
</template>
<script>
const name = 'tab'
const props = {
  title: String,
  disable: Boolean
}
export default {
  name,
  props
}
</script>
