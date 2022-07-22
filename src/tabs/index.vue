<template>
  <div :class="bem({ cover })">
    <div :class="bem('head')" ref="tabsHeadRef">
      <div
        :class="
          bem('tab', {
            'not-allow': it.props.disable == '' || it.props.disable
          })
        "
        v-for="(it, id) in slots"
        :key="id"
        :ref="setTabsItemRef"
        @click="tabsSwitch(id)"
      >
        <span :class="{ blod: attrs.modelValue === id }">
          <icon :name="it.props.icon" v-if="it.props.icon" />
          {{ it.props.title }}
        </span>
      </div>

      <div :class="bem('line', { animation: lineAnimation })" ref="lineRef" />
    </div>

    <div :class="bem('track', { animation: tabAnimation })" ref="trackRef">
      <slot />
    </div>
  </div>
</template>

<script>
import icon from '../icon/index.vue'

import { ref, toRefs, watch, onMounted, onUnmounted, onBeforeUpdate } from 'vue'

import { smoothMove, tabsChange, useSwipeable } from './hooks'

import {
  falseProp,
  createNamespace,
  makeStringProp,
  makeNumericProp
} from '../utils'

const [name, bem] = createNamespace('tabs')

const props = {
  cover: Boolean,
  lineAnimation: falseProp,
  tabAnimation: falseProp,
  swipeable: falseProp,
  color: makeStringProp('#0052d9'),
  swipeThreshold: makeNumericProp(5)
}

const components = { icon }

const emits = ['update:modelValue']

function setup(props, { attrs, slots, emit }) {
  let active
  const { color, swipeThreshold } = toRefs(props)
  const lineRef = ref()
  const tabsItemRefs = []
  const trackRef = ref()
  const tabsHeadRef = ref()
  const useSlot = slots.default()
  slots = useSlot[0].children instanceof Array ? useSlot[0].children : useSlot

  const setTabsItemRef = el => tabsItemRefs.push(el)

  const tabsSwitch = index => {
    if (index === active) {
      return
    }
    active = index

    const classList = tabsItemRefs[index].classList.value
    if (classList.includes(`${bem('tab')}--not-allow`)) {
      return
    }

    const cur = tabsChange(index, tabsItemRefs, lineRef, trackRef, tabsHeadRef)

    if (slots.length > swipeThreshold.value) {
      smoothMove(tabsHeadRef, cur)
    }

    emit('update:modelValue', index)
  }

  const { touchstart, touchmove, touchend } = useSwipeable(
    attrs,
    tabsItemRefs,
    tabsSwitch
  )

  onMounted(() => {
    const index = attrs.modelValue
    const tabCount = tabsItemRefs.length
    const initSelectEl = tabsItemRefs[index]
    const isDisabled = initSelectEl.classList.value.includes(
      `${bem('tab')}--not-allow`
    )

    tabsSwitch(isDisabled ? (index + 1) % tabCount : index)

    if (props.swipeable) {
      trackRef.value.addEventListener('touchstart', touchstart)
      trackRef.value.addEventListener('touchmove', touchmove)
      trackRef.value.addEventListener('touchend', touchend)
    }
  })

  onBeforeUpdate(() => (tabsItemRefs.length = 0))

  onUnmounted(() => {
    if (props.swipeable) {
      trackRef.value.removeEventListener('touchstart', touchstart)
      trackRef.value.removeEventListener('touchmove', touchmove)
      trackRef.value.removeEventListener('touchend', touchend)
    }
  })

  watch(
    () => attrs.modelValue,
    () => tabsSwitch(attrs.modelValue)
  )

  return {
    bem,
    slots,
    attrs,
    lineRef,
    trackRef,
    touchend,
    touchmove,
    touchstart,
    tabsSwitch,
    tabsHeadRef,
    setTabsItemRef
  }
}

export default {
  name,
  props,
  emits,
  setup,
  components
}
</script>

<style lang="less">
.t-tabs {
  overflow: hidden;
  &__head {
    display: flex;
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 10px;
    justify-content: space-between;
    transition: all 0.4s;
    background: #ffffff;
  }
  &__track {
    display: flex;
    width: 100%;
    height: 100%;
    &--animation {
      transition: all 0.4s;
    }
  }
  &__panel {
    box-sizing: border-box;
    flex-shrink: 0;
    min-height: 100px;
    width: 100%;
    padding: 20px;
    font-size: 16px;
    background-color: #ffffff;
  }
  &__tab {
    position: relative;
    display: inline-block;
    flex: 1 0 auto; //很关键
    z-index: 999;
    margin: 0 14px;
    padding: 0 5px;
    font-size: 14px;
    user-select: none;
    text-align: center;
    cursor: pointer;
    color: #646566;
    &--not-allow {
      cursor: not-allowed !important;
      opacity: 0.4;
    }
  }
  &__line {
    position: absolute;
    height: 3px;
    width: 15px;
    border-radius: 4px;
    bottom: 0;
    left: 28px;
    background: v-bind(color);
    &--animation {
      transition: all 0.4s;
    }
  }

  &--cover {
    .t-tabs__head {
      background: #eeeeee;
    }
    .t-tabs__line {
      height: 70%;
      top: 50%;
      transform: translateY(-50%);
      background: #ffffff !important;
      box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px;
    }
    .t-tabs__tab {
      margin: 0;
      span {
        padding: 0 10px;
      }
    }
  }
}

.blod {
  font-weight: bold;
  color: #323233;
}

* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
