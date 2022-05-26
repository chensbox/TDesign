import { createApp } from 'vue'
export function createInstance(option, props) {
  const instance = createApp(option, props)
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  instance.mount(mountNode)

  return { instance, mountNode }
}

export function createVnode(tag, props, child) {}
