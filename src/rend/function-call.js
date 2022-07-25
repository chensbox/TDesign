import {
  reactive,
  render,
  h,
  createApp,
  ref,
  getCurrentInstance,
  watch
} from 'vue'
import child from './index.vue'
// console.log(child)
export function show() {
  const root = document.createElement('div')
  document.body.appendChild(root)
  const app = createApp({
    setup() {
      // const show = ref(true)
      const message = ref('')
      const state = reactive({
        show: true,
        message: ''
      })
      // const vnode = h(child, state)
      // render(vnode, root)
      // watch(state, () => {
      //   console.log(state)
      // })

      getCurrentInstance().render = () => h(child, state)

      // watch(
      //   () => [message, state],
      //   () => render(h(child, state), root)
      // )
      watch(message, val => {
        state.message = val
      })
      return { message, state }
    }
  })
  return app.mount(root)
}

// export function show() {
//   const root = document.createElement('div')
//   document.body.appendChild(root)
//   const vnode = h(child, { show: true })
//   render(vnode, root)
// }
