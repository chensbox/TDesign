<template>
  <ul :class="bem('options-list')">
    <li
      :class="bem('options-item', { active: isActive(tabIndex, item) })"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('select', item, tabIndex, index)"
    >
      {{ item.text }}
      <icon
        name="check"
        class="check"
        size="16px"
        v-if="isActive(tabIndex, item)"
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
  name: `${name}-option`,
  props,
  components: { icon },
  setup: () => ({ bem })
}
</script>
