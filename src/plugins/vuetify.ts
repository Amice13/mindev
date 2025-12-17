/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import mindev from './mindev-theme.ts'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'mindev',
    themes: {
      mindev
    }
  },
  locale: {
    locale: 'uk',
    fallback: 'en',
    messages: {
      uk: {
        open: 'Відкрити',
        input: {
          clear: 'Очистити'
        },
        datePicker: {
          ariaLabel: {
            selectDate: 'Вибрати дату',
            changeMonth: 'Змінити місяць',
            changeYear: 'Змінити рік',
            previousYear: 'Минулий рік',
            nextYear: 'Наступний рік',
            previousMonth: 'Попередній місяць',
            nextMonth: 'Наступний місяць',
            selectYear: 'Обрати рік',
            selectMonth: 'Обрати місяць',
            currentDate: 'Поточна дата',
            close: 'Закрити'
          }
        }
      }
    }
  }
})
