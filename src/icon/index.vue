<template>
  <i
    :class="['icon', `icon-${name}`, name.includes('loading') ? 'loading' : '']"
    :style="{ 'font-size': size }"
  />
</template>

<script>
export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'inherit'
    }
  }
}
</script>

<style lang="less" scoped>
@import 'style.css';
.loading {
  display: inline-block;
  color: inherit;
  line-height: 100%;
  animation: rotate 2s infinite linear;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
.icon {
  vertical-align: middle;
  font-size: inherit;
  // font-weight: inherit;
  line-height: 100%;
  display: inline-block;
}
</style>
