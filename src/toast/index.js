import __toast__ from './toast.vue'
import { createApp } from 'vue'

function toast(props = {}) {
  // console.warn('>>>>>>>>>>>toast调用了')
  // console.warn('看看props', props)

  if (props.show == false) {
    return
  }

  const toastInstance = createApp(__toast__, props)
  const monuntNode = document.createElement('div')

  document.body.appendChild(monuntNode)

  toastInstance.mount(monuntNode)
  const [el] = monuntNode.childNodes
  setTimeout(() => {
    el.style.opacity = 0
    setTimeout(() => {
      toastInstance.unmount(monuntNode)
      document.body.removeChild(monuntNode)
    }, 1000)
  }, 1000)
}

__toast__.install = function (app) {
  app.component(__toast__.name, __toast__)
}

toast.Component = __toast__

toast.install = function (app) {
  app.use(toast.Component)
}

export { toast }
