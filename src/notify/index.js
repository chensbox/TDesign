import { h, reactive, getCurrentInstance } from 'vue'
import notifyOption from './index.vue'
import { MountComponent, extend } from '../utils'

let instance, timer

function initInstance() {
  const wrapper = {
    setup() {
      const state = reactive({ show: false })
      const render = () => h(notifyOption, state)
      const close = () => (state.show = false)

      const open = props => {
        const duration = props.duration ?? 3000
        extend(state, props, { show: true })
        if (duration) {
          clearTimeout(timer)
          timer = setTimeout(close, duration)
        }
      }

      getCurrentInstance().render = render

      return { open, close }
    }
  }

  ;({ instance } = MountComponent(wrapper))
}
function Notify(props) {
  if (!instance) {
    initInstance()
  }
  instance.open(props)
  return instance
}

notifyOption.install = app => app.component(notifyOption.name, notifyOption)

Notify.Component = notifyOption

Notify.install = app => {
  app.use(Notify.Component)
  app.config.globalProperties.$notify = Notify
}

export { Notify }
