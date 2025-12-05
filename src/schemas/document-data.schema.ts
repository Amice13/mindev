import type { JSONSchema7 } from 'json-schema'

export const documentData: JSONSchema7 = {
  title: 'Номер та дата документу',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Назва документу',
      description: 'Постанова Ради Міністрів УРСР, Рішення обласної ради, Наказ МКУ тощо'
    },
    number: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    comment: {
      title: 'Інформація про редакції',
      type: 'string'
    }
  }
}
