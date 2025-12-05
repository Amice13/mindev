import type { JSONSchema7 } from 'json-schema'

export const apartment: JSONSchema7 = {
  title: 'Дані про квартиру',
  type: 'object',
  properties: {
    area: {
      title: 'загальна площа, кв. метрів',
      type: 'number'
    },
    livingArea: {
      title: 'житлова площа, кв. метрів',
      type: 'number'
    },
    idpLivingArea: {
      title: 'Площа приміщень, що використовуються для проживання внутрішньо переміщених осіб',
      type: 'number'
    },
    idpProjectedArea: {
      title: 'Площа приміщень, що можуть бути використані для проживання внутрішньо переміщених осіб (вільна площа)',
      type: 'number'
    },
    rooms: {
      title: 'Кількість кімнат',
      type: 'number'
    },
    idpRooms: {
      title: 'Кількість кімнат, що використовуються для проживання внутрішньо переміщених осіб',
      type: 'number'
    },
    idpProjectedRooms: {
      title: 'Кількість кімнат, що можуть бути використані для проживання внутрішньо переміщених осіб (вільна площа)',
      type: 'number'
    }
  }
}