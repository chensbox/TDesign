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
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    display: block;
    box-sizing: border-box;
    padding: 30px 60px;
    background-color: white;
    pointer-events: none;
  }
  &:nth-child(2n) {
    background: #39a9ed;
  }
  &:nth-child(2n + 1) {
    background: #66c6f2;
  }
}
</style>
