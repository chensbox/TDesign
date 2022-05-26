import toast_sfc from './toast.vue'
import { sleep, createInstance } from '../utils'

function destroy(instance, mountNode) {
  instance.unmount(mountNode)
  document.body.removeChild(mountNode)
}

async function Toast(props = {}) {
  const { instance, mountNode } = createInstance(toast_sfc, props)
  const [el] = mountNode.childNodes

  await sleep(2000)
  el.style.opacity = 0
  await sleep(500)
  destroy(instance, mountNode)
}

toast_sfc.install = function (app) {
  app.component(toast_sfc.name, toast_sfc)
}

Toast.Component = toast_sfc

Toast.install = function (app) {
  app.use(Toast.Component)
}

export { Toast }
