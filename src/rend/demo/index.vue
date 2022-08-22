<template>
  <div>
    <!-- <button @click="show = !show">{{ show }}</button>
    <child v-model:show="show"></child> -->
    <button @click="createChild">zhanshi</button>
    <button @click="fn">click</button>
  </div>
</template>

<script>
function th(func, wait, options = {}) {
  var context, args, result
  var timeout = null
  var previous = 0

  var later = function () {
    previous = options.leading === false ? 0 : +new Date()

    timeout = null

    result = func.apply(context, args)

    if (!timeout) context = args = null
  }

  return function () {
    var now = +new Date()

    if (!previous && options.leading === false) previous = now

    var remaining = wait - (now - previous)

    context = this
    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now

      result = func.apply(context, args)

      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }

    return result
  }
}
let obj = {}
let fn = th(function () {
  console.warn(this)
}, 2000)
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
    },
    fn
  }
}
</script>
