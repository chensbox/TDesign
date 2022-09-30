import dialog_sfc from './dialog.vue'
import { MountComponent, extend, useExpose } from '../utils'
import { h, reactive } from 'vue'

let instance

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

function Dialog(option = {}) {
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance()
    }

    instance.open(
      extend({}, Dialog.currentOption, option, {
        callback: action => (action === 'comfirm' ? resolve : reject)()
      })
    )
  })
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

Dialog.alert = Dialog

Dialog.confirm = option => Dialog(extend(option, { showCancelButton: true }))

dialog_sfc.install = function (app) {
  app.component(dialog_sfc.name, dialog_sfc)
}

Dialog.Component = dialog_sfc

Dialog.install = function (app) {
  app.use(Dialog.Component)
  app.config.globalProperties.$dialog = Dialog
}

export { Dialog }
