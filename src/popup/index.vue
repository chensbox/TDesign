<template>
  <transition name="slide-fade">
    <div
      class="popup"
      v-show="modelValue"
      @click="$emit('update:modelValue', false)"
    >
      <overlay
        :show="modelValue"
        @click="$emit('update:modelValue', false)"
      ></overlay>
    </div>
  </transition>
</template>

<script>
import overlay from '../overlay/index.vue'
export default {
  components: { overlay },
  props: {
    modelValue: Boolean
  }
}
</script>

<style lang="less" scoped>
.popup {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 30%;
  background: #fff;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100%);
}
</style>
