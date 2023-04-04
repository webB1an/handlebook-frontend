<script lang='ts' setup>
interface Props {
  link: string
  icon: string
  name: string
}

defineProps<Props>()
</script>

<template>
  <div :id="link" class="flex items-center h-18 text-lg text-gray-600">
    <div v-if="icon" :class="icon" class="text-xl text-#bbbec3 pr-10" />
    <div v-else class="i-carbon:categories text-xl text-#bbbec3 pr-8" />
    {{ name }}
  </div>
</template>

<style lang='scss' scoped>
</style>
