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
import { computed, onMounted, ref } from '@vue/runtime-core'
const name = 'VirtualList'
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
    scrollerRef.value.style.webkitTransform = `translate3d(0, ${
      start * itemHeight.value
    }px, 0)`
  }
  let tick
  const handleScroll = () => {
    if (tick) {
      return
    }
    tick = true
    requestAnimationFrame(() => {
      const scrollTop = listBoxRef.value.scrollTop
      updateVisibleData(scrollTop)
      tick = false
    })
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
  props,
  setup
}
</script>

<style lang="less">
.virtual-list {
  position: relative;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.placeholder {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -999;
}

.virtual-list::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
  border-left: 1px solid rgba(0, 0, 0, 0);
}
.virtual-list::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.virtual-list::-webkit-scrollbar-thumb {
  background-color: rgba(191, 191, 191, 191);
  background-clip: padding-box;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  min-height: 28px;
}
.virtual-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
</style>
