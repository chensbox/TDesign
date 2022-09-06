import dialog_sfc from './dialog.vue'
import { Defer, MountComponent, extend, useExpose } from '../utils'
import { h, reactive } from 'vue'

function initInstance() {
  const wrapper = {
    setup() {
      const state = reactive({
        modelValue: false,
        'onUpdate:modelValue': value => (state.modelValue = value)
      })

      const open = option => extend(state, option, { modelValue: true })

      const close = () => (state.modelValue = false)

      useExpose({ open, close })

      return () => h(dialog_sfc, state)
    }
  }

  instance = MountComponent(wrapper).instance
}

let instance
function Dialog(option = {}) {
  const { promise, resolve, reject } = Defer()
  if (!instance) {
    initInstance()
  }

  instance.open(
    extend({}, Dialog.currentOption, option, {
      callback: action => (action === 'comfirm' ? resolve : reject)()
    })
  )
  return promise
}

Dialog.currentOption = {
  callback: null,
  title: undefined,
  beforClose: null,
  overlay: true,
  showComfirmButton: true,
  showCancelButton: false,
  comfirmButtonText: undefined,
  cancelButtonText: undefined
}

Dialog.alert = function (option) {
  return Dialog(option)
}
Dialog.confirm = function (option) {
  return Dialog({ ...option, showCancelButton: true })
}

dialog_sfc.install = function (app) {
  app.component(dialog_sfc.name, dialog_sfc)
}

Dialog.Component = dialog_sfc

Dialog.install = function (app) {
  app.use(Dialog.Component)
}

export { Dialog }
