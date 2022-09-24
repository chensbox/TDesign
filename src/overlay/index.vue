<template>
  <teleport to="body">
    <transition name="slide-fade">
      <div
        :class="bem({ transparent })"
        v-if="show"
        @touchmove="onTouchmove"
        @click="$emit('click')"
      >
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { noop, preventDefault, createNamespace, truthProp } from '../utils'
const [name, bem] = createNamespace('overlay')
export default {
  name,
  props: {
    show: Boolean,
    transparent: Boolean,
    lockScroll: truthProp
  },
  emits: ['click'],
  setup({ lockScroll }) {
    return { bem, onTouchmove: lockScroll ? preventDefault : noop }
  }
}
</script>

<style lang="less" scoped>
.t-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 10;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  &--transparent {
    background: rgba(0, 0, 0, 0);
  }
}
.transparent {
  background: rgba(0, 0, 0, 0);
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
