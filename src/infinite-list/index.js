export const infiniteList = {
  name: 'infiniteList',

  mounted(el, binding, vnode, prevVnode) {
    let tick
    binding.onScroll = () => {
      if (tick) {
        return
      }
      tick = true
      requestAnimationFrame(() => {
        const { scrollHeight, scrollTop, clientHeight } = el

        if (scrollHeight - clientHeight - scrollTop <= 10) {
          binding.value()
        }
        tick = false
      })
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
