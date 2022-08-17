const onScroll = (el, binding) => {
  const { scrollHeight, scrollTop, clientHeight } = el

  if (scrollHeight - clientHeight - scrollTop <= 10) {
    binding.value()
  }
}
export const infiniteList = {
  name: 'infiniteList',

  mounted(el, binding, vnode, prevVnode) {
    el.addEventListener('scroll', () => {
      onScroll(el, binding)
    })
  },

  unmounted(el, binding, vnode, prevVnode) {}
}

export default {
  install(app) {
    app.directive(infiniteList.name, infiniteList)
  }
}
