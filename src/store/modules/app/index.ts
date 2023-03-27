import { defineStore } from 'pinia'
import type { AppState } from './helper'

export const useAppStore = defineStore('app-store', {
  state: (): AppState => {
    return {
      siderCollapsed: false,
    }
  },
  actions: {
    toggleSiderCollapsed(collapsed: boolean) {
      this.siderCollapsed = collapsed
    },
  },
})

// export function useAppStoreWithOut() {
//   return useAppStore(store)
// }
