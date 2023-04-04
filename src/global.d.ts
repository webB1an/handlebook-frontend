// 正常工作。
export {}

import type {TooltipProps} from './components/Tooltip/TooltipInner.vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $tooltipInner: (props: TooltipProps) => {
      vm: any
      show: () => void
      hide: () => void
    }
  }
}
