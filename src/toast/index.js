import ToastComponet from './toast.vue'
import { extend, MountComponent, isObject, useExpose } from '../utils'
import { getCurrentInstance, h, reactive, ref, watch } from 'vue'

const defaultOptions = {
  message: '',
  icon: undefined,
  duration: 2500,
  position: 'middle',
  forbidClick: false,
  loadingType: undefined
}

let instance

const initInstance = () => {
  const message = ref('')
  const state = reactive({
    modelValue: false,
    onClose: () => close()
  })

  const open = options => {
    extend(state, options, { modelValue: true })
  }
  const close = () => (state.modelValue = false)

  const render = () => h(ToastComponet, state)

  watch(message, newVal => {
    state.message = newVal
  })

  const wrapper = {
    setup() {
      getCurrentInstance().render = render
      return { open, close, message }
    }
  }
  instance = MountComponent(wrapper).instance
}

const parseOptions = message => {
  return isObject(message) ? message : { message }
}
const createMethod = type => {
  let icon
  switch (type) {
    case 'loading':
      icon = 'loading-spinner'
      break
    case 'success':
      icon = 'check'
      break
    case 'fail':
      icon = 'close-circle'
  }
  return options => Toast(extend({ icon }, parseOptions(options)))
}

function Toast(options) {
  if (!instance) {
    initInstance()
  }
  options = parseOptions(options)
  instance.open(extend({}, defaultOptions, options))
  return instance
}

Toast.loading = createMethod('loading')
Toast.success = createMethod('success')
Toast.fail = createMethod('fail')

ToastComponet.install = app => {
  app.component(ToastComponet.name, ToastComponet)
  app.config.globalProperties.$toast = Toast
}

Toast.Component = ToastComponet

Toast.install = app => app.use(Toast.Component)

export { Toast }
