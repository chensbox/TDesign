const onScroll = (el, binding) => {
  const { scrollHeight, scrollTop, clientHeight } = el

  if (scrollHeight - clientHeight - scrollTop <= 10) {
    binding.value()
  }
}
export const infiniteList = {
  name: 'infiniteList',
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {},
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {
    el.addEventListener('scroll', () => {
      onScroll(el, binding)
    })
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}

export default {
  install(app) {
    app.directive(infiniteList.name, infiniteList)
  }
}
