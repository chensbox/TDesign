export const infiniteList = {
  name: 'infiniteList',

  mounted(el, binding, vnode, prevVnode) {
    binding.onScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = el

      if (scrollHeight - clientHeight - scrollTop <= 10) {
        binding.value()
      }
    }
    el.addEventListener('scroll', binding.onScroll)
  },

  unmounted(el, binding) {
    el.removeEventListener('scroll', binding.onScroll)
  }
}

export default {
  install(app) {
    app.directive(infiniteList.name, infiniteList)
  }
}
