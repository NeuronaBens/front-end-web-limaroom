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
import Card from 'primevue/card'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

// Pinia configuration
import { createPinia } from 'pinia'

// App Configuration
import { createApp } from 'vue'
import App from './App.vue'
import router from './shared/config/router'
const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .component('InputText', InputText)
  .component('Card', Card)
  .component('Button', Button)
  .component('Toast', Toast)
  .mount('#app')
