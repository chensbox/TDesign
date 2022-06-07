<template>
  <div class="t-cascader">
    <span class="t-cascader-title"> 请选择所在地区 </span>

    <div class="t-cascader-tab">
      <div
        class="t-cascader-tab-item"
        v-for="(item, index) in selected"
        :key="index"
        :ref="setTabsItemRef"
        :class="{ gray: index == selected.length - 1 && !isFinish }"
        @click="onTabSwitch(index)"
      >
        <span>{{ item.text || item }}</span>
      </div>

      <span class="t-cascader-tab-line" ref="lineRef" />
    </div>

    <div class="t-cascader-options" ref="trackRef">
      <ul
        class="t-cascader-options-list"
        v-for="(item, tabIdx) in selected"
        :key="tabIdx"
      >
        <li
          class="t-cascader-options-list-item"
          v-for="(li, liIdx) in selectList[tabIdx]"
          :key="liIdx"
          :class="{ active: selected[tabIdx].active == liIdx }"
          @click="onSelect(li, tabIdx, liIdx)"
        >
          {{ li.text }}
          <icon
            name="check"
            class="check"
            size="16px"
            v-if="selected[tabIdx].active == liIdx"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import icon from '../icon/index.vue'
import { onMounted, onBeforeUpdate, nextTick } from '@vue/runtime-core'

const name = 'Cascader'
const emits = ['finish']
const components = { icon }
const props = { options: Array }
const setup = (props, { emit }) => {
  const selected = ref(['请选择'])
  const tabsItemRefs = []
  const lineRef = ref()
  const trackRef = ref()
  const selectList = ref([props.options])
  const tabIndex = ref(0)
  const isFinish = ref(false)
  const setTabsItemRef = el => tabsItemRefs.push(el)

  // console.log(props.options)
  // selectList.value.push(props.options)
  const onTabSwitch = index => {
    tabIndex.value = index
    const [tabsNode] = tabsItemRefs[index]['childNodes']
    const { left, width } = tabsNode.getBoundingClientRect()
    const offsetX = index * -100

    lineRef.value.style.width = `${width}px`
    lineRef.value.style.left = `${left}px`
    trackRef.value.style.transform = `translateX(${offsetX}%)`
  }

  const onSelect = (val, idx, i) => {
    isFinish.value = val.children ? false : true
    selected.value = selected.value.slice(0, idx)
    selectList.value = selectList.value.slice(0, idx + 1)
    if (val.children) {
      selected.value.push(val, '请选择')
    } else {
      selected.value.push(val)
      emit('finish', selected.value)
    }
    selected.value[idx].active = i
    val.children && selectList.value.push(val.children)
    nextTick(() => {
      val.children && onTabSwitch(idx + 1)
    })
  }

  onBeforeUpdate(() => (tabsItemRefs.length = 0))

  onMounted(() => {
    onTabSwitch(tabIndex.value)
  })
  return {
    selected,
    trackRef,
    lineRef,
    selectList,
    tabIndex,
    isFinish,
    setTabsItemRef,
    onTabSwitch,
    onSelect
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
<style lang="less" scoped>
.t-cascader {
  position: relative;
  background: #fff;
  &-title {
    line-height: 50px;
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
      border-radius: 1rem;
      transition: left 0.4s;
      background: #1989fa;
    }
    &-item {
      display: inline-block;
      padding: 0 10px;
      font-size: 14px;
      height: 38px;
      line-height: 38px;
      cursor: pointer;
    }
  }
  &-options {
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
        &:active {
          // background: #f2f3f5;
          background: rgba(25, 137, 250, 0.1);
        }
      }
    }
  }
}
.active {
  background: rgba(25, 137, 250, 0.1);
  color: #1989fa;
}
.gray {
  color: #969799;
}
</style>
