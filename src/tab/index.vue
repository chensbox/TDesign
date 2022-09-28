<template>
  <div class="t-tabs__panel" ref="self">
    <slot v-if="shouldRender">
      <div class="empty">{{ title }}内容区</div>
    </slot>
  </div>
</template>
<script>
import { ref, inject, onMounted } from 'vue'
import { useLazyRender } from '../utils'
const name = 'tab'
const props = {
  title: String
}
export default {
  name,
  props,
  setup() {
    let rendered
    const self = ref()
    const index = ref()
    const parent = inject('tabs')

    const { shouldRender } = useLazyRender(() => {
      const { lazyRender, modelValue } = parent
      if (rendered || !lazyRender || modelValue === index.value) {
        return (rendered = true)
      }
      return false
    })

    onMounted(() => {
      const clientWidth = document.body.clientWidth
      index.value = self.value.offsetLeft / clientWidth
    })
    return { self, shouldRender }
  }
}
</script>
