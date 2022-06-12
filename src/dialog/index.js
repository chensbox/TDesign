import dialog_sfc from './dialog.vue'
import { sleep } from '../utils'
import { render, h } from 'vue'

function Dialog(props = {}) {
  props.modelValue = true
  props.type = 'confirm'
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)

  return new Promise((resolve, reject) => {
    props.callback = action => {
      ;(action === 'confirm' ? resolve : reject)()
      Vnode.el.style.opacity = 0
      sleep(200).then(() => {
        document.body.removeChild(mountNode)
      })
    }

    const Vnode = h(dialog_sfc, props)
    render(Vnode, mountNode)
  })
}

dialog_sfc.install = function (app) {
  app.component(dialog_sfc.name, dialog_sfc)
}

Dialog.Component = dialog_sfc

Dialog.install = function (app) {
  app.use(Dialog.Component)
}

export { Dialog }
