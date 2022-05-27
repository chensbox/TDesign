<template>
  <div class="picker">
    <div class="picker-toolbar">
      <button>取消</button>
      <span class="picker-toolbar-title">标题</span>
      <button>确定</button>
    </div>
    <div class="picker-columns">
      <div class="picker-columns-col">
        <ul class="picker-columns-col-wrap" ref="scrollAreaRef">
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
          <li class="picker-columns-col-wrap-item">1</li>
        </ul>
      </div>
      <div class="picker-columns-mask"></div>
      <div class="picker-columns-hairline" ref="hairlineRef"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
const name = 't-picker'
export default {
  name,
  setup(props, ctx) {
    const scrollAreaRef = ref()
    const hairlineRef = ref()
    let startY, moveY,

    const touchstart = e => (startY = e.touches[0].pageY)

    const touchmove = e => (moveY = e.touches[0].pageY)

    const touchend = () => moveY - startY

    onMounted(() => {
      const { value: hairlineEl } = hairlineRef
      const initY = hairlineEl.offsetTop - hairlineEl.clientHeight / 2
      scrollAreaRef.value.style.transform = `translateY(${initY}px)`
    })

    return {
      scrollAreaRef,
      hairlineRef
    }
  }
}
</script>

<style lang="less" scoped>
.picker {
  overflow: hidden;
  height: 307px;
  margin: 10px;
  // padding-top: 8px;
  border-radius: 8px;
  user-select: none;
  background: #ffffff;
  &-toolbar {
    display: flex;
    justify-content: space-between;
    height: 44px;
    &-title {
      line-height: 44px;
      font-size: 17px;
    }
    button {
      width: 50px;
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }
  &-columns {
    overflow: hidden;
    height: 263px;
    position: relative;
    &-col {
      height: 100%;
      &-wrap {
        transition: all 0.5s linear;
        // transform: translateY(110px);
        cursor: grab;
        &-item {
          height: 44px;
          line-height: 44px;
          font-size: 16px;
          color: #323232;
          text-align: center;
        }
      }
    }
    &-hairline {
      position: absolute;
      height: 44px;
      top: 50%;
      left: 16px;
      right: 16px;
      pointer-events: none;
      transform: translateY(-50%);
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border: 1px solid #e7e6e6;
        transform: scale(0.5);
        border-width: 1px 0;
      }
    }
    &-mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.4)
        ),
        linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.4)
        );
      background-repeat: no-repeat;
      background-position: top, bottom;
      transform: translateZ(0);
      pointer-events: none;
      background-size: 100% 110px;
    }
  }
}
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
