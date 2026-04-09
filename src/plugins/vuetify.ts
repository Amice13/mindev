/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
import mindev from './mindev-theme.ts'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'mindev',
    themes: {
      mindev,
    },
  },
  locale: {
    locale: 'uk',
    fallback: 'en',
    messages: {
      uk: {
        noDataText: 'Немає даних',
        close: 'Закрити',
        open: 'Відкрити',
        input: {
          clear: 'Очистити',
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
            close: 'Закрити',
          },
        },
      },
    },
  },
})
