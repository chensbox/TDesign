import dialog_sfc from './dialog.vue'
import { Defer } from '../utils'
import { render, h } from 'vue'

let instance
function Dialog(option = {}) {
  const { promise, resolve, reject } = Defer()

  const wrapper = {
    setup() {}
  }

  ;({ instance } = mountComponent(wrapper))
  console.log(instance)
  return promise
}

Dialog.alert = function (option) {
  return Dialog({ ...option, type: 'alert' })
}
Dialog.confirm = function (option) {
  return Dialog({ ...option, type: 'confirm' })
}

dialog_sfc.install = function (app) {
  app.component(dialog_sfc.name, dialog_sfc)
}

Dialog.Component = dialog_sfc

Dialog.install = function (app) {
  app.use(Dialog.Component)
}

export { Dialog }
