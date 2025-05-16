import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import $ from 'jquery'
// @ts-ignore
window.$ = $;
// @ts-ignore
window.jQuery = $;

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/css/sb-admin-2.min.css'

// Dynamically import SB Admin 2 JS after jQuery is set
import('./assets/js/sb-admin-2.min.js')

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
