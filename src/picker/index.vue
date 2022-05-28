<template>
  <div class="picker">
    <div class="picker-toolbar">
      <button class="picker-toolbar-cancel">取消</button>
      <span class="picker-toolbar-title">标题</span>
      <button class="picker-toolbar-confirm">确定</button>
    </div>
    <div class="picker-columns">
      <div class="picker-columns-col">
        <ul
          class="picker-columns-col-wrap"
          ref="scrollAreaRef"
          @touchstart.prevent="touchstart"
          @touchmove.prevent="touchmove"
          @touchend.prevent="touchend"
        >
          <li class="picker-columns-col-wrap-item" v-for="i in 16" :key="i">
            第 {{ i }} 项
          </li>
        </ul>
      </div>
      <div class="picker-columns-mask"></div>
      <div class="picker-columns-hairline" ref="hairlineRef"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import { sleep } from '../utils'
const name = 't-picker'
const setPositon = (y, el, immediate = false) => {
  if (!immediate) {
    el.value.style.transition = 'all 0.2s linear'
  }
  el.value.style.transform = `translateY(${y}px)`

  sleep().then(() => (el.value.style.transition = 'all 0s linear'))
}
export default {
  name,
  setup(props, ctx) {
    const scrollAreaRef = ref()
    const hairlineRef = ref()
    let initY, startY, moveY, curY, maxY, minY, toY, itemHeight

    const touchstart = e => (startY = e.touches[0].pageY)

    const touchmove = e => {
      moveY = e.touches[0].pageY
      toY = curY + moveY - startY
      if (toY <= maxY && toY >= minY) {
        setPositon(toY, scrollAreaRef, true)
      }
    }

    const touchend = e => {
      if (!moveY) {
        const index = e.target.__vnode.key
        curY = toY = initY - (index - 1) * itemHeight
        return setPositon(toY, scrollAreaRef)
      }

      if (toY > maxY - itemHeight) {
        curY = toY = maxY - itemHeight
        return setPositon(toY, scrollAreaRef)
      } else if (toY < minY + itemHeight) {
        curY = toY = minY + itemHeight
        return setPositon(toY, scrollAreaRef)
      }
      const distance = Math.abs(initY - toY)
      const m = distance % itemHeight
      if (m < itemHeight >> 1) {
        toY = initY - (distance - m)
      } else {
        toY = initY - (distance + (itemHeight - m))
      }
      setPositon(toY, scrollAreaRef)
      curY = toY
      moveY = 0
    }

    onMounted(() => {
      const { value: hairlineEl } = hairlineRef
      curY = initY = hairlineEl.offsetTop - hairlineEl.clientHeight / 2
      scrollAreaRef.value.style.transform = `translateY(${initY}px)`
      maxY = initY + hairlineEl.clientHeight
      minY = initY - hairlineEl.clientHeight * 16
      itemHeight = hairlineEl.clientHeight
    })

    return {
      scrollAreaRef,
      hairlineRef,
      touchstart,
      touchmove,
      touchend
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
    overflow: hidden;
    height: 263px;
    position: relative;
    &-col {
      height: 100%;
      &-wrap {
        // transition: all 0.5s linear;
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
