<script lang='ts' setup>
const appStore = useAppStore()

const classes = computed(() => {
  if (appStore.siderCollapsed)
    return 'i-carbon-side-panel-open'
  else
    return 'i-carbon-side-panel-close'
})

const toggleSiderCollapsed = () => {
  appStore.toggleSiderCollapsed(!appStore.siderCollapsed)
}
</script>

<template>
  <div class="nav-container fixed flex items-center w-100% h-18 pl-2 bg-#fff z-1">
    <div :class="classes" class="w-7 h-7 text-#888 hover:text-#df4f51 cursor-pointer transition-colors duration-300 ease-in" @click="toggleSiderCollapsed" />
  </div>
</template>

<style lang='scss' scoped>
</style>
