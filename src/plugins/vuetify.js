/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const aquaTheme = {
  dark: false,
  colors: {
    background: '#345ca8',
    primary: '#09e9f1',
    secondary: '#966fb3',
    success: '#16a249',
    warning: '#db7706',
    error: '#dc2828',
    surface: '#FFFFFF',
    'primary-darken-1': '#3700B3',
    'secondary-darken-1': '#018786',
    info: '#2196F3',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'aquaTheme',
    themes: {
      aquaTheme
    },
  },
})
