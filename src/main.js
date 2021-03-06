import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2'

const app = createApp(App)

app.use(VueSweetalert2)

app.use(store).use(router).mount('#app')
