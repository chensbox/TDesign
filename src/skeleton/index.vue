<template>
  <div :class="bem()"></div>
</template>

<script>
import { createNamespace } from '../utils'
const [name, bem] = createNamespace('skeleton')
export default {
  name,
  setup() {
    return { bem }
  }
}
</script>

<style lang="less">
@keyframes var-skeleton-animation {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
}
.t-skeleton {
  position: fixed;
  top: 0;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  // margin: 10px auto;
  width: 100vw;
  height: 100vh;
  // border-radius: 20px;
  background: rgba(0, 0, 0, 0.12);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    animation: var-skeleton-animation 1s infinite;
    background: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 100%, 0.3),
      hsla(0, 0%, 100%, 0)
    );
    transition: 0.25s background-color;
  }
}
</style>
