import { createApp } from 'vue'
import App from './App.vue'
import './style/index.css'
import 'element-plus/dist/index.css'
import store from './store'
import VueRouter from '@/router'
const app = createApp(App)

app.use(store)
app.use(VueRouter)
// @ts-ignore 挂载ipcrenderer
// app.config.globalProperties.$ipcRenderer = window?.ipcRenderer

app.mount('#app')


