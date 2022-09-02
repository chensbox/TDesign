
const Observer = window.IntersectionObserver
let observer

export const lazyLoad = {
  name: 'lazyLoad',
  beforeMount (el, binding) {
    console.log(el)
    console.log(binding)

    if (el.loading) {
      el.loading = 'lazy'
      el.src = binding.value
      return
    }

    if (typeof Observer === 'function') {
      observer = new Observer(([entry]) => {
        if (entry.isIntersecting) {
          el.src = binding.value
          observer.disconnect()
        }
      })
      observer.observe(el)
      return
    }



  },
  unmounted (el, binding) { }
}