import { createApp } from 'vue'
import type { App } from 'vue'
import InnerComponent from './TooltipInner.vue'
import type { TooltipProps } from './TooltipInner.vue'

const options = reactive({
  show: true,
})

function InnerService(rootProps: TooltipProps) {
  const container = document.querySelector('.tool-tip')
  if (container)
    document.body.removeChild(container)

  const instance = createApp(InnerComponent, { ...rootProps })
  // provide must above mount
  instance.provide('options', options)

  const vm = instance.mount(document.createElement('div'))
  document.body.appendChild(vm.$el)

  return {
    vm,
    show() {
    },
    hide() {
      instance.unmount()
    },
  }
}

export const Inner = {
  install(app: App) {
    app.config.globalProperties.$tooltipInner = InnerService
  },
  service: InnerService,
}
export default Inner
