<template>
  <teleport to="body">
    <transition name="slide-fade">
      <div
        class="mask"
        v-show="modelValue"
        @click="$emit('update:modelValue', false)"
      ></div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue']
}
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  z-index: 1;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
