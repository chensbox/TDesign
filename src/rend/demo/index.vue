<template>
  <div>
    <!-- <button @click="show = !show">{{ show }}</button>
    <child v-model:show="show"></child> -->
    <button @click="createChild">zhanshi</button>
  </div>
</template>

<script>
import { h } from '@vue/runtime-core'
import child from '../index.vue'
import { show } from '../function-call'
export default {
  components: { child },
  data() {
    return {
      show: true
    }
  },
  methods: {
    createChild() {
      const app = show()
      console.log(app)
      setInterval(() => {
        app.message = Math.random()
      }, 1000)
      setTimeout(() => {
        app.state.show = false
        console.log('111111')
      }, 5000)
    }
  }
}
</script>
