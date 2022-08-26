<template>
  <div :class="bem({ animate: animate && loading, fullscreen })">
    <template v-if="loading">
      <div
        :class="bem('avatar', [avatarShape])"
        :style="avatarStyle"
        v-if="avatar"
      ></div>

      <div :class="bem('content')">
        <div
          :class="bem('title', [rowShape])"
          :style="{ width: titleWidth }"
        ></div>
        <div
          :class="bem('row', [rowShape])"
          :style="{ width }"
          v-for="(width, index) in rows"
          :key="index"
        ></div>
      </div>
    </template>

    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import {
  createNamespace,
  makeNumericProp,
  makeStringProp,
  numericProp,
  truthProp
} from '../utils'
const [name, bem] = createNamespace('skeleton')

const props = {
  title: Boolean,
  avatar: Boolean,
  round: Boolean,
  fullscreen: Boolean,
  row: numericProp,
  rowWidth: [...numericProp, Array],
  loading: truthProp,
  animate: truthProp,
  titleWidth: makeNumericProp('40%'),
  avatarSize: makeStringProp('32px'),
  avatarShape: makeStringProp('round'),
  rowShape: makeStringProp('round')
}
function setup(props) {
  const rows = computed(() => {
    const { row, rowWidth } = props
    if (Array.isArray(rowWidth) && rowWidth.length === +row) {
      return rowWidth
    }
    const rowItems = new Array(+row).fill(rowWidth ?? '100%')
    return rowItems
  })

  const avatarStyle = computed(() => ({
    width: props.avatarSize,
    height: props.avatarSize
  }))

  return { bem, rows, avatarStyle }
}
export default {
  name,
  props,
  setup
}
</script>

<style lang="less">
@keyframes var-skeleton-animation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
.t-skeleton {
  position: relative;
  display: flex;
  overflow: hidden;
  padding: 0px 16px;
  &__content {
    flex: 1;
  }
  &__title,
  &__row {
    position: relative;
    height: 16px;
    background: rgba(0, 0, 0, 0.06);

    &:last-child {
      width: 60% !important;
    }
    &--round {
      border-radius: 16px;
    }
  }

  &__row {
    margin-top: 12px;
  }

  &__title {
    margin: 20px 0;
    width: 40%;
  }

  &__avatar {
    flex-shrink: 0;
    margin-top: 15px;
    width: 32px;
    height: 32px;
    margin-right: 16px;
    background: rgba(0, 0, 0, 0.06);
    &--square {
      border-radius: 10%;
    }
    &--round {
      border-radius: 50%;
    }
  }

  &--animate {
    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      animation: var-skeleton-animation 1s infinite;
      background: linear-gradient(
        90deg,
        hsla(0, 0%, 100%, 0),
        hsla(0, 0%, 100%, 0.3),
        hsla(0, 0%, 100%, 0)
      );
      transition: 0.25s background-color;
    }
  }
  &--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.12);
  }
}
</style>
