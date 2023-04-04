<script lang='ts' setup>
import NavHeader from './NavHeader.vue'
import NavList from './List.vue'
import type { List, Menu } from '~/config/menu'
interface Props extends Menu {
  link: string
  list: List[]
}

defineProps<Props>()
</script>

<template>
  <div class="nav-list">
    <NavHeader :name="name" :icon="icon" :link="link" />
    <NavList :list="list" />
  </div>
</template>

<style lang='scss' scoped>
</style>
