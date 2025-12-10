import type { JSONSchema } from 'json-schema-to-ts'

export const rentInfo = {
  title: 'У разі, коли квартира перебуває у користуванні (оренді)',
  type: 'object',
  properties: {
    isRent: {
      title: 'Квартира перебуває у користуванні (оренді)',
      type: 'boolean'
    },
    reason: {
      title: 'Правові підстави для користування',
      type: 'string'
    },
    endDate: {
      title: 'Строк, на який квартиру надано в користування',
      type: 'string'
    },
    habitants: {
      title: 'Кількість осіб, що проживають у квартирі',
      type: 'number'
    }
  }
} as const satisfies JSONSchema
