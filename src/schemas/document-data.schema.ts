import type { JSONSchema } from 'json-schema-to-ts'

export const documentData = {
  title: 'Номер та дата документу',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Назва документу',
      description: 'Постанова Ради Міністрів УРСР, Рішення обласної ради, Наказ МКУ тощо'
    },
    number: {
      title: 'Номер документу',
      type: 'string'
    },
    date: {
      title: 'Дата прийняття документу',
      type: 'string'
    },
    comment: {
      title: 'Інформація про редакції документу',
      type: 'string'
    }
  }
} as const satisfies JSONSchema
