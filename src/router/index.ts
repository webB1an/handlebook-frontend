import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '~/layout/index.vue'
import Nav from '~/pages/navigation/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'nav',
    component: Layout,
    children: [
      {
        path: 'nav',
        name: 'Nav',
        component: Nav,
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
