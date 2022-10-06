<template>
  <div :class="bem()">
    <div :class="bem('toolbar')">
      <button :class="bem('toolbar-cancel')" @click="emitEvent('cancel')">
        {{ cancelButtonText }}
      </button>
      <span :class="bem('toolbar-title')">{{ title }}</span>
      <button :class="bem('toolbar-confirm')" @click="emitEvent('confirm')">
        {{ confirmButtonText }}
      </button>
    </div>
    <div :class="bem('columns')">
      <template v-if="initialOffset">
        <Column
          v-for="(col, index) in columnsList"
          :list="col"
          :key="index"
          :index="index"
          :itemHeight="itemHeight"
          :initialOffset="initialOffset"
          @columnChange="columnChange"
        />
      </template>
      <div :class="bem('mask')"></div>
      <div :class="bem('hairline')" ref="hairlineRef"></div>
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, ref, watch } from 'vue'
import {
  isObject,
  createNamespace,
  makeArrayProp,
  makeStringProp,
  useIntersectionObserver
} from '../utils'
import Column from './column.vue'

const [name, bem] = createNamespace('picker')

const props = {
  title: String,
  confirmButtonText: makeStringProp('确定'),
  cancelButtonText: makeStringProp('取消'),
  columns: makeArrayProp()
}
const emits = ['confirm', 'cancel', 'change']
const components = { Column }

function setup(props, { emit }) {
  const hairlineRef = ref()
  const initialOffset = ref('')
  const itemHeight = ref('')
  const columnsList = ref([])
  let isCascader, changeValue

  const emitEvent = event => emit(event, changeValue)

  const formatData = () => {
    const { columns } = props
    const [el] = columns
    if (!isObject(el)) {
      columnsList.value.push(columns)
    } else if (el.values) {
      columnsList.value = columns.map(it => it.values)
    } else if (el.children) {
      isCascader = true
      columnsList.value = flattenChildren(columns)
    }
    changeValue = initChangeValue(columnsList.value)
  }

  const updateColumn = (column, changeIndex, columnIndex) => {
    const target = column.value[changeIndex]
    const children = flattenChildren(target.children)
    columnsList.value = columnsList.value.slice(0, columnIndex + 1)
    columnsList.value = columnsList.value.concat(children)
    return children
  }

  const flattenChildren = treelist => {
    const children = []
    const list = treelist.map(item => item.text)
    list.value = treelist
    children.push(list)
    if (treelist[0].children) {
      return children.concat(flattenChildren(treelist[0].children))
    }
    return children
  }

  const makeChangeValue = (column, index) => ({
    index,
    value: column[index]
  })

  const initChangeValue = columnList =>
    columnList.map(column => makeChangeValue(column, 0))

  const columnChange = (column, changeIndex, columnIndex) => {
    changeValue[columnIndex] = makeChangeValue(column, changeIndex)

    if (isCascader && columnIndex !== props.columns.length - 1) {
      const children = updateColumn(column, changeIndex, columnIndex)

      changeValue = changeValue
        .slice(0, columnIndex + 1)
        .concat(initChangeValue(children))
    }

    emitEvent('change')
  }

  onMounted(function init() {
    const { offsetTop, clientHeight } = hairlineRef.value
    if (!offsetTop && !clientHeight) {
      return useIntersectionObserver(hairlineRef.value, init)
    }
    initialOffset.value = offsetTop - clientHeight / 2
    itemHeight.value = clientHeight
  })

  formatData()

  return {
    bem,
    emitEvent,
    itemHeight,
    hairlineRef,
    columnsList,
    columnChange,
    initialOffset
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
.t-picker {
  overflow: hidden;
  height: 307px;
  margin: 10px;
  border-radius: 8px;
  user-select: none;
  background: #ffffff;
  &__toolbar {
    display: flex;
    justify-content: space-between;
    height: 44px;
    &-cancel {
      font-size: 14px;
      color: #969799;
    }
    &-confirm {
      font-size: 14px;
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
      outline: none;
      cursor: pointer;
    }
  }
  &__columns {
    display: flex;
    overflow: hidden;
    height: 263px;
    position: relative;
  }
  &__column {
    flex: 1;
    height: 100%;
    &-wrapper {
      // transition: all 0.5s ease-out;
      // transform: translateY(110px);
      cursor: grab;
    }
    &-item {
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      color: #323232;
      text-align: center;
    }
  }
  &__mask {
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
      linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    transform: translateZ(0);
    pointer-events: none;
    background-size: 100% 110px;
  }
  &__hairline {
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
}
</style>
