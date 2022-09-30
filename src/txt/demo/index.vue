<template>
  <div class="text" v-text="text"></div>
  <div class="text" v-txt="text"></div>

  <button @click="show = !show">Toggle</button>
  <p v-lazy="show" @click="onclick">hello</p>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  directives: {
    txt: (el, binding) => {
      const isString = typeof binding.value === 'string'

      if (isString) {
        binding.value = binding.value.trim()
      }

      if (binding.value) {
        el.innerText = isString ? binding.value : JSON.stringify(binding.value)
        el.style.display = ''
      } else {
        el.style.display = 'none'
      }
    },
    lazy: {
      created(el, binding, vnode, prevVnode) {
        console.dir(el)
        console.log('text' in el)

        if (!binding.value) {
          const comment = document.createComment(' ')
          Object.defineProperty(comment, 'setAttribute', {
            value: () => undefined
          })
          vnode.el = comment
          vnode.text = ' '
          vnode.isComment = true
          vnode.context = undefined
          vnode.tag = undefined
          console.log(el.parentNode, '>>>>>>>>>>')
          // el.parentNode.replaceChild(comment, el)
        }
      },
      beforeMount(el, binding, vnode, prevVnode) {
        console.log(el, '>>>>>>>>>>', vnode, prevVnode)
      },

      mounted(el, binding, vnode, prevVnode) {
        console.log(el)
      },
      beforeUpdate(el, binding, vnode, prevVnode) {},

      updated(el, binding, vnode, prevVnode) {
        console.log(el, '>>>>>>>', vnode)
      },

      beforeUnmount(el, binding, vnode, prevVnode) {},
      unmounted(el, binding, vnode, prevVnode) {}
    }
  },
  setup() {
    // const text = ref('sdf')

    const text = ref()
    const show = ref(false)
    // setInterval(() => {
    //   text.value = Math.random() > 0.4 ? Math.random() : ' '
    // }, 1000)

    const onclick = () => {
      console.log(1)
    }
    return { text, show, onclick }
  }
}
</script>

<style lang="less">
.text {
  margin: 20px;
  padding: 10px;
  border-radius: 999px;
  border: 1px solid black;
  background: #fff;
}
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
