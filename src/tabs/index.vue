<template>
  <div :class="['tabs-box', cover ? 'cover' : '']">
    <div class="tabs-head" ref="tabsHeadRef">
      <div
        class="tabs-select-item"
        v-for="(it, id) in slots"
        :key="id"
        :ref="setTabsItemRef"
        :class="{ 'not-allow': it.props.disable == '' || it.props.disable }"
        @click="tabsSwitch(id)"
      >
        <span :class="{ blod: attrs.modelValue === id }">
          <icon :name="it.props.icon" v-if="it.props.icon" />
          {{ it.props.title }}
        </span>
      </div>

      <div
        class="line"
        ref="lineRef"
        :class="{ line_animation: lineAnimation }"
        :style="{ background: color }"
      />
    </div>

    <div
      class="tabs-track"
      ref="trackRef"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      :class="{ tabs_animation: tabAnimation }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { onBeforeUpdate, onMounted, watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import icon from '../icon/index.vue'

const name = 'tabs'

const props = {
  lineAnimation: {
    type: Boolean,
    default: false
  },
  tabAnimation: {
    type: Boolean,
    default: false
  },
  swipeable: {
    type: Boolean,
    default: false
  },
  color: String,
  cover: Boolean
}

const components = { icon }

const emits = ['update:modelValue']

function setup(props, { attrs, slots, emit }) {
  let startX, moveX, direction, active

  const lineRef = ref()

  const tabsItemRefs = []

  const trackRef = ref()

  const tabsHeadRef = ref()

  const useSlot = slots.default()

  slots = useSlot[0].children instanceof Array ? useSlot[0].children : useSlot

  const setTabsItemRef = el => tabsItemRefs.push(el)

  const touchstart = e => (startX = e.touches[0].pageX)

  const touchmove = e => (moveX = e.touches[0].pageX)

  const touchend = () => {
    if (!props.swipeable) {
      return
    }

    direction = moveX - startX

    if (Math.abs(direction) < 70) {
      return
    }

    const to = direction > 0 ? attrs.modelValue - 1 : attrs.modelValue + 1

    if (to >= 0 && to < tabsItemRefs.length) {
      tabsSwitch(to)
    }
  }

  const tabsSwitch = index => {
    if (index === active) {
      return
    }
    active = index

    if (tabsItemRefs[index].classList.value.includes('not-allow')) {
      return
    }

    const [tabsNode] = tabsItemRefs[index]['childNodes']

    const { left, width } = tabsNode.getBoundingClientRect()

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
    if (tabsItemRefs[attrs.modelValue].classList.value.includes('not-allow')) {
      tabsSwitch(attrs.modelValue + 1)
    } else {
      tabsSwitch(attrs.modelValue)
    }
  })

  onBeforeUpdate(() => {
    tabsItemRefs.length = 0
  })

  watch(
    () => attrs.modelValue,
    () => tabsSwitch(attrs.modelValue)
  )

  return {
    slots,
    attrs,
    tabsSwitch,
    setTabsItemRef,
    touchstart,
    touchmove,
    touchend,
    tabsHeadRef,
    lineRef,
    trackRef
  }
}

export default {
  name,
  props,
  emits,
  components,
  setup
}
</script>

<style lang="less">
.tabs-box {
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
      position: relative;
      flex: 1 0 auto; //很关键
      z-index: 999;
      padding: 0 5px;
      font-size: 14px;
      user-select: none; /* Standard syntax */
      text-align: center;
      margin: 0 14px;
      display: inline-block;
      cursor: pointer;
      color: #646566;
    }
    .line {
      position: absolute;
      background-color: #0052d9;
      height: 3px;
      width: 15px;
      border-radius: 4px;
      bottom: 0;
      left: 28px;
    }
  }
  .tabs-track {
    display: flex;
    width: 100%;
    height: 100%;
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

.line_animation {
  transition: all 0.4s;
}
.tabs_animation {
  transition: all 0.4s;
}
.blod {
  font-weight: bold;
  color: #323233;
}
.not-allow {
  cursor: not-allowed !important;
  opacity: 0.4;
}

.cover {
  .tabs-head {
    background: #eeeeee;
    .line {
      background: #ffffff;
      box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px;
      height: 70%;
      top: 50%;
      transform: translateY(-50%);
    }
    .tabs-select-item {
      margin: 0;
      span {
        padding: 0 10px;
      }
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
</style>
