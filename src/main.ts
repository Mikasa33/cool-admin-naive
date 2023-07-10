import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { setupDirectives, setupPinia } from '@/plugins'

import '@unocss/reset/tailwind.css'
import './styles/index.less'
import 'uno.css'

const app = createApp(App)

setupPinia(app)
app.use(router)
setupDirectives(app)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
