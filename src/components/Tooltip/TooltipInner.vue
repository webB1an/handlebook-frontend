<script lang='ts' setup>
export interface TooltipProps {
  show: boolean
  place: 'top' | 'bottom' | 'left' | 'right'
  text: string | { name: string; link: string }[]
  link?: string
  instance?: number
  bg?: string
  color?: string
  parent: {
    width: number
    height: number
    left: number
    right: number
    top: number
    bottom: number
  }
  scroll?: (menu: any) => void
}

const props = withDefaults(defineProps<TooltipProps>(), {
  show: false,
  place: 'right',
  text: '',
  link: '',
  instance: 0,
  color: 'text-#a5a9b0',
  bg: '#dadbdd',
  parent: () => ({
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }),
  scroll: (menu: any) => menu,
})

const options = inject('options', {
  show: false,
})

const triangle = ref('')
const innerTooltipRef = ref<HTMLElement>()

const bgClass = computed(() => {
  if (props.bg === '#dadbdd')
    return 'bg-#dadbdd'
  else
    return 'bg-#1a1a1a'
})

const triangleBgClass = computed(() => {
  if (props.bg === '#dadbdd')
    return 'triangle-gray'
  else
    return 'triangle-black'
})

const position = computed(() => {
  if (!innerTooltipRef.value)
    return
  const { parent, instance } = props
  const { width, height } = innerTooltipRef.value.getBoundingClientRect()
  const clientWidth = document.body.clientWidth
  const clientHeight = document.body.clientHeight
  if (props.place === 'left') {
    if (parent.left < width + instance) {
      triangle.value = 'left-triangle'
      return `left: ${parent.right + instance}px; top: ${parent.top + (parent.height - height) / 2}px;`
    }
    else {
      triangle.value = 'right-triangle'
      return `left: ${parent.left - width - instance}px; top: ${parent.top + (parent.height - height) / 2}px;`
    }
  }
  if (props.place === 'right') {
    if (clientWidth - parent.right < width + instance) {
      triangle.value = 'right-triangle'
      return `left: ${parent.left - width - instance}px; top: ${parent.top + (parent.height - height) / 2}px;`
    }
    else {
      triangle.value = 'left-triangle'
      return `left: ${parent.right + instance}px; top: ${parent.top + (parent.height - height) / 2}px;`
    }
  }
  if (props.place === 'top') {
    if (parent.top < height + instance) {
      triangle.value = 'top-triangle'
      return `left: ${parent.left + (parent.width - width) / 2}px; top: ${parent.bottom + instance}px;`
    }
    else {
      triangle.value = 'bottom-triangle'
      return `left: ${parent.left + (parent.width - width) / 2}px; top: ${parent.top - height - instance}px;`
    }
  }
  if (props.place === 'bottom') {
    if (clientHeight - parent.bottom < height + instance) {
      triangle.value = 'bottom-triangle'
      return `left: ${parent.left + (parent.width - width) / 2}px; top: ${parent.top - height - instance}px;`
    }
    else {
      triangle.value = 'top-triangle'
      return `left: ${parent.left + (parent.width - width) / 2}px; top: ${parent.bottom + instance}px;`
    }
  }
})
</script>

<template>
  <div v-show="options.show && show" ref="innerTooltipRef" :class="`${triangle} ${triangleBgClass}`" :style="position" class="tool-tip fixed max-w-60 w-max h-max border-8 border-transparent text-sm break-words z-100">
    <div :class="`${bgClass} ${props.color}`" class="relative rounded-md overflow-hidden z-1">
      <template v-if="typeof text === 'string'">
        <a class="block px-3 py-2 cursor-pointer" @click="props.scroll({ link })">{{ text }}</a>
      </template>
      <template v-else>
        <template v-for="(item, index) in text" :key="index">
          <a class="block cursor-pointer py-2 hover:bg-#bbbec3 hover:text-#fff w-30 text-center" @click="props.scroll({ link: item.link })">{{ item.name }}</a>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.left-triangle:before{
  position: absolute;
  top: 50%;
  left: -6px;
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
  left: -6px;
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
  top: -6px;
  content: "";
  width: 0px;
  height: 0px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #dadbdd;
  transform: translateX(-50%)
}

.bottom-triangle:before{
  position: absolute;
  left: 50%;
  bottom: -6px;
  content: "";
  width: 0px;
  height: 0px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #dadbdd;
  transform: translateX(-50%)
}

.triangle-black.left-triangle:before {
  border-right: 8px solid #1a1a1a;
}
.triangle-black.right-triangle:before{
  border-left: 8px solid #1a1a1a;
}
.triangle-black.top-triangle:before{
  border-bottom: 8px solid #1a1a1a;
}
.triangle-black.bottom-triangle:before {
  border-top: 8px solid #1a1a1a;
}
</style>
