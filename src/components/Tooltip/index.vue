<script lang='ts' setup>
import { Inner } from '~/components'
type Place = 'top' | 'bottom' | 'left' | 'right'

interface Text {
  name: string
  link: string
}

interface Props {
  show: boolean
  text: string | Text[]
  link?: string
  place: Place
  instance?: number
  color?: string
  bg?: string
  hideContainer?: string
  scroll?: (menu: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  text: '',
  link: '',
  place: 'right',
  instance: 0,
  color: 'text-#a5a9b0',
  bg: '#dadbdd',
  hideContainer: '',
  scroll: (menu: any) => menu,
})

// const $tooltip = getCurrentInstance()!.proxy!.$tooltip

const tooltipRef = ref<HTMLElement>()

let tooltipInner: { show: () => void; hide: () => void }

const mouseEnter = () => {
  if (!props.show)
    return
  if (!tooltipRef.value)
    return

  const { width, height, left, right, top, bottom } = tooltipRef.value.getBoundingClientRect()

  tooltipInner = Inner.service({
    show: props.show,
    place: props.place,
    text: props.text,
    link: props.link,
    color: props.color,
    bg: props.bg,
    instance: props.instance,
    parent: {
      width,
      height,
      left,
      right,
      top,
      bottom,
    },
    scroll: props.scroll,
  })
}

onMounted(() => {
  if (!tooltipRef.value)
    return

  if (props.hideContainer) {
    document.querySelector(props.hideContainer)?.addEventListener('mouseenter', () => {
      tooltipInner?.hide()
    })
  }
  else {
    tooltipRef.value.addEventListener('mouseleave', () => {
      tooltipInner?.hide()
    })
  }
})
</script>

<template>
  <div ref="tooltipRef" class="tooltip-container relative" @mouseenter="mouseEnter">
    <slot />
  </div>
</template>

<style scoped>

</style>
