<template>
  <div :class="bem()">
    <span :class="bem('title')"> 请选择所在地区 </span>

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
      <ul
        :class="bem('options-list')"
        v-for="(item, tabIdx) in selected"
        :key="tabIdx"
      >
        <li
          :class="bem('options-list-item', { active: isActive(tabIdx, liIdx) })"
          v-for="(li, liIdx) in selectList[tabIdx]"
          :key="liIdx"
          @click="onSelect(li, tabIdx, liIdx)"
        >
          {{ li.text }}
          <icon
            name="check"
            class="check"
            size="16px"
            v-if="isActive(tabIdx, liIdx)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import icon from '../icon/index.vue'
import { createNamespace, makeArrayProp } from '../utils'
import { ref, onMounted, onBeforeUpdate, nextTick } from 'vue'

const [name, bem] = createNamespace('cascader')

const emits = ['finish']

const components = { icon }
const props = { options: makeArrayProp() }

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

  const isGray = index => {
    return !isFinish.value && index == selected.value.length - 1
  }
  const isActive = (tabIndex, liIndex) => {
    return selected.value[tabIndex].active == liIndex
  }
  onBeforeUpdate(() => (tabsItemRefs.length = 0))

  onMounted(() => nextTick(() => onTabSwitch(tabIndex.value)))
  return {
    bem,
    isGray,
    isActive,
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
      // left: 15px;
      // width: 42px;
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
          background: rgba(25, 137, 250, 0.1);
          color: #1989fa;
        }

        &:active {
          // background: #f2f3f5;
          background: rgba(25, 137, 250, 0.1);
        }
      }
    }
  }
}
</style>
