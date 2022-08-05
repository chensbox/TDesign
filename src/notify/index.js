import { h, ref, reactive, createApp, getCurrentInstance } from 'vue'
import notifyOption from './index.vue'

function notify (props) {
  const root = document.createElement('div')
  document.body.appendChild(root)
  const app = createApp({
    setup () {
      const state = reactive({
        modelValue: props.show,
        'onUpdate:modelValue': value => (state.modelValue = value)
      })
      getCurrentInstance().render = () => h(notifyOption, state)
    }
  })
  app.mount(root)
}

export { notify }
