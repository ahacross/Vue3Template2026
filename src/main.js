import './assets/main.css'
import 'vue-final-modal/style.css'
import './components/Dialog/assets/vfm.scss'

import { createApp } from 'vue'

import App from './App.vue'
import router from '@/router'
import { store } from '@/stores'

import { createVfm } from 'vue-final-modal'
import { VueQueryPlugin } from '@tanstack/vue-query'
import DialogComponent from '@/components/Dialog/DialogComponent.vue'

const app = createApp(App)

app.use(router)
app.use(store)

app.use(createVfm())
app.use(VueQueryPlugin)
app.component('DialogComponent', DialogComponent)

app.mount('#app')
