<script lang='ts' setup>
import errorImage from '~/assets/ai_compass.png'
import type { List } from '~/config/menu'
interface Props {
  list: List[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 sizing box-border">
    <template v-for="item in list" :key="item.name">
      <Tooltip :show="true" :text="item.desc" place="bottom" :instance="0" bg="#000" color="text-#fff">
        <a :href="item.href" target="_blank">
          <div :key="item.name" class="relative transform translate-y-0 flex items-center h-18 p-4 rounded-md bg-#fff box-border filter drop-shadow-sm cursor-pointer group hover:drop-shadow-xl hover:-translate-y-2 transition-all ease duration-300">
            <div class="flex-none mr-4 w-40px h-40px box-border">
              <img v-lazy class="w-100% h-100% rounded-full box-border" :src="errorImage" :custom-src="item.icon" :alt="item.name">
            </div>
            <div class="flex-auto overflow-hidden box-border">
              <div class="text-base font-500 box-border truncate group-hover:text-red">
                {{ item.name }}
              </div>
              <div class="text-xs text-#6c757d box-border truncate">
                {{ item.desc }}
              </div>
            </div>
          </div>
        </a>
      </Tooltip>
    </template>
  </div>
</template>

<style lang='scss' scoped>
</style>
