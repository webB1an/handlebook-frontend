import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setComponents } from './components'
import { setDirectives } from './directives'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

async function bootstrap() {
  const app = createApp(App)
  setComponents(app)
  setDirectives(app)
  setupStore(app)

  await setupRouter(app)

  app.mount('#app')
}

bootstrap()
