import dialog_sfc from './dialog.vue'
import { createInstance } from '../utils'
let instance, mountNode
function dialog(props = {}) {
  return new Promise((resolve, reject) => {
    props.callback = action => {
      ;(action === 'confirm' ? resolve : reject)()
      setTimeout(() => {
        instance.unmount(mountNode)
        document.body.removeChild(mountNode)
      }, 100)
    }
    ;({ instance, mountNode } = createInstance(dialog_sfc, props))
  })
}

dialog_sfc.install = function (app) {
  app.component('Tdialog', dialog_sfc)
}

dialog.Component = dialog_sfc

dialog.install = function (app) {
  app.use(dialog.Component)
}

export { dialog }
