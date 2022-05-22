<template>
  <demo-block title="基础用法">
    <button @click="onclick">点击</button>

    <transition name="fade">
      <popup v-if="show"></popup>
    </transition>
  </demo-block>
</template>

<script>
import popup from '../index.vue'
export default {
  components: { popup },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onclick() {
      console.log('1')
      this.show = !this.show
    }
  }
}
</script>

<style lange="less" scoped>
.show-btn {
  margin: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
