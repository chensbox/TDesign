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
      // 在绑定元素的 attribute 前
      // 或事件监听器应用前调用
      created(el, binding, vnode, prevVnode) {
        console.dir(el)
        console.log('text' in el)

        // 下面会介绍各个参数的细节
        if (!binding.value) {
          const comment = document.createComment(' ')
          // 设置value值
          Object.defineProperty(comment, 'setAttribute', {
            value: () => undefined
          })
          // 用注释节点替换 当前页面元素
          vnode.el = comment
          // 下面作为初始化操作 赋值为空
          vnode.text = ' '
          vnode.isComment = true
          vnode.context = undefined
          vnode.tag = undefined
          console.log(el.parentNode, '>>>>>>>>>>')
          // el.parentNode.replaceChild(comment, el)
        }
      },
      // 在元素被插入到 DOM 前调用
      beforeMount(el, binding, vnode, prevVnode) {
        console.log(el, '>>>>>>>>>>', vnode, prevVnode)
      },
      // 在绑定元素的父组件
      // 及他自己的所有子节点都挂载完成后调用
      mounted(el, binding, vnode, prevVnode) {
        console.log(el)
      },
      // 绑定元素的父组件更新前调用
      beforeUpdate(el, binding, vnode, prevVnode) {},
      // 在绑定元素的父组件
      // 及他自己的所有子节点都更新后调用
      updated(el, binding, vnode, prevVnode) {
        console.log(el, '>>>>>>>', vnode)
      },
      // 绑定元素的父组件卸载前调用
      beforeUnmount(el, binding, vnode, prevVnode) {},
      // 绑定元素的父组件卸载后调用
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
