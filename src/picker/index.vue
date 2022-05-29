<template>
  <div class="picker">
    <div class="picker-toolbar">
      <button class="picker-toolbar-cancel">取消</button>
      <span class="picker-toolbar-title">标题</span>
      <button class="picker-toolbar-confirm">确定</button>
    </div>
    <div class="picker-columns">
      <template v-if="initY">
        <colum :initY="initY" :itemHeight="itemHeight" />
        <colum :initY="initY" :itemHeight="itemHeight" />
        <colum :initY="initY" :itemHeight="itemHeight" />
      </template>
      <div class="picker-columns-mask"></div>
      <div class="picker-columns-hairline" ref="hairlineRef"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import colum from './colum.vue'
const name = 't-picker'

export default {
  name,
  components: { colum },
  setup(props, ctx) {
    const hairlineRef = ref()
    const curY = ref('')
    const initY = ref('')
    const itemHeight = ref('')
    onMounted(() => {
      const { value: hairlineEl } = hairlineRef
      curY.value = initY.value =
        hairlineEl.offsetTop - hairlineEl.clientHeight / 2
      itemHeight.value = hairlineEl.clientHeight
    })

    return {
      hairlineRef,
      curY,
      initY,
      itemHeight
    }
  }
}
</script>

<style lang="less">
.picker {
  overflow: hidden;
  height: 307px;
  margin: 10px;
  border-radius: 8px;
  user-select: none;
  background: #ffffff;
  &-toolbar {
    display: flex;
    justify-content: space-between;
    height: 44px;
    &-cancel {
      color: #969799;
    }
    &-confirm {
      color: #576b91;
    }
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
    display: flex;
    overflow: hidden;
    height: 263px;
    position: relative;
    &-col {
      flex: 1;
      height: 100%;
      &-wrap {
        // transition: all 0.5s ease-out;
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
