<template>
  <div :class="bem({ cover })">
    <div :class="bem('head')" ref="tabsHeadRef">
      <div
        :class="bem('tab', { disabled: it.disabled })"
        v-for="(it, id) in tabsList"
        :key="id"
        :ref="setTabsItemRef"
        @click="tabsSwitch(id)"
      >
        <span :class="{ blod: modelValue === id }">
          <icon :name="it.icon" v-if="it.icon" />
          {{ it.title }}
        </span>
      </div>

      <div :class="bem('line', { animation: true })" ref="lineRef" />
    </div>

    <div :class="bem('track', { animation })" ref="trackRef">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import icon from '../icon/index.vue'
import { ref, watch, provide, onMounted, onBeforeUpdate } from 'vue'
import { useSwipeable } from './hooks'

import {
  raf,
  falseProp,
  createNamespace,
  makeStringProp,
  makeNumericProp,
  numericProp,
  truthProp
} from '../utils'

const [name, bem] = createNamespace('tabs')

const props = {
  modelValue: numericProp,
  cover: falseProp,
  animation: falseProp,
  swipeable: falseProp,
  lazyRender: truthProp,
  color: makeStringProp('#0052d9'),
  swipeThreshold: makeNumericProp(5)
}

const components = { icon }

const emits = ['update:modelValue']

function setup(props, { slots, emit }) {
  provide('tabs', props)
  let active
  const { swipeThreshold, swipeable, modelValue } = props
  const lineRef = ref()
  const tabsList = ref([])
  const tabsItemRefs = []
  const trackRef = ref()
  const tabsHeadRef = ref()

  const formatSlot = () => {
    let newSlotList
    const slotList = slots.default()
    const [slotElement] = slotList
    if (slotElement.children instanceof Array) {
      newSlotList = slotElement.children
    } else {
      newSlotList = slotList
    }

    tabsList.value = newSlotList.map(slots => {
      const { props } = slots
      props.disabled = 'disabled' in props && props.disabled !== false
      return props
    })
  }

  const setTabsItemRef = el => tabsItemRefs.push(el)

  const smoothScroll = (el, cur) => {
    const mid = el.value.clientWidth / 2
    const isLeft = mid > cur

    let distance = 0
    if (isLeft && el.value.scrollLeft) {
      distance = Math.abs(mid - cur) * -1
    } else if (!isLeft) {
      distance = Math.abs(mid - cur)
    }

    const macroTick = () => {
      raf(() => {
        if (Math.round(distance)) {
          el.value.scrollLeft += Math.round(distance / 8)
          distance -= Math.round(distance / 8)
          macroTick()
        }
      })
    }
    macroTick()
  }
  const tabsSwitch = index => {
    if (index === active) {
      return
    }

    const { disabled } = tabsList.value.at(index)

    if (disabled) {
      return
    }

    active = index
    const offsetX = index * -100
    const [tabText] = tabsItemRefs.at(index).childNodes
    const { left, width } = tabText.getBoundingClientRect()
    const middle = left + width / 2
    lineRef.value.style.width = `${width}px`
    lineRef.value.style.left = `${left + tabsHeadRef.value.scrollLeft}px`
    trackRef.value.style.transform = `translateX(${offsetX}%)`

    if (tabsList.value.length > swipeThreshold) {
      smoothScroll(tabsHeadRef, middle)
    }

    emit('update:modelValue', index)
  }

  watch(
    () => props.modelValue,
    () => tabsSwitch(props.modelValue)
  )

  formatSlot()

  onBeforeUpdate(() => (tabsItemRefs.length = 0))

  onMounted(() => {
    const index = modelValue
    const tabCount = tabsItemRefs.length
    const { disabled } = tabsList.value.at(index)

    tabsSwitch(disabled ? (index + 1) % tabCount : index)

    if (swipeable) {
      useSwipeable(props, tabCount, tabsSwitch).addListener(trackRef)
    }
  })

  return {
    bem,
    lineRef,
    tabsList,
    trackRef,
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
    flex: 1 0 auto;
    z-index: 999;
    margin: 0 14px;
    padding: 0 5px;
    font-size: 14px;
    user-select: none;
    text-align: center;
    cursor: pointer;
    color: #646566;

    &--disabled {
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

[class^='t-tabs'] {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
