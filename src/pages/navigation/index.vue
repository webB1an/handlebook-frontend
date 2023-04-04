<script lang='ts' setup>
import NavList from './components/NavList/index.vue'
import menuList from '~/config/menu'

const flatMenuList = computed(() => {
  const flatMenuList: any[] = []
  const flatMenu = (menu: any) => {
    if (menu.children) {
      menu.children.forEach((item: any) => {
        flatMenu(item)
      })
    }
    else {
      flatMenuList.push(menu)
    }
  }
  menuList.forEach((item: any) => {
    flatMenu(item)
  })
  return flatMenuList
})
</script>

<template>
  <div>
    <div class="p-4 pt-18 bg-#f9f9f9">
      <NavList v-for="menu in flatMenuList" :key="menu.link" :list="menu.list" :name="menu.name" :icon="menu.icon" :link="menu.link" />
    </div>
  </div>
</template>

<style scoped>
li {
  position: relative;
}
</style>
