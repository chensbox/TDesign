import toast_sfc from './toast.vue'
import { sleep, createInstance } from '../utils'

function destroy(instance, mountNode) {
  instance.unmount(mountNode)
  document.body.removeChild(mountNode)
}
function Toast(props = {}) {
  // if (instance) {
  //   instance.close()
  //   instance = mountNode = null
  //   return Toast(props)
  // }
  props.destroy = function () {
    destroy(instance, mountNode)
  }
  const { instance, mountNode } = createInstance(toast_sfc, props)
  instance.state = instance._instance.ctx.state
  instance.close = instance._instance.exposed.close
  // console.log(instance)
  return instance
}

Toast.success = function (option) {
  return Toast({ ...option, icon: 'check' })
}

Toast.fail = function (option) {
  return Toast({ ...option, icon: 'close' })
}

Toast.loading = function (option) {
  return Toast({ ...option, showLoading: true, icon: 'loading-spinner' })
}

toast_sfc.install = function (app) {
  app.component(toast_sfc.name, toast_sfc)
}

Toast.Component = toast_sfc

Toast.install = function (app) {
  app.use(Toast.Component)
}

export { Toast }
