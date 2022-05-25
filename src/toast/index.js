import toast_sfc from './toast.vue'
import { sleep, createInstance } from '../utils'

function destroy(instance, mountNode) {
  instance.unmount(mountNode)
  document.body.removeChild(mountNode)
}

async function toast(props = {}) {
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

toast.Component = toast_sfc

toast.install = function (app) {
  app.use(toast.Component)
}

export { toast }
