<template>
  <div class="tabs-box">
    <div class="tabs-head" ref="tabsHeadRef">
      <div
        class="tabs-select-item"
        v-for="(it, id) in slots"
        :key="id"
        :ref="setTabsItemRef"
        @click="tabsSwitch(id)"
      >
        <span>{{ it.props.title }}</span>
      </div>
      <div
        class="line"
        ref="lineRef"
        :class="{ line_animation: lineAnimation }"
        :style="{ background: color }"
      ></div>
    </div>

    <div
      class="tabs-track"
      ref="trackRef"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      :class="{ tabs_animation: tabAnimation }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUpdate, onMounted, useAttrs } from '@vue/runtime-core'
import { ref, useSlots } from 'vue'

const props = defineProps({
  lineAnimation: {
    default: false,
    type: Boolean
  },
  tabAnimation: {
    default: false,
    type: Boolean
  },
  color: String,
  swipeable: {
    default: false,
    type: Boolean
  }
})
const touchend = () => {
  if (!props.swipeable) return
  direction = moveX - startX
  if (Math.abs(direction) < 70) return
  const to = direction > 0 ? attr.modelValue - 1 : attr.modelValue + 1
  if (to >= 0 && to < tabsItemRefs.length) return tabsSwitch(to)
}

let startX, moveX, direction
const touchstart = e => (startX = e.touches[0].pageX)
const touchmove = e => (moveX = e.touches[0].pageX)
const emit = defineEmits(['update:modelValue'])
const setTabsItemRef = el => tabsItemRefs.push(el)
const slots = useSlots().default()
const attr = useAttrs()
const lineRef = ref()
const tabsItemRefs = []
const trackRef = ref()
const tabsHeadRef = ref()

const tabsSwitch = index => {
  const { left, width } =
    tabsItemRefs[index]['childNodes'][0].getBoundingClientRect()
  const offsetX = index * -100
  const mid = tabsHeadRef.value.clientWidth / 2
  const cur = left + width / 2
  const isLeft = mid > cur
  lineRef.value.style.width = width + 'px'
  lineRef.value.style.left = `${left + tabsHeadRef.value.scrollLeft}px`
  trackRef.value.style.transform = `translateX(${offsetX}%)`

  let scrollL = 0
  if (isLeft && tabsHeadRef.value.scrollLeft) {
    scrollL = Math.abs(mid - cur) * -1
  } else if (!isLeft) {
    scrollL = Math.abs(mid - cur)
  }

  const move = setInterval(() => {
    if (Math.round(scrollL)) {
      tabsHeadRef.value.scrollLeft += scrollL / 10
      scrollL -= scrollL / 10
    } else {
      clearInterval(move)
    }
  }, 10)

  emit('update:modelValue', index)
}

onMounted(() => {
  tabsSwitch(attr.modelValue)
})
onBeforeUpdate(() => {
  tabsItemRefs.length = 0
})
watch(
  () => attr.modelValue,
  () => tabsSwitch(attr.modelValue)
)
</script>

<style lang="less">
.tabs-box {
  // min-width: 375px;
  overflow: hidden;
  .tabs-head {
    display: flex;
    position: relative;
    background: #ffffff;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 10px;
    justify-content: space-between;
    transition: all 0.4s;
    .tabs-select-item {
      flex: 1 0 auto; //很关键
      font-size: 14px;
      user-select: none; /* Standard syntax */
      text-align: center;
      margin: 0 14px;
      display: inline-block;
      cursor: pointer;
    }
    .line {
      position: absolute;
      background-color: blue;
      height: 3px;
      width: 15px;
      border-radius: 3px;
      bottom: 0;
      left: 28px;
    }
  }
  .tabs-track {
    display: flex;
    width: 100%;
    height: 100%;
    //transition: all 0.4s; //开启切换动画
    .tabs-body {
      box-sizing: border-box;
      flex-shrink: 0;
      min-height: 100px;
      width: 100%;
      padding: 20px;
      font-size: 16px;
      background-color: #ffffff;
    }
  }
}
* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent; /* For some Androids */
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.line_animation {
  transition: all 0.4s;
}
.tabs_animation {
  transition: all 0.4s;
}
</style>
