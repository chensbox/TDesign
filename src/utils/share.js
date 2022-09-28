import {
  createApp,
  reactive,
  getCurrentInstance,
  watchEffect,
  ref,
  computed,
  nextTick
} from 'vue'

export const extend = Object.assign

export const noop = () => {}

export function useExpose(apis) {
  const instance = getCurrentInstance()
  if (instance) {
    extend(instance.proxy, apis)
  }
}
export function usePopupState() {
  const state = reactive({
    show: false
  })

  const toggle = show => {
    state.show = show
  }

  const open = props => {
    extend(state, props)
    toggle(true)
  }

  const close = () => toggle(false)

  useExpose({ open, close, toggle })

  return {
    open,
    close,
    state,
    toggle
  }
}

export function MountComponent(RootComponent) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  document.body.appendChild(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    }
  }
}

export function RewriteRender(render) {
  const instance = getCurrentInstance()
  if (instance) {
    instance.render = render
  }
}

export const isObject = val => !!val && typeof val === 'object'

export function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }

  if (isStopPropagation) {
    event.stopPropagation()
  }
}

export function raf(callback) {
  return window.requestAnimationFrame(callback)
}

export function useLazyRender(watchSource) {
  const shouldRender = ref(false)
  const unwatch = watchEffect(() => {
    if (watchSource()) {
      shouldRender.value = true
      nextTick(() => unwatch())
    }
  })
  return { shouldRender }
}
