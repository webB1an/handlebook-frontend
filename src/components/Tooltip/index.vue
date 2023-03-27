<script lang='ts' setup>
type place = 'top' | 'bottom' | 'left' | 'right'
interface Props {
  show: boolean
  text: string
  place: place
  position?: number
  bg?: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  text: '',
  place: 'right',
  position: 0,
  bg: '#dadbdd',
})
const styles = ref<string[]>([])
const triangleClass = ref<string>()

const tooltipRef = ref<HTMLElement>()

const mouseEnter = () => {
  styles.value = []
  if (tooltipRef.value) {
    const { width, height, left, right, top, bottom } = tooltipRef.value.getBoundingClientRect()
    if (props.place === 'top') {
      const toolTipHeight = tooltipRef.value.querySelector('.tool-tip')!.getBoundingClientRect().height
      if (top < toolTipHeight) {
        triangleClass.value = 'top-triangle'
        styles.value.push(`bottom: -${toolTipHeight + props.position}px; left: 50%; transform: translateX(-50%);`)
      }
      else {
        triangleClass.value = 'bottom-triangle'
        styles.value.push(`top: -${toolTipHeight + props.position}px; left: 50%; transform: translateX(-50%);`)
      }
    }
    else if (props.place === 'bottom') {
      const toolTipHeight = tooltipRef.value.querySelector('.tool-tip')!.getBoundingClientRect().height
      if (document.body.clientHeight - bottom < toolTipHeight) {
        triangleClass.value = 'bottom-triangle'
        styles.value.push(`top: -${toolTipHeight + props.position}px; left: 50%; transform: translateX(-50%);`)
      }
      else {
        triangleClass.value = 'top-triangle'
        styles.value.push(`bottom: -${toolTipHeight + props.position}px; left: 50%; transform: translateX(-50%);`)
      }
    }
    else if (props.place === 'left') {
      const toolTipWidth = tooltipRef.value.querySelector('.tool-tip')!.getBoundingClientRect().width
      if (left < toolTipWidth) {
        triangleClass.value = 'left-triangle'
        styles.value.push(`left: ${width + props.position}px; top: 50%; transform: translateY(-50%);`)
      }
      else {
        triangleClass.value = 'right-triangle'
        styles.value.push(`right: ${width + props.position}px; top: 50%; transform: translateY(-50%);`)
      }
    }
    else if (props.place === 'right') {
      const toolTipWidth = tooltipRef.value.querySelector('.tool-tip')!.getBoundingClientRect().width
      if (document.body.clientWidth - right < toolTipWidth) {
        triangleClass.value = 'right-triangle'
        styles.value.push(`right: ${width + props.position}px; top: 50%; transform: translateY(-50%);`)
      }
      else {
        triangleClass.value = 'left-triangle'
        styles.value.push(`left: ${width + props.position}px; top: 50%; transform: translateY(-50%);`)
      }
    }
  }
}
</script>

<template>
  <div ref="tooltipRef" class="tooltip-container relative group" @mouseenter="mouseEnter">
    <div v-show="show" :style="styles.join(';')" :class="triangleClass" class="tool-tip hidden absolute max-w-60 w-max h-max px-3 py-2 text-sm text-#a5a9b0 rounded-md bg-#dadbdd break-words group-hover:block z-100">
      {{ props.text }}
      <span v-html="props.text" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.left-triangle:before{
  position: absolute;
  top: 50%;
  left: -8px;
  content: "";
  width: 0px;
  height: 0px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid #dadbdd;
  transform: translateY(-50%)
}

.right-triangle:before{
  position: absolute;
  top: 50%;
  left: -8px;
  content: "";
  width: 0px;
  height: 0px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid #dadbdd;
  transform: translateY(-50%)
}

.top-triangle:before{
  position: absolute;
  left: 50%;
  top: -4px;
  content: "";
  width: 0px;
  height: 0px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #dadbdd;
  transform: translateY(-50%)
}

.bottom-triangle:before{
  position: absolute;
  left: 50%;
  bottom: -12px;
  content: "";
  width: 0px;
  height: 0px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #dadbdd;
  transform: translateY(-50%)
}
</style>
