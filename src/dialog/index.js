import dialog_sfc from './dialog.vue'
import { createInstance } from '../utils'
import { render, h } from 'vue'
let instance, mountNode

function dialog(props = {}) {
  console.log(props)
  props.modelValue = props.modelValue == undefined ? true : props.modelValue
  const container = document.createElement('div')
  document.body.appendChild(container)

  return new Promise((resolve, reject) => {
    props.callback = action => {
      ;(action === 'confirm' ? resolve : reject)()
      setTimeout(() => {
        instance?.unmount(mountNode)
        document.body.removeChild(mountNode || container)
        mountNode = instance = null
      }, 100)
    }

    const Vnode = h(dialog_sfc, props)
    console.log('vnode', Vnode)
    render(Vnode, container)
    // ;({ instance, mountNode } = createInstance(dialog_sfc, props))
  })
}

dialog_sfc.install = function (app) {
  app.component(dialog_sfc.name, dialog_sfc)
}

dialog.Component = dialog_sfc

dialog.install = function (app) {
  app.use(dialog.Component)
}

export { dialog }
