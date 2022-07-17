<template>
  <div class="list" ref="listRef">
    <slot></slot>
    <div class="place_holder" ref="placeHolderRef">dibu</div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
const name = 'list'

const emits = ['load']

const props = {
  loading: Boolean,
  error: Boolean,
  finished: Boolean,
  error: Boolean,
  loadingText: String,
  finishedText: String,
  errorText: String,
  direction: { type: String, default: 'down' },
  offset: { type: [String, Number], default: 0 }
}

function setup(props, { emit }) {
  let observer
  const placeHolderRef = ref()
  const listRef = ref()
  const isIntersectingCallBack = ([entries]) => {
    console.log(entries.isIntersecting)
    if (entries.isIntersecting) {
      emit('load')
    }
  }

  onMounted(() => {
    const options = {
      rootMargin: `${props.offset}px`
    }
    observer = new IntersectionObserver(isIntersectingCallBack, options)
    nextTick(() => {
      observer.observe(placeHolderRef.value)
      console.log(observer)
    })
  })

  return { placeHolderRef, listRef }
}
export default {
  name,
  emits,
  props,
  setup
}
</script>

<style lang="less" scoped>
.list {
  // min-height: 100vh;
  width: 100%;
  background: #fff;
}
</style>
