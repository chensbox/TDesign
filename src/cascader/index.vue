<template>
  <div :class="bem()">
    <span :class="bem('title')"> {{ title }} </span>
    <div :class="bem('tab')">
      <div
        :class="bem('tab-item', { gray: isGray(index) })"
        v-for="(item, index) in selected"
        :key="index"
        :ref="setTabsItemRef"
        @click="onTabSwitch(index)"
      >
        <span>{{ item.text || item }}</span>
      </div>

      <span :class="bem('tab-line')" ref="lineRef" />
    </div>

    <div :class="bem('options')" ref="trackRef">
      <cascader-option
        v-for="(item, index) in selected"
        :key="index"
        :tabIndex="index"
        :isActive="isActive"
        :list="selectList[index]"
        @select="onSelect"
      >
      </cascader-option>
    </div>
  </div>
</template>
<script>
import icon from '../icon/index.vue'
import cascaderOption from './option.vue'
import {
  createNamespace,
  makeArrayProp,
  makeStringProp,
  numericProp,
  useMutationObserver
} from '../utils'
import { ref, watch, onMounted, onBeforeUpdate, nextTick } from 'vue'

const [name, bem] = createNamespace('cascader')

const emits = ['finish', 'update:modelValue']

const components = { icon, cascaderOption }
const props = {
  title: String,
  modelValue: numericProp,
  placeholder: makeStringProp('请选择'),
  options: makeArrayProp(),
  activeColor: makeStringProp('#1989fa')
}

const setup = (props, { emit }) => {
  let curVal
  let isFinish = false
  const { placeholder, options } = props
  const selected = ref([placeholder])
  const tabsItemRefs = []
  const lineRef = ref()
  const trackRef = ref()
  const selectList = ref([options])
  const tabIndex = ref(0)
  const setTabsItemRef = el => tabsItemRefs.push(el)

  const onTabSwitch = index => {
    const [tabsNode] = tabsItemRefs[index].childNodes
    const { left, width } = tabsNode.getBoundingClientRect()
    if (!left && !width) {
      return useMutationObserver(tabsNode, () => onTabSwitch(index))
    }
    const offsetX = index * -100
    lineRef.value.style.width = `${width}px`
    lineRef.value.style.left = `${left}px`
    trackRef.value.style.transform = `translateX(${offsetX}%)`
  }

  const onSelect = (val, tabIndex, liIndex) => {
    isFinish = !val.children
    selected.value = selected.value.slice(0, tabIndex)
    selectList.value = selectList.value.slice(0, tabIndex + 1)
    if (val.children) {
      selected.value.push(val, placeholder)
    } else {
      selected.value.push(val)
      emit('finish', selected.value)
    }
    selected.value[tabIndex].active = liIndex
    val.children && selectList.value.push(val.children)

    emit('update:modelValue', (curVal = val.value))
    nextTick(() => {
      val.children && onTabSwitch(tabIndex + 1)
    })
  }

  const isGray = index => {
    return !isFinish && index == selected.value.length - 1
  }
  const isActive = (tabIndex, list) => {
    return selected.value[tabIndex].value == list.value
  }

  const setValue = newVal => {
    const newSelectOption = []
    const newSelectTab = []
    const dfs = treeList => {
      for (const tree of treeList) {
        if (tree.value == newVal) {
          newSelectTab.unshift(tree)
          tree.children && newSelectOption.unshift(tree.children)
          return newSelectOption.unshift(treeList)
        }
        if (tree.children && dfs(tree.children)) {
          newSelectTab.unshift(tree)
          return newSelectOption.unshift(treeList)
        }
      }
    }

    dfs(options)
    if (!newSelectOption.length || !newSelectTab.length) {
      return
    }
    selected.value = newSelectTab
    selectList.value = newSelectOption
    isFinish = !newSelectTab.at(-1)?.children
    if (!isFinish) {
      selected.value.push(placeholder)
    }
    setTimeout(() => onTabSwitch(selected.value.length - 1))
  }
  watch(
    () => props.modelValue,
    newVal => {
      if (newVal && newVal !== curVal) {
        curVal = newVal
        setValue(newVal)
      }
    },
    { immediate: true }
  )
  onBeforeUpdate(() => (tabsItemRefs.length = 0))

  onMounted(() => nextTick(() => onTabSwitch(tabIndex.value)))

  return {
    bem,
    isGray,
    lineRef,
    onSelect,
    isActive,
    selected,
    trackRef,
    selectList,
    onTabSwitch,
    setTabsItemRef
  }
}
export default {
  name,
  emits,
  components,
  props,
  setup
}
</script>
<style lang="less">
.t-cascader {
  position: relative;
  background: #fff;
  &__title {
    line-height: 50px;
    padding: 15px;
  }
  &__tab {
    position: relative;
    padding: 0 5px;
    &-line {
      position: absolute;
      bottom: 0;
      height: 3px;
      border-radius: 1rem;
      transition: left 0.4s;
      background: v-bind(activeColor);
    }
    &-item {
      display: inline-block;
      padding: 0 10px;
      font-size: 14px;
      height: 38px;
      line-height: 38px;
      cursor: pointer;
      &--gray {
        color: #969799;
      }
    }
  }
  &__options {
    display: flex;
    width: 100%;
    transition: all 0.4s;
    &-list {
      padding-top: 10px;
      box-sizing: border-box;
      flex-shrink: 0;
      min-height: 380px;
      width: 100%;
      font-size: 14px;
      background-color: #ffffff;
    }
    &-item {
      position: relative;
      height: 40px;
      padding: 0 15px;
      line-height: 40px;
      user-select: none;
      .check {
        position: absolute;
        right: 5%;
        top: 50%;
        font-weight: bolder;
        transform: translateY(-50%);
      }
      &--active {
        color: v-bind(activeColor);
      }

      &:active {
        // background: #f2f3f5;
        background: rgba(25, 137, 250, 0.1);
      }
    }
  }
}
</style>
