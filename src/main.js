import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' 
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  
  theme: {
    defaultTheme: 'myCustomTheme', 
    themes: {
      myCustomTheme: {
        dark: false, 
        colors: {
          background: '#f7e7a1', 
          surface: '#fff', 
          primary: '#f7e7a1', 
          secondary: '#f4c300', 
          accent: '#f1e3b6', 
          error: '#ff5252', 
          info: '#2196f3', 
          success: '#4caf50', 
          warning: '#ff9800', 
        },
      },
    },
  },
})

const app = createApp(App)
app.use(vuetify)
app.mount('#app')
