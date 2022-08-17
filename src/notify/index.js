import { h, ref, reactive, createApp, getCurrentInstance } from 'vue'
import notifyOption from './index.vue'

let app, instance, timer
function getInstance (props) {
  if (app) {
    return app
  }
  const root = document.createElement('div')
  document.body.appendChild(root)
  app = createApp({
    setup () {
      props.modelValue = true
      const state = reactive(props)

      getCurrentInstance().render = () => h(notifyOption, state)

      const open = () => {

        state.modelValue = true
        clearTimeout(timer)
        timer = setTimeout(() => {
          state.modelValue = false

        }, 2000)
      }

      return { state, open }
    }
  }).mount(root)
  return app
}
function notify (props) {
  const instance = getInstance(props)
  instance.open()
  return instance
}

export { notify }
