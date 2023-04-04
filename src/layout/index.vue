<script lang='ts' setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
const appStore = useAppStore()

const breakpoints = useBreakpoints(breakpointsTailwind)

const isGreaterLg = breakpoints.greaterOrEqual('lg')
const isSmallerLg = breakpoints.smaller('lg')
const isGreaterMd = breakpoints.greaterOrEqual('md')
const isSmallerMd = breakpoints.smaller('md')

// 侧边栏收缩
const siderCollapsedClass = computed(() => {
  if (!appStore.siderCollapsed && unref(isSmallerMd))
    return ['ml-55']

  else if (appStore.siderCollapsed && unref(isSmallerMd))
    return ['ml-0']

  else if (appStore.siderCollapsed && unref(isGreaterMd))
    return ['ml-16']

  else if (!appStore.siderCollapsed && unref(isGreaterMd))
    return ['ml-55']

  return []
})
</script>

<template>
  <div class="flex h-screen bg-#f0f2f4">
    <sider-bar />
    <div :class="siderCollapsedClass" class="main-container w-100% h-screen z-1">
      <header-nav />
      <router-view />
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>
