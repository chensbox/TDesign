<template>
  <div class="t-cascader">
    <span class="t-cascader-title"> 请选择所在地区 </span>

    <div class="t-cascader-tab">
      <div
        class="t-cascader-tab-item"
        v-for="(item, index) in selected"
        :key="index"
        :ref="setTabsItemRef"
        @click="onTabSwitch(index)"
      >
        <span>{{ item.text || item }}</span>
      </div>

      <span class="t-cascader-tab-line" ref="lineRef" />
    </div>

    <div class="t-cascader-options" ref="trackRef">
      <ul
        class="t-cascader-options-list"
        v-for="(item, index) in selected"
        :key="index"
      >
        <li
          class="t-cascader-options-list-item"
          v-for="(item, idx) in selectList[index]"
          :key="idx"
          @click="onSelect(item, index)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import icon from '../icon/index.vue'
import { onMounted, onBeforeUpdate, nextTick } from '@vue/runtime-core'
const components = { icon }
const props = { options: Array }
const setup = (props, ctx) => {
  const selected = ref(['请选择'])
  const tabsItemRefs = []
  const lineRef = ref()
  const trackRef = ref()
  const selectList = ref([props.options])
  const tabIndex = ref(0)
  const setTabsItemRef = el => tabsItemRefs.push(el)

  // console.log(props.options)
  // selectList.value.push(props.options)
  const onTabSwitch = index => {
    tabIndex.value = index
    const [tabsNode] = tabsItemRefs[index]['childNodes']
    const { left, width } = tabsNode.getBoundingClientRect()
    const offsetX = index * -100

    lineRef.value.style.width = width + 'px'
    lineRef.value.style.left = `${left}px`
    trackRef.value.style.transform = `translateX(${offsetX}%)`
  }

  const onSelect = (val, idx) => {
    selected.value.push(val)
    // console.log(val)

    selectList.value.push(val.children)
    // console.log(selectList.value)

    nextTick(() => {
      onTabSwitch(idx + 1)
      if (!val.children) {
      }
    })
  }

  onBeforeUpdate(() => (tabsItemRefs.length = 0))

  onMounted(() => {
    // console.log(trackRef.value)
    onTabSwitch(tabIndex.value)

    // console.dir(tabsItemRefs[0]['childNodes'][0].getBoundingClientRect())
  })
  return {
    selected,
    trackRef,
    lineRef,
    selectList,
    tabIndex,
    setTabsItemRef,
    onTabSwitch,
    onSelect
  }
}
export default {
  components,
  props,
  setup
}
</script>
<style lang="less" scoped>
.t-cascader {
  position: relative;
  background: #fff;
  &-title {
    padding: 15px;
  }
  &-tab {
    position: relative;
    padding: 0 5px;
    &-line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      transition: left 0.4s;
      background: #1989fa;
    }
    &-item {
      display: inline-block;
      padding: 0 10px;
      font-size: 14px;
      height: 48px;
      line-height: 48px;
      &:last-child {
        background: red;
        color: #969799;
      }
    }
  }
  &-options {
    display: flex;
    width: 100%;
    transition: all 0.4s;
    &-list {
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
</style>
