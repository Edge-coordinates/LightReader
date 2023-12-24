import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "@/router/router"
import './style.css'
// import 'boxicons'
import App from './App.vue'
import './samples/node-api'

import VueVirtualScroller from 'vue-virtual-scroller'

import naive from 'naive-ui'
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(naive)
app.use(VueVirtualScroller)
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
