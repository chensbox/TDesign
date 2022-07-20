<template>
  <div class="list" ref="listRef">
    <slot></slot>
    <div class="place_holder" ref="placeHolderRef"></div>
    <div class="loading-text" v-if="loading && !error">
      <icon name="loading" /> <span class="status-text">{{ loadingText }}</span>
    </div>
    <div class="status-text" v-if="finished">{{ finishedText }}</div>
    <div class="status-text" v-if="error" @click="emitLoad">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import icon from '../icon/index.vue'

const name = 'list'

const components = { icon }

const emits = ['load', 'update:error']

const props = {
  loading: Boolean,
  error: Boolean,
  finished: Boolean,
  error: Boolean,
  loadingText: { type: String, default: '加载中...' },
  finishedText: { type: String, default: '没有更多了' },
  errorText: { type: String, default: '请求失败，点击重新加载' },
  direction: { type: String, default: 'down' },
  offset: { type: [String, Number], default: 0 }
}

function setup(props, { emit }) {
  let observer
  const placeHolderRef = ref()
  const listRef = ref()
  const isIntersectingCallBack = ([entries]) => {
    if (entries.isIntersecting && !props.loading) {
      observer.unobserve(placeHolderRef.value)
      emit('load')
    }
  }

  const emitLoad = () => {
    emit('update:error', false)
    emit('load')
  }
  const stopReTry = watch(
    () => props.loading,
    isLoading => {
      if (props.finished) {
        observer.disconnect()
        return stopReTry()
      }
      if (!isLoading) {
        observer.observe(placeHolderRef.value)
      }
    }
  )

  onMounted(() => {
    const options = {
      rootMargin: `${props.offset}px`
    }
    observer = new IntersectionObserver(isIntersectingCallBack, options)
    observer.observe(placeHolderRef.value)
  })

  return { placeHolderRef, listRef, emitLoad }
}
export default {
  name,
  components,
  emits,
  props,
  setup
}
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  background: #fff;

  .loading-text,
  .status-text {
    margin: 20px auto;
    font-size: 14px;
    text-align: center;
    color: #969799;
    .icon {
      margin-bottom: 3px;
    }
    span {
      margin-left: 5px;
    }
  }
}
</style>
