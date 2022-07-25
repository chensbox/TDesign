<template>
  <div class="wrapper" v-if="show">
    测试组件:{{ show }}
    <button @click="onclick">修改show,</button>
    <div>
      <h1>message:{{ message }}</h1>
    </div>
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core'
export default {
  props: {
    show: Boolean,
    message: String
  },
  emits: ['update:show'],
  methods: {
    onclick() {
      this.$emit('update:show', !this.show)
    }
  },
  mounted() {
    console.log(this.props)
    watch(this.props, () => {
      console.log('props', this.props)
    })
  }
}
</script>
