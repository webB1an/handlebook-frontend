<script lang='ts' setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import logo from '~/assets/logo.png'
import configMenu from '~/config/menu'
import type { Menu } from '~/config/menu'

const menuConfig = ref(configMenu)

const breakpoints = useBreakpoints(breakpointsTailwind)

const isGreaterLg = breakpoints.greaterOrEqual('lg')
const isSmallerLg = breakpoints.smaller('lg')
const isGreaterMd = breakpoints.greaterOrEqual('md')
const isSmallerMd = breakpoints.smaller('md')

const appStore = useAppStore()

// 侧边栏收缩
watchEffect(() => {
  if (isSmallerLg.value)
    appStore.toggleSiderCollapsed(true)
  else
    appStore.toggleSiderCollapsed(false)
})

// 侧边栏收缩
const siderCollapsedClass = computed(() => {
  if (!appStore.siderCollapsed && unref(isSmallerMd))
    return ['!fixed', 'left-0', 'top-0', '!w-55', 'z-50', '!block']

  else if (appStore.siderCollapsed && unref(isSmallerMd))
    return ['!fixed', '-left-55', 'top-0', '!w-0', 'hidden']

  else if (appStore.siderCollapsed && unref(isGreaterMd))
    return ['!w-16', '!block']

  else if (!appStore.siderCollapsed && unref(isGreaterMd))
    return ['!w-55', '!block']

  return []
})

// 侧边栏宽度
const breakpointClasses = computed(() => {
  if (unref(isGreaterLg))
    return ['w-55', 'block']

  if (unref(isSmallerLg) && unref(isGreaterMd))
    return ['left-0', 'w-16', 'block']

  if (unref(isSmallerMd))
    return ['!w0', 'hidden']

  return []
})

// 展示菜单
const toggleSiderCollapsed = () => {
  appStore.toggleSiderCollapsed(!appStore.siderCollapsed)
}

const menuToTooltipText = (menu: Menu) => {
  if (menu.children) {
    return menu.children.map((child) => {
      return {
        name: child.name,
        link: child.link || '',
      }
    })
  }

  return menu.name
}

const openMenu = (menu: Menu) => {
  menu.showChildren = !menu.showChildren
}

// 锚点跳转
const scrollTo = (menu: Menu) => {
  if (menu.children)
    openMenu(menu)
  if (!menu.link)
    return
  const id = menu.link
  const el = document.getElementById(id)
  if (el) {
    const offsetTop = el.offsetTop
    const navHeight = document.querySelector('.nav-container')?.clientHeight || 0
    document.documentElement.scrollTo({
      top: offsetTop - navHeight,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <div v-if="isSmallerMd && !appStore.siderCollapsed" class="sider-bar-mask fixed top-0 left-0 w-100% h-100% bg-#000/50 backdrop-blur-md opacity-50 z-2" @click="toggleSiderCollapsed" />
  <div :class="breakpointClasses.concat(siderCollapsedClass)" class="fixed top-0 left-0 w-0 h-screen md:block transition-all duration-100 ease-in bg-#f9f9f9 z-2">
    <div class="flex justify-center items-center h-18 bg-#fff cursor-pointer">
      <img :class="[appStore.siderCollapsed ? 'ml-0' : '-ml-4']" class="w-16 h-16" :src="logo" alt="AI 指南">
      <div :class="[appStore.siderCollapsed ? '!hidden' : '']" class="lg:block text-base font-medium whitespace-nowrap">
        <span>AI Compass</span>
        <div>
          开源工具导航
        </div>
      </div>
    </div>

    <div class="sider-bar-menu">
      <ul>
        <li v-for="menu in menuConfig" :key="menu.name" class="relative p-2">
          <Tooltip hide-container=".main-container" :show="appStore.siderCollapsed" :link="menu.link ?? ''" :text="menuToTooltipText(menu)" place="right" :instance="8" :scroll="scrollTo">
            <a class="sider-bar-item-link flex items-center w-100% text-sm text-#515C6B hover:text-#f1404b hover:bg-#000/10 hover:rounded-md cursor-pointer" @click="scrollTo(menu)">
              <div class="flex justify-center items-center w-12 h-12">
                <div :class="menu.icon" class="text-5 text-#bbbec3" />
              </div>
              <span v-show="!appStore.siderCollapsed">{{ menu.name }}</span>
            </a>
            <div v-if="menu.children && !appStore.siderCollapsed" :class="menu.showChildren ? 'rotate-0!' : ''" class="i-carbon:chevron-down absolute right-2 top-50% -translate-y-50% text-sm rotate-270" />
          </Tooltip>
          <div v-if="menu.children" v-show="!appStore.siderCollapsed" :style="menu.showChildren ? `height: ${menu.children.length * 48}px` : `height: 0`" class="overflow-hidden transition-height duration-300 ease">
            <template v-for="item in menu.children" :key="item.link">
              <a class="sider-bar-item-link flex items-center w-100% text-sm text-#515C6B hover:text-#f1404b hover:bg-#000/10 hover:rounded-md cursor-pointer" @click="scrollTo(item)">
                <div class="flex justify-center items-center w-12 h-12" />
                <span>{{ item.name }}</span>
              </a>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.sider-bar-menu {
  height: calc(100vh - 4.5rem);
  overflow-y: auto;
}
</style>
