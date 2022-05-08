<template>
  <button
    :class="['t-button', type, size, plain ? 'plain' : '']"
    :style="{ background: color }"
    @click="onClick"
  >
    <icon :name="icon" class="btn-icon" v-if="icon" />
    <span class="btn-text"><slot /></span>
  </button>
</template>

<script setup>
import Icon from '../icon/index.vue'
const emit = defineEmits(['click'])
const props = defineProps({
  color: String,
  type: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'normal'
  },
  plain: {
    type: Boolean,
    default: false
  },
  icon: String
})
const onClick = function (event) {
  emit('click', event)
}
</script>

<style lang="less">
.t-button {
  padding: 0px 10px;
  color: #fff;
  font-size: 16px;
  line-height: 36px;
  background-color: #f44;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn-text {
  margin-left: 2px;
  vertical-align: middle;
}

.default {
  border: 1px solid #ebedf0;
  background: #ffffff;
  color: #323233;
}
.info {
  background: #1989fa;
}
.warning {
  background: #ff976a;
}
.danger {
  background: #ee0a24;
}
.primary {
  background: #07c160;
}

.large {
  width: 100%;
  margin: 0 5px;
}
.normal {
  padding: 0 15px;
}
.small {
  height: 32px;
  padding: 0 8px;
}
.mini {
  height: 24px;
  padding: 0 4px;
}
.plain {
  color: inherit;
  background: #ffffff;
}
button:active {
  filter: brightness(90%);
}
</style>
