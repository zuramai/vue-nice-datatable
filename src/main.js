import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import VueNiceDatatable from './index'

const app = createApp(App)
app.use(store)
  .use(VueNiceDatatable)

app.mount('#app')
