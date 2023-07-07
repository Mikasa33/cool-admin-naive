import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupDirectives } from '@/plugins'

import '@unocss/reset/tailwind.css'
import './styles/index.less'
import 'uno.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
setupDirectives(app)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
