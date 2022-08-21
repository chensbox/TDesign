import { h, reactive, createApp, getCurrentInstance } from 'vue'
import notifyOption from './index.vue'

let app, timer
function getInstance() {
  if (app) {
    return app
  }
  const root = document.createElement('div')
  document.body.appendChild(root)

  app = createApp({
    setup() {
      const state = reactive({ show: false })

      getCurrentInstance().render = () => h(notifyOption, state)

      const close = () => (state.show = false)

      const open = props => {
        const duration = props.duration ?? 3000
        Object.assign(state, props, { show: true })
        clearTimeout(timer)

        if (duration) {
          timer = setTimeout(close, duration)
        }
      }

      return { open, close }
    }
  }).mount(root)

  return app
}
function Notify(props) {
  const instance = getInstance()
  instance.open(props)
  return instance
}

Notify.Component = notifyOption.install = app =>
  app.component(notifyOption.name, notifyOption)

Notify.install = app => {
  app.use(Notify.Component)
  app.config.globalProperties.$notify = Notify
}

export { Notify }
