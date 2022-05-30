<template>
  <div class="picker">
    <div class="picker-toolbar">
      <button class="picker-toolbar-cancel">取消</button>
      <span class="picker-toolbar-title">标题</span>
      <button class="picker-toolbar-confirm">确定</button>
    </div>
    <div class="picker-columns">
      <template v-if="initY">
        <colum
          :initY="initY"
          :itemHeight="itemHeight"
          :list="col"
          v-for="(col, index) in columsList"
          :index="index"
          :key="index"
          @columChange="columChange"
        />
      </template>
      <div class="picker-columns-mask"></div>
      <div class="picker-columns-hairline" ref="hairlineRef"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'

import colum from './colum.vue'

const name = 't-picker'

const props = {
  colums: Array
}

const components = { colum }

const setup = function (props, ctx) {
  const hairlineRef = ref()
  const curY = ref('')
  const initY = ref('')
  const itemHeight = ref('')
  const columsList = ref([])
  // console.warn(props.colums)
  const [el] = props.colums

  let isCascader = false
  const getChildren = Treelist => {
    const children = []
    const helper = list => {
      const cur = list.map(it => it.text)
      cur.value = list
      children.push(cur)
      if (list[0].children) {
        helper(list[0].children)
      }
    }
    helper(Treelist)
    return children
  }

  const columChange = (columList, changeIndex, columIndex) => {
    console.log(columIndex)

    if (!isCascader) {
      return
    }

    columsList.value = columsList.value.slice(0, columIndex + 1)
    if (columIndex == 0) {
      columsList.value.push(...getChildren(props.colums[changeIndex].children))
    } else {
      columsList.value.push(
        ...getChildren(columList.value[changeIndex].children)
      )
    }
  }
  if (typeof el !== 'object') {
    columsList.value.push(props.colums)
  } else if (el.values) {
    columsList.value.push(...props.colums.map(it => it.values))
  } else if (el.children) {
    isCascader = true
    columsList.value.push(...getChildren(props.colums))
  }

  onMounted(() => {
    const { value: hairlineEl } = hairlineRef
    curY.value = initY.value =
      hairlineEl.offsetTop - hairlineEl.clientHeight / 2
    itemHeight.value = hairlineEl.clientHeight
  })

  return {
    hairlineRef,
    curY,
    initY,
    itemHeight,
    columsList,
    columChange
  }
}
export default {
  name,
  props,
  components,
  setup
}
</script>

<style lang="less">
.picker {
  overflow: hidden;
  height: 307px;
  margin: 10px;
  border-radius: 8px;
  user-select: none;
  background: #ffffff;
  &-toolbar {
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
  &-columns {
    display: flex;
    overflow: hidden;
    height: 263px;
    position: relative;
    &-col {
      flex: 1;
      height: 100%;
      &-wrap {
        // transition: all 0.5s ease-out;
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
