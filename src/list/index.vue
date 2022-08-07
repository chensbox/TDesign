<template>
  <div :class="bem()" ref="listRef">
    <slot></slot>
    <div
      :class="bem('place_holder')"
      style="height: 1px"
      ref="placeHolderRef"
    ></div>
    <div :class="bem('loading-text')" v-if="loading && !error">
      <icon name="loading" />
      <span :class="bem('status-text')">{{ loadingText }}</span>
    </div>
    <div :class="bem('status-text')" v-if="finished && !loading">
      {{ finishedText }}
    </div>
    <div :class="bem('status-text')" v-if="error" @click="emitLoad">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { createNamespace, makeStringProp, makeNumericProp } from '../utils'
import icon from '../icon/index.vue'

const [name, bem] = createNamespace('list')

const components = { icon }

const emits = ['load', 'update:error']

const props = {
  loading: Boolean,
  error: Boolean,
  finished: Boolean,
  error: Boolean,
  loadingText: makeStringProp('加载中...'),
  finishedText: makeStringProp('没有更多了'),
  errorText: makeStringProp('请求失败，点击重新加载'),
  direction: makeStringProp('down'),
  offset: makeNumericProp(0)
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

  return { placeHolderRef, listRef, emitLoad, bem }
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
.t-list {
  width: 100%;
  background: #fff;

  &__loading-text,
  &__status-text {
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
