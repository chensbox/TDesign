<template>
  <transition
    :name="position"
    appear
    @after-enter="onOpened"
    @after-leave="onClose"
  >
    <div
      :class="bem([type, position])"
      :style="{ color, background }"
      v-if="show"
    >
      <slot>
        {{ message }}
      </slot>
    </div>
  </transition>
</template>

<script>
import { createNamespace, makeNumericProp, makeStringProp } from '../utils'
const [name, bem] = createNamespace('notify')
const props = {
  show: Boolean,
  message: String,
  color: String,
  background: String,
  onOpened: Function,
  onClose: Function,
  type: makeStringProp('danger'),
  position: makeStringProp('top'),
  duration: makeNumericProp(2000)
}
function setup() {
  return { bem, name }
}
export default {
  name,
  props,
  setup
}
</script>

<style lang="less" scoped>
.t-notify {
  position: fixed;
  left: 0;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  color: #fff;
  width: 100%;
  text-align: center;

  &--danger {
    background: #ee0a24;
  }
  &--primary {
    background: #1989fa;
  }
  &--success {
    background: #07c160;
  }
  &--warning {
    background: #ff976a;
  }
  &--top {
    top: 0;
  }
  &--bottom {
    bottom: 0;
  }
}

.top-enter-active,
.top-leave-active,
.bottom-enter-active,
.bottom-leave-active {
  transition: all 0.25s ease-out;
}

.top-enter-from,
.top-leave-to {
  transform: translateY(-100%);
}

.bottom-enter-from,
.bottom-leave-to {
  transform: translateY(100%);
}
</style>
