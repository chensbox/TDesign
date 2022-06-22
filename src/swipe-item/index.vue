<template>
  <div class="swipe-item">
    <slot />
  </div>
</template>

<style lang="less">
.swipe-item {
  width: 100%;
  flex-shrink: 0;
  font-size: 40px;
  text-align: center;
  line-height: 30vh;
  color: #fff;
  &:nth-child(2n) {
    background: #39a9ed;
  }
  &:nth-child(2n + 1) {
    background: #66c6f2;
  }
}
</style>
