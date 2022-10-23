// Styling
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import './normalize.css'
import './style.css'

// Prime vue config
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

// Components
import InputText from 'primevue/inputtext'

// App Configuration
import { createApp } from 'vue'
import App from './App.vue'
import router from './shared/config/router'

createApp(App)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .component('InputText', InputText)
  .mount('#app')
