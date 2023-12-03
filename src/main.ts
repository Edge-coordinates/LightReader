import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
// import 'boxicons'
import App from './App.vue'
import './samples/node-api'

import naive from 'naive-ui'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(naive)
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
