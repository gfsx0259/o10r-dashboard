import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'

const app = createApp(App)

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'system',
    },
    defaults: {
        VTextField: {
            variant: 'outlined',
            rounded: 'lg',
            color: 'primary',
            class: 'bg-gray-100 !rounded-lg',
        },
        VSelect: {
            variant: 'outlined',
            rounded: 'lg',
            class: 'bg-gray-100 !rounded-lg',
        }
    }
})

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')

