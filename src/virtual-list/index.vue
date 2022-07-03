<template>
  <div class="virtual-list" @scroll="handleScroll" ref="listBoxRef">
    <div class="scroller" ref="scrollerRef">
      <slot
        v-for="(item, index) in visibleList"
        :key="index"
        :item="item"
        :index="index"
      />
    </div>
    <div class="placeholder" :style="{ height: scrollHeight + 'px' }" />
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref } from '@vue/runtime-core'
const name = 'VirtualList'
const emits = ['save', 'reset']
const components = {}
const props = {
  list: { type: Array, default: () => [] }
}

function setup(props, { emit }) {
  const visibleList = ref(props.list.slice(0, 1))
  const scrollerRef = ref()
  const itemHeight = ref(0)
  const listBoxRef = ref()
  const scrollHeight = computed(() => itemHeight.value * props.list.length)

  const updateVisibleData = (scrollTop = 0) => {
    const visibleCount = Math.ceil(
      scrollerRef.value.clientHeight / itemHeight.value
    )
    const start = Math.floor(scrollTop / itemHeight.value)
    const end = start + visibleCount
    visibleList.value = props.list.slice(start, end)
    console.log(visibleList.value.length)
    scrollerRef.value.style.webkitTransform = `translate3d(0, ${
      start * itemHeight.value
    }px, 0)`
  }
  const handleScroll = () => {
    // console.log(1)
    const scrollTop = listBoxRef.value.scrollTop
    updateVisibleData(scrollTop)
    console.log(scrollTop)
  }
  onMounted(() => {
    const offsetTop = listBoxRef.value.offsetTop
    itemHeight.value = scrollerRef.value.children[0].clientHeight
    scrollerRef.value.style.height =
      document.body.clientHeight - offsetTop + 'px'
    updateVisibleData()
  })
  return { listBoxRef, scrollerRef, scrollHeight, visibleList, handleScroll }
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
.virtual-list {
  position: relative;
  overflow: scroll;
  .scroller {
  }
}
.placeholder {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -999;
}
</style>
