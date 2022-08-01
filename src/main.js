import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import fontawesome from './utils/fontawesome'

createApp(App)
    .use(router)
    .use(store)
    .component(fontawesome[0], fontawesome[1])
    .mount('#app')
