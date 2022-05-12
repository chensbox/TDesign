import __dialog__ from './dialog.vue'
import { createApp } from 'vue'
let instance, root
function dialog(props = {}) {
  console.warn(props)
  return new Promise((resolve, reject) => {
    props.callback = action => {
      ;(action === 'confirm' ? resolve : reject)()
      setTimeout(() => {
        instance.unmount(root)
        document.body.removeChild(root)
      }, 100)
    }

    instance = createApp(__dialog__, props)
    root = document.createElement('div')
    document.body.appendChild(root)
    instance.mount(root)
  })
}
__dialog__.install = function (app) {
  app.component('Tdialog', __dialog__)
}
dialog.Component = __dialog__

dialog.install = function (app) {
  app.use(dialog.Component)
}

export { dialog }
