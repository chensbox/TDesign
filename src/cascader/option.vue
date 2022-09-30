<template>
  <ul :class="bem('options-list')">
    <li
      :class="bem('options-item', { active: isActive(tabIndex, liIndex) })"
      v-for="(li, liIndex) in list"
      :key="liIndex"
      @click="$emit('select', li, tabIndex, liIndex)"
    >
      {{ li.text }}
      <icon
        name="check"
        class="check"
        size="16px"
        v-if="isActive(tabIndex, liIndex)"
      />
    </li>
  </ul>
</template>

<script>
import icon from '../icon/index.vue'
import { createNamespace, makeArrayProp, numericProp } from '../utils'
const [name, bem] = createNamespace('cascader')
const props = {
  tabIndex: numericProp,
  list: makeArrayProp(),
  isActive: Function
}

export default {
  name,
  props,
  components: { icon },
  setup: () => ({ bem })
}
</script>
